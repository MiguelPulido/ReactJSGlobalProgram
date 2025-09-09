import { Dialog } from "../dialog/Dialog";
import { MovieForm, type MovieFormData } from "../movieForm/MovieForm";
import { MovieDialogType, type Movie } from "../../types/movie";

export interface MovieDialogProps {
  onClose: () => void;
  onAddMovie: (movieData: MovieFormData) => void;
  onUpdateMovie: (movieData: MovieFormData) => void;
  onDeleteMovie: () => void;
  dialogType: MovieDialogType | null;
  movie: Movie | null;
  availableGenres: string[];
}

const MovieDialog = ({
  onClose,
  onAddMovie,
  onUpdateMovie,
  onDeleteMovie,
  dialogType,
  movie,
  availableGenres,
}: MovieDialogProps) => {
  const handleCloseDialog = (): void => {
    onClose();
  };

  const handleAddMovie = (movieData: MovieFormData): void => {
    onAddMovie(movieData);
  };

  const handleUpdateMovie = (movieData: MovieFormData): void => {
    onUpdateMovie(movieData);
  };

  const handleConfirmDelete = (): void => {
    onDeleteMovie();
  };

  return (
    <>
      {dialogType === MovieDialogType.ADD && (
        <Dialog title="Add New Movie" isOpen={true} onClose={handleCloseDialog}>
          <MovieForm
            availableGenres={availableGenres}
            onSubmit={handleAddMovie}
            onCancel={handleCloseDialog}
          />
        </Dialog>
      )}

      {/* Edit Movie Dialog */}
      {dialogType === MovieDialogType.EDIT && movie && (
        <Dialog title="Edit Movie" isOpen={true} onClose={handleCloseDialog}>
          <MovieForm
            availableGenres={availableGenres}
            initialMovie={movie}
            onSubmit={handleUpdateMovie}
            onCancel={handleCloseDialog}
          />
        </Dialog>
      )}

      {/* Delete Movie Dialog */}
      {dialogType === MovieDialogType.DELETE && movie && (
        <Dialog title="Delete Movie" isOpen={true} onClose={handleCloseDialog}>
          <div className="p-4">
            <p className="mb-4">
              Are you sure you want to delete the movie{" "}
              <strong>"{movie.title}"</strong>?
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
};

export default MovieDialog;
