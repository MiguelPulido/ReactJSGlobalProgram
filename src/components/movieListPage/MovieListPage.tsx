import { useState, useEffect } from "react";
import {
  useNavigate,
  useSearchParams,
  Outlet,
  useLocation,
} from "react-router-dom";
import SearchForm from "../searchForm/SearchForm";
import GenreSelect from "../genreSelect/GenreSelect";
import { type MovieFormData } from "../movieForm/MovieForm";
import {
  mapMovie,
  MovieDialogType,
  MovieSort,
  type Movie,
  type SortOption,
} from "../../types/movie";
import MoviesList from "../movieList/MovieList";
import {
  AVAILABLE_FORM_GENRES,
  DEFAULT_MOVIE_GENRE,
  DEFAULT_SORT,
  MOVIE_GENRES,
  MOVIES_API_URL,
} from "../../constants/movie";
import SortControl from "../sortControl/SortControl";
import "./MovieListPage.css";
import MovieDialog from "../movieDialog/MovieDialog";

const toTitleCase = (str: string): string => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const MovieListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const searchText = (searchParams.get("query") ?? "").toLowerCase();
  const selectedGenre = searchParams.get("genre")
    ? toTitleCase(searchParams.get("genre") as string)
    : DEFAULT_MOVIE_GENRE;
  const sortBy = searchParams.get("sort")
    ? toTitleCase(searchParams.get("sort") as string)
    : DEFAULT_SORT;

  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [dialogType, setDialogType] = useState<MovieDialogType | null>(null);

  useEffect(() => {
    if (location.pathname !== "/") {
      return;
    }

    const controller = new AbortController();
    const fetchMovies = async () => {
      try {
        let movieUrl = MOVIES_API_URL;
        if (sortBy === MovieSort.TITLE) {
          movieUrl += "?sortBy=title&sortOrder=asc";
        } else {
          movieUrl += "?sortBy=release_date&sortOrder=desc";
        }

        if (searchText && searchText.length > 3) {
          movieUrl += `&searchBy=title&search=${searchText}`;
        }

        if (selectedGenre && selectedGenre !== DEFAULT_MOVIE_GENRE) {
          movieUrl += `&filter=${selectedGenre}`;
        }

        await fetch(movieUrl, { signal: controller.signal })
          .then((response) => response.json())
          .then((rawdata: unknown) =>
            (rawdata as { data: unknown[] }).data.map(mapMovie)
          )
          .then((mappedMovies: Movie[]) => setMovies(mappedMovies));
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error("Error fetching movies:", error);
        }
      } finally {
        console.log("Fetch attempt finished.");
      }
    };

    fetchMovies();
    return () => controller.abort();
  }, [sortBy, searchText, selectedGenre, location.pathname]);

  const handleSearch = (query: string): void => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      if (query) {
        params.set("query", query);
      } else {
        params.delete("query");
      }
      return params;
    });
  };

  const handleGenreSelect = (genre: string): void => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      if (genre) {
        params.set("genre", genre.toLowerCase());
      } else {
        params.delete("genre");
      }
      return params;
    });
  };

  const handleSortChange = (sortOption: SortOption): void => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      if (sortOption) {
        params.set("sort", sortOption.toLowerCase());
      } else {
        params.delete("sort");
      }
      return params;
    });
  };

  const handleOpenMovieDialog = (
    type: MovieDialogType,
    movie: Movie | null
  ): void => {
    setDialogType(() => type);
    setSelectedMovie(() => movie);
  };

  const handleCloseDialog = (): void => {
    setDialogType(() => null);
    setSelectedMovie(() => null);
  };

  const handleAddMovie = (movieData: MovieFormData): void => {
    const newMovie: Movie = {
      id: crypto.randomUUID(),
      ...movieData,
      release_date: new Date(movieData.release_date),
    };
    setMovies((prev) => [...prev, newMovie]);
    handleCloseDialog();
  };

  const handleUpdateMovie = (movieData: MovieFormData): void => {
    if (!selectedMovie) return;

    const updatedMovie: Movie = {
      ...selectedMovie,
      ...movieData,
      release_date: new Date(movieData.release_date),
    };

    setMovies((prev) =>
      prev.map((movie) =>
        movie.id === selectedMovie.id ? updatedMovie : movie
      )
    );
    handleCloseDialog();
  };

  const handleConfirmDelete = (): void => {
    if (!selectedMovie) return;

    setMovies((prev) => prev.filter((movie) => movie.id !== selectedMovie.id));
    handleCloseDialog();
  };

  return (
    <>
      <div className="container-fluid d-flex flex-column align-items-center gap-5 py-4">
        <section className="w-100 container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1>FIND YOUR MOVIE</h1>
            <button
              type="button"
              className="btn btn-primary"
              style={{ color: "var(--bs-secondary)" }}
              onClick={() => navigate("/new")}
            >
              + Add Movie
            </button>
          </div>

          <SearchForm initialSearchText={searchText} onSearch={handleSearch} />
        </section>

        <section className="w-100 container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <GenreSelect
              genres={MOVIE_GENRES}
              selectedGenre={selectedGenre}
              onSelect={handleGenreSelect}
            />
            <SortControl currentSort={sortBy} onSortChange={handleSortChange} />
          </div>
          <MoviesList
            movies={movies}
            onMovieClick={(movie) => navigate(`/${movie.id}`)}
            onMovieEdit={(movie) => navigate(`/${movie.id}/edit`)}
            onMovieDelete={(movie) =>
              handleOpenMovieDialog(MovieDialogType.DELETE, movie)
            }
          />
        </section>
      </div>

      <MovieDialog
        dialogType={dialogType}
        movie={selectedMovie}
        availableGenres={AVAILABLE_FORM_GENRES}
        onClose={handleCloseDialog}
        onAddMovie={handleAddMovie}
        onUpdateMovie={handleUpdateMovie}
        onDeleteMovie={handleConfirmDelete}
      />
      <Outlet />
    </>
  );
};

export default MovieListPage;
