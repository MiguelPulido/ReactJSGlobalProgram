import { useRef, useState } from "react";
import type { FormEvent } from "react";
import type { Movie } from "../types/movie";

export type MovieFormData = Omit<Movie, "id">;

export interface MovieFormProps {
  onSubmit: (movieData: MovieFormData) => void;
  onCancel?: () => void;
  initialMovie?: Partial<Movie>;
  availableGenres: string[];
}

export const MovieForm = ({
  onSubmit,
  onCancel,
  initialMovie,
  availableGenres,
}: MovieFormProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const imageUrlRef = useRef<HTMLInputElement>(null);
  const durationRef = useRef<HTMLInputElement>(null);
  const releaseDateRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const ratingRef = useRef<HTMLInputElement>(null);

  const [selectedGenres, setSelectedGenres] = useState<string[]>(
    initialMovie?.genres || []
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData: MovieFormData = {
      title: titleRef.current?.value || "",
      imageUrl: imageUrlRef.current?.value || "",
      durationInMinutes: parseInt(durationRef.current?.value || "0", 10),
      releaseDate: new Date(releaseDateRef.current?.value || ""),
      description: descriptionRef.current?.value || "",
      rating: parseFloat(ratingRef.current?.value || "0"),
      genres: selectedGenres,
    };

    onSubmit(formData);
  };

  const handleCancel = () => {
    onCancel?.();
  };

  const handleGenreChange = (genre: string, isChecked: boolean) => {
    setSelectedGenres((prev) => {
      return isChecked ? [...prev, genre] : prev.filter((g) => g !== genre);
    });
  };

  const isGenreSelected = (genre: string): boolean => {
    return selectedGenres.includes(genre);
  };

  const getSelectedGenresText = (): string => {
    if (selectedGenres.length === 0) {
      return "Select Genre";
    }

    if (selectedGenres.length === 1) {
      return selectedGenres[0];
    }

    if (selectedGenres.length <= 3) {
      return selectedGenres.join(", ");
    }

    return `${selectedGenres.slice(0, 2).join(", ")} + ${
      selectedGenres.length - 2
    } more`;
  };

  const formatDateForInput = (date: Date | undefined): string => {
    if (!date) return "";
    return date.toISOString().split("T")[0];
  };

  return (
    <div className="container-fluid" data-testid="movie-form-container">
      <form onSubmit={handleSubmit} data-testid="movie-form">
        <div className="row mb-3">
          {/* Title  Field */}
          <div className="col-md-6">
            <label htmlFor="movie-title" className="form-label">
              Title <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              ref={titleRef}
              className="form-control"
              id="movie-title"
              data-testid="movie-title-input"
              defaultValue={initialMovie?.title || ""}
              required
            />
          </div>
          {/* Release Date Field */}
          <div className="col-md-6">
            <label htmlFor="movie-release-date" className="form-label">
              Release Date <span className="text-danger">*</span>
            </label>
            <input
              type="date"
              ref={releaseDateRef}
              className="form-control"
              id="movie-release-date"
              data-testid="movie-release-date-input"
              defaultValue={formatDateForInput(initialMovie?.releaseDate)}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          {/* Movie URL Field */}
          <div className="col-md-6">
            <label htmlFor="movie-image-url" className="form-label">
              Movie URL <span className="text-danger">*</span>
            </label>
            <input
              type="url"
              ref={imageUrlRef}
              className="form-control"
              id="movie-image-url"
              data-testid="movie-image-url-input"
              defaultValue={initialMovie?.imageUrl || ""}
              required
              placeholder="https://example.com/image.jpg"
            />
          </div>
          {/* Rating Field */}
          <div className="col-md-6">
            <label htmlFor="movie-rating" className="form-label">
              Rating (1-10) <span className="text-danger">*</span>
            </label>
            <input
              type="number"
              ref={ratingRef}
              className="form-control"
              id="movie-rating"
              data-testid="movie-rating-input"
              defaultValue={initialMovie?.rating || ""}
              required
              min={1}
              max={10}
              step={0.1}
            />
          </div>
        </div>

        <div className="row mb-3">
          {/* Genres Field */}
          <div className="col-md-6">
            <label className="form-label">
              Genres <span className="text-danger">*</span>
            </label>
            <div className="dropdown" data-testid="movie-genres-dropdown">
              <button
                className="btn btn-outline-secondary dropdown-toggle w-100 d-flex justify-content-between align-items-center"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                data-testid="genres-dropdown-button"
              >
                <span>{getSelectedGenresText()}</span>
              </button>
              <ul
                className="dropdown-menu w-100"
                data-testid="genres-dropdown-menu"
              >
                {availableGenres.map((genre) => (
                  <li key={genre} className="dropdown-item-text">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`genre-${genre}`}
                        data-testid={`genre-checkbox-${genre.toLowerCase()}`}
                        checked={isGenreSelected(genre)}
                        onChange={(e) =>
                          handleGenreChange(genre, e.target.checked)
                        }
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`genre-${genre}`}
                      >
                        {genre}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Runtime  Field*/}
          <div className="col-md-6">
            <label htmlFor="movie-duration" className="form-label">
              Runtime (minutes) <span className="text-danger">*</span>
            </label>
            <input
              type="number"
              ref={durationRef}
              className="form-control"
              id="movie-duration"
              data-testid="movie-duration-input"
              defaultValue={initialMovie?.durationInMinutes || ""}
              required
              min={1}
            />
          </div>
        </div>

        <div className="row mb-3">
          {/* Overview Field*/}
          <div className="col-12">
            <label htmlFor="movie-description" className="form-label">
              Overview <span className="text-danger">*</span>
            </label>
            <textarea
              ref={descriptionRef}
              className="form-control"
              id="movie-description"
              data-testid="movie-description-textarea"
              rows={4}
              defaultValue={initialMovie?.description || ""}
              required
              placeholder="Enter a brief overview of the movie..."
            />
          </div>
        </div>

        {/* Actions */}
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-end gap-2 mt-3">
              {onCancel && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCancel}
                  data-testid="movie-form-cancel-button"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                className="btn btn-primary"
                data-testid="movie-form-submit-button"
              >
                {initialMovie ? "Update Movie" : "Add Movie"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MovieForm;
