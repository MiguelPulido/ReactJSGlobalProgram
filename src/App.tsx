import { useState, useMemo } from "react";
import SearchForm from "./components/SearchForm";
import GenreSelect from "./components/GenreSelect";
import Counter from "./components/Counter";
import MovieDetails from "./components/MovieDetails";
import SortControl, { type SortOption } from "./components/SortControl";
import { Dialog } from "./components/Dialog";
import { MovieForm, type MovieFormData } from "./components/MovieForm";
import type { Movie } from "./types/movie";
import "./App.css";
import MoviesList from "./components/MovieList";

const MOVIE_GENRES = ["All", "Documentary", "Comedy", "Horror", "Crime"];
const DEFAULT_MOVIE_GENRE = MOVIE_GENRES[0];

const AVAILABLE_FORM_GENRES = [
  "Action",
  "Comedy",
  "Drama",
  "Horror",
  "Science Fiction",
  "Crime",
  "Documentary",
];

type DialogType = "add" | "edit" | "delete" | null;

const MOCK_MOVIES: Movie[] = [
  {
    id: "1",
    title: "Pulp Fiction",
    genres: ["Crime"],
    imageUrl:
      "https://images-na.ssl-images-amazon.com/images/M/MV5BMTkxMTA5OTAzMl5BMl5BanBnXkFtZTgwNjA5MDc3NjE@._V1_SX300.jpg",
    rating: 9.3,
    description:
      "The lives of two mob hit men, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    releaseDate: new Date("1994-09-23"),
    durationInMinutes: 142,
  },
  {
    id: "2",
    title: "Shrek 2",
    genres: ["Comedy"],
    imageUrl:
      "https://images-na.ssl-images-amazon.com/images/M/MV5BMTk4MTMwNjI4M15BMl5BanBnXkFtZTcwMjExMzUyMQ@@._V1_SX300.jpg",
    rating: 9.2,
    description:
      "Princess Fiona's parents invite her and Shrek to dinner to celebrate her marriage. If only they knew the newlyweds were both ogres.",
    releaseDate: new Date("2006-03-24"),
    durationInMinutes: 175,
  },
  {
    id: "3",
    title: "Mr. & Mrs. Smith",
    genres: ["Crime", "Comedy"],
    imageUrl:
      "https://images-na.ssl-images-amazon.com/images/M/MV5BMTUxMzcxNzQzOF5BMl5BanBnXkFtZTcwMzQxNjUyMw@@._V1_SX300.jpg",
    rating: 8.9,
    description:
      "A bored married couple is surprised to learn that they are both assassins hired by competing agencies to kill each other.",
    releaseDate: new Date("2005-10-14"),
    durationInMinutes: 154,
  },
];

