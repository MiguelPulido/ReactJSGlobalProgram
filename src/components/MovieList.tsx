import MovieTile from "./MovieTile";
import type { Movie } from "../types/movie";

const handleMovieEdit = (movie: Movie): void => {
  console.log("Edit movie:", movie.title);
};

const handleMovieDelete = (movie: Movie): void => {
  console.log("Delete movie:", movie.title);
};

const handleMovieClick = (movie: Movie): void => {
  console.log("Movie clicked:", movie.title);
};

const MoviesList = ({ movies }: { movies: Movie[] }) => (
  <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 justify-content-center">
    {movies.map((movie) => (
      <div key={movie.id} className="col d-flex justify-content-center">
        <MovieTile
          movie={movie}
          onEdit={handleMovieEdit}
          onDelete={handleMovieDelete}
          onClick={handleMovieClick}
        />
      </div>
    ))}
  </div>
);

export default MoviesList;
