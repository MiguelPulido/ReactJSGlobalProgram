import { useState } from "react";
import SearchForm from "./components/SearchForm";
import GenreSelect from "./components/GenreSelect";
import Counter from "./components/Counter";
import MovieDetails from "./components/MovieDetails";
import type { Movie } from "./types/movie";
import "./App.css";
import MoviesList from "./components/MovieList";

const MOVIE_GENRES = ["All", "Documentary", "Comedy", "Horror", "Crime"];
const DEFAULT_MOVIE_GENRE = MOVIE_GENRES[0];

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
    releaseDate: new Date("1972-03-24"),
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
  const [lastSearchText, setLastSearchText] = useState<string>("");
  const [selectedGenre, setSelectedGenre] =
    useState<string>(DEFAULT_MOVIE_GENRE);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = (searchText: string): void => {
    setLastSearchText(searchText);
    console.log("Search performed:", searchText);
  };

  const handleGenreSelect = (genre: string): void => {
    setSelectedGenre(genre);
    console.log("Genre selected:", genre);
  };

  const handleMovieSelect = (movie: Movie): void => {
    setSelectedMovie(movie);
    console.log("Movie selected:", movie.title);
  };

  const handleMovieDetailsClose = (): void => {
    setSelectedMovie(null);
  };

  const handleMovieEdit = (movie: Movie): void => {
    console.log("Edit movie:", movie.title);
  };

  const handleMovieDelete = (movie: Movie): void => {
    console.log("Delete movie:", movie.title);
  };

  return (
    <div className="container-fluid d-flex flex-column align-items-center gap-5 py-4">
      {selectedMovie ? (
        <MovieDetails movie={selectedMovie} onClose={handleMovieDetailsClose} />
      ) : (
        <>
          <section className="w-100 text-center">
            <Counter initialValue={3} />
          </section>

          <section className="w-100 text-center">
            <SearchForm initialSearchText="Test text" onSearch={handleSearch} />
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
            <MoviesList
              movies={MOCK_MOVIES}
              onMovieClick={handleMovieSelect}
              onMovieEdit={handleMovieEdit}
              onMovieDelete={handleMovieDelete}
            />
          </section>
        </>
      )}
    </div>
  );
}

export default App;