function App() {
  const [movies, setMovies] = useState<Movie[]>(MOCK_MOVIES);
  const [lastSearchText, setLastSearchText] = useState<string>("");
  const [selectedGenre, setSelectedGenre] =
    useState<string>(DEFAULT_MOVIE_GENRE);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("Release Date");

  const [openDialog, setOpenDialog] = useState<DialogType>(null);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const [deletingMovie, setDeletingMovie] = useState<Movie | null>(null);

  const sortedMovies = useMemo(() => {
    const moviesCopy = [...movies];
    return moviesCopy.sort((a, b) => {
      if (sortBy === "Title") {
        return a.title.localeCompare(b.title);
      } else {
        return b.releaseDate.getTime() - a.releaseDate.getTime();
      }
    });
  }, [movies, sortBy]);

  const handleSearch = (searchText: string): void => {
    setLastSearchText(searchText);
  };

  const handleGenreSelect = (genre: string): void => {
    setSelectedGenre(genre);
  };

  const handleSortChange = (sortOption: SortOption): void => {
    setSortBy(sortOption);
  };

  const handleMovieSelect = (movie: Movie): void => {
    setSelectedMovie(movie);
  };

  const handleMovieDetailsClose = (): void => {
    setSelectedMovie(null);
  };

  const handleMovieEdit = (movie: Movie): void => {
    setOpenDialog(() => "edit");
    setEditingMovie(() => movie);
    setDeletingMovie(() => null);
  };

  const handleMovieDelete = (movie: Movie): void => {
    setOpenDialog(() => "delete");
    setEditingMovie(() => null);
    setDeletingMovie(() => movie);
  };

  const handleOpenAddDialog = (): void => {
    setOpenDialog(() => "add");
    setEditingMovie(() => null);
    setDeletingMovie(() => null);
  };

  const handleCloseDialog = (): void => {
    setOpenDialog(() => null);
    setEditingMovie(() => null);
    setDeletingMovie(() => null);
  };

  const handleAddMovie = (movieData: MovieFormData): void => {
    const newMovie: Movie = {
      id: crypto.randomUUID(),
      ...movieData,
      releaseDate: new Date(movieData.releaseDate),
    };
    setMovies((prev) => [...prev, newMovie]);
    handleCloseDialog();
  };

  const handleUpdateMovie = (movieData: MovieFormData): void => {
    if (!editingMovie) return;

    const updatedMovie: Movie = {
      ...editingMovie,
      ...movieData,
      releaseDate: new Date(movieData.releaseDate),
    };

    setMovies((prev) =>
      prev.map((movie) => (movie.id === editingMovie.id ? updatedMovie : movie))
    );
    handleCloseDialog();
  };

  const handleConfirmDelete = (): void => {
    if (!deletingMovie) return;

    setMovies((prev) => prev.filter((movie) => movie.id !== deletingMovie.id));
    handleCloseDialog();
  };

  return (
    <>
      <div className="container-fluid d-flex flex-column align-items-center gap-5 py-4">
        {selectedMovie ? (
          <MovieDetails
            movie={selectedMovie}
            onClose={handleMovieDetailsClose}
          />
        ) : (
          <>
            <section className="w-100 text-center">
              <Counter initialValue={3} />
            </section>

            <section className="w-100 text-center">
              <SearchForm
                initialSearchText="Test text"
                onSearch={handleSearch}
              />
              {!!lastSearchText && (
                <div className="mt-2">
                  <strong>Last Search:</strong> "{lastSearchText}"
                </div>
              )}
            </section>

            <section className="w-100 text-center">
              <GenreSelect
                genres={MOVIE_GENRES}
                selectedGenre={selectedGenre}
                onSelect={handleGenreSelect}
              />
              {!!selectedGenre && (
                <div className="mt-2">
                  <strong>Selected:</strong> "{selectedGenre}"
                </div>
              )}
            </section>

            <section className="w-100">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <SortControl
                  currentSort={sortBy}
                  onSortChange={handleSortChange}
                />
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleOpenAddDialog}
                >
                  + Add Movie
                </button>
              </div>
              <MoviesList
                movies={sortedMovies}
                onMovieClick={handleMovieSelect}
                onMovieEdit={handleMovieEdit}
                onMovieDelete={handleMovieDelete}
              />
            </section>
          </>
        )}
      </div>

      {/* Add Movie Dialog */}
      {openDialog === "add" && (
        <Dialog title="Add New Movie" isOpen={true} onClose={handleCloseDialog}>
          <MovieForm
            availableGenres={AVAILABLE_FORM_GENRES}
            onSubmit={handleAddMovie}
            onCancel={handleCloseDialog}
          />
        </Dialog>
      )}

      {/* Edit Movie Dialog */}
      {openDialog === "edit" && editingMovie && (
        <Dialog title="Edit Movie" isOpen={true} onClose={handleCloseDialog}>
          <MovieForm
            availableGenres={AVAILABLE_FORM_GENRES}
            initialMovie={editingMovie}
            onSubmit={handleUpdateMovie}
            onCancel={handleCloseDialog}
          />
        </Dialog>
      )}

      {/* Delete Movie Dialog */}
      {openDialog === "delete" && deletingMovie && (
        <Dialog title="Delete Movie" isOpen={true} onClose={handleCloseDialog}>
          <div className="p-4">
            <p className="mb-4">
              Are you sure you want to delete the movie{" "}
              <strong>"{deletingMovie.title}"</strong>?
            </p>

            <div className="d-flex gap-2 justify-content-end">
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleConfirmDelete}
              >
                Confirm
              </button>
            </div>
          </div>
        </Dialog>
      )}
    </>
  );
}

export default App;
