import MovieTile from "../movieTile/MovieTile";
import type { Movie } from "../../types/movie";

export interface MoviesListProps {
  movies: Movie[];
  onMovieClick?: (movie: Movie) => void;
  onMovieEdit?: (movie: Movie) => void;
  onMovieDelete?: (movie: Movie) => void;
}

const MoviesList = ({
  movies,
  onMovieClick,
  onMovieEdit,
  onMovieDelete,
}: MoviesListProps) => (
  <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 justify-content-center">
    {movies.map((movie) => (
      <div key={movie.id} className="col d-flex justify-content-center">
        <MovieTile
          movie={movie}
          onEdit={onMovieEdit}
          onDelete={onMovieDelete}
          onClick={onMovieClick}
        />
      </div>
    ))}
  </div>
);

export default MoviesList;
