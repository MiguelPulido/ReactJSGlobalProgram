import type { Movie } from "../types/movie";

export interface MovieTileProps {
  movie: Movie;
  onEdit?: (movie: Movie) => void;
  onDelete?: (movie: Movie) => void;
  onClick?: (movie: Movie) => void;
}

export interface ContextMenuProps {
  isVisible: boolean;
  x: number;
  y: number;
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
}

export const MovieTile = ({
  movie,
  onEdit,
  onDelete,
  onClick,
}: MovieTileProps) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest(".dropdown") || target.closest(".dropdown-menu")) {
      return;
    }
    onClick?.(movie);
  };

  const handleEdit = () => {
    onEdit?.(movie);
  };

  const handleDelete = () => {
    onDelete?.(movie);
  };

  return (
    <div
      className="card position-relative h-100 cursor-pointer"
      onClick={handleClick}
      role="button"
      aria-label={`Movie: ${movie.title}`}
      data-testid={`movie-tile-${movie.id}`}
    >
      {movie.imageUrl && (
        <img
          src={movie.imageUrl}
          alt={`${movie.title} poster`}
          className="card-img-top"
          loading="lazy"
        />
      )}
      {!movie.imageUrl && (
        <div
          className="card-img-top bg-light d-flex align-items-center justify-content-center"
          style={{ height: "300px" }}
        >
          <span className="text-muted">No Image</span>
        </div>
      )}

      <div className="card-body p-3">
        <div className="d-flex align-items-center justify-content-between text-muted small mb-1">
          <h5 className="card-title text-truncate mb-2" title={movie.title}>
            {movie.title}
          </h5>
          <span className="fw-medium">{movie.releaseDate.getFullYear()}</span>
        </div>

        {movie.genres.length > 0 && (
          <span className="text-muted small">{movie.genres.join(", ")}</span>
        )}
      </div>
      <div className="dropdown position-absolute top-0 end-0 m-2">
        <button
          className="btn btn-secondary btn-sm p-0 text-muted"
          type="button"
          data-testid={`movie-tile-dropdown-${movie.id}`}
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <span style={{ fontSize: "1.5rem", lineHeight: 1 }}>⋯</span>
        </button>
        <ul className="dropdown-menu dropdown-menu-end">
          <li>
            <button
              className="dropdown-item d-flex align-items-center"
              onClick={handleEdit}
              type="button"
              role="menuitem"
              data-testid={`movie-tile-edit-button-${movie.id}`}
            >
              <span className="me-2">✏️</span>
              Edit
            </button>
          </li>
          <li>
            <button
              className="dropdown-item d-flex align-items-center text-danger"
              onClick={handleDelete}
              type="button"
              role="menuitem"
              data-testid={`movie-tile-delete-button-${movie.id}`}
            >
              <span className="me-2">🗑️</span>
              Delete
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MovieTile;
