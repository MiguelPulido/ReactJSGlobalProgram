import type { Movie } from "../types/movie";

export interface MovieDetailsProps {
  movie: Movie;
  onClose?: () => void;
}

export const MovieDetails = ({ movie, onClose }: MovieDetailsProps) => {
  return (
    <div className="container-fluid p-4" data-testid="movie-details">
      <div className="row">
        <div className="col-12 mb-3">
          <button
            type="button"
            className="btn-close float-end"
            aria-label="Close movie details"
            onClick={onClose}
            data-testid="close-button"
          ></button>
        </div>

        <div className="col-md-4 mb-4">
          {movie.imageUrl && (
            <img
              src={movie.imageUrl}
              alt={`${movie.title} poster`}
              className="img-fluid rounded shadow"
              data-testid="movie-poster"
            />
          )}
          {!movie.imageUrl && (
            <div
              className="bg-light d-flex align-items-center justify-content-center rounded shadow min-vh-50"
              data-testid="movie-poster-placeholder"
            >
              <span className="text-muted">No Image</span>
            </div>
          )}
        </div>

        <div className="col-md-8">
          <div className="mb-3">
            <h1 className="display-5 fw-bold mb-2" data-testid="movie-title">
              {movie.title}
            </h1>
          </div>

          {movie.genres.length > 0 && (
            <div className="mb-3">
              <h6 className="text-muted mb-2">Genres</h6>
              <p className="lead" data-testid="movie-genres">
                {movie.genres.join(", ")}
              </p>
            </div>
          )}

          <div className="mb-3">
            <h6 className="text-muted mb-2">Rating</h6>
            <p className="lead" data-testid="movie-rating">
              {movie.rating}
            </p>
          </div>

          <div className="mb-3">
            <h6 className="text-muted mb-2">Release Year</h6>
            <p className="lead" data-testid="movie-year">
              {movie.releaseDate.getFullYear()}
            </p>
          </div>

          <div className="mb-3">
            <h6 className="text-muted mb-2">Duration</h6>
            <p className="lead" data-testid="movie-duration">
              {`${Math.floor(movie.durationInMinutes / 60)}h ${
                movie.durationInMinutes % 60
              }m`}
            </p>
          </div>

          <div className="mb-3">
            <h6 className="text-muted mb-2">Description</h6>
            <p className="lead" data-testid="movie-description">
              {movie.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
