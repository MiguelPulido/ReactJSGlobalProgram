import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import MovieForm, { type MovieFormData } from "../MovieForm";
import type { Movie } from "../../../types/movie";

const MOCK_MOVIE: Movie = {
  id: 1,
  title: "Test Movie",
  poster_path: "https://example.com/test.jpg",
  runtime: 120,
  genres: ["Action", "Drama"],
  release_date: new Date("2023-01-15"),
  overview: "A test movie description",
  vote_average: 8.5,
};

const MOCK_GENRES = ["Action", "Comedy", "Drama", "Horror", "Science Fiction"];

describe("MovieForm", () => {
  describe("Rendering", () => {
    it("should render all form fields", () => {
      render(
        <MovieForm
          onSubmit={jest.fn()}
          onCancel={jest.fn()}
          availableGenres={MOCK_GENRES}
        />
      );

      expect(screen.getByTestId("movie-form-container")).toBeInTheDocument();
      expect(screen.getByTestId("movie-form")).toBeInTheDocument();
      expect(screen.getByTestId("movie-title-input")).toBeInTheDocument();
      expect(screen.getByTestId("movie-image-url-input")).toBeInTheDocument();
      expect(screen.getByTestId("movie-duration-input")).toBeInTheDocument();
      expect(
        screen.getByTestId("movie-release-date-input")
      ).toBeInTheDocument();
      expect(screen.getByTestId("movie-rating-input")).toBeInTheDocument();
      expect(screen.getByTestId("movie-genres-dropdown")).toBeInTheDocument();
      expect(
        screen.getByTestId("movie-description-textarea")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("movie-form-submit-button")
      ).toBeInTheDocument();
    });

    it("should render genres checkboxes", () => {
      render(
        <MovieForm
          onSubmit={jest.fn()}
          onCancel={jest.fn()}
          availableGenres={MOCK_GENRES}
        />
      );

      MOCK_GENRES.forEach((genre) => {
        const checkbox = screen.getByTestId(
          `genre-checkbox-${genre.toLowerCase()}`
        );
        expect(checkbox).toBeInTheDocument();
        expect(checkbox).toHaveClass("form-check-input");
        expect(checkbox).toHaveAttribute("type", "checkbox");
      });
    });

    it("should show cancel button", () => {
      render(
        <MovieForm
          onSubmit={jest.fn()}
          onCancel={jest.fn()}
          availableGenres={MOCK_GENRES}
        />
      );

      const cancelButton = screen.getByTestId("movie-form-cancel-button");
      expect(cancelButton).toBeInTheDocument();
      expect(cancelButton).toHaveClass("btn", "btn-secondary");
      expect(cancelButton).toHaveTextContent("Cancel");
    });

    it('should show "Add Movie" button text when initialMovie is not provided', () => {
      render(
        <MovieForm
          onSubmit={jest.fn()}
          onCancel={jest.fn()}
          availableGenres={MOCK_GENRES}
        />
      );

      expect(screen.getByTestId("movie-form-submit-button")).toHaveTextContent(
        "Add Movie"
      );
    });

    it('should show "Update Movie" button text when initialMovie is provided', () => {
      render(
        <MovieForm
          onSubmit={jest.fn()}
          onCancel={jest.fn()}
          initialMovie={MOCK_MOVIE}
          availableGenres={MOCK_GENRES}
        />
      );

      expect(screen.getByTestId("movie-form-submit-button")).toHaveTextContent(
        "Update Movie"
      );
    });

    it("should populate form fields with initial movie data", () => {
      render(
        <MovieForm
          onSubmit={jest.fn()}
          onCancel={jest.fn()}
          initialMovie={MOCK_MOVIE}
          availableGenres={MOCK_GENRES}
        />
      );

      expect(screen.getByTestId("movie-title-input")).toHaveValue(
        MOCK_MOVIE.title
      );
      expect(screen.getByTestId("movie-image-url-input")).toHaveValue(
        MOCK_MOVIE.poster_path
      );
      expect(screen.getByTestId("movie-duration-input")).toHaveValue(
        MOCK_MOVIE.runtime
      );
      expect(screen.getByTestId("movie-rating-input")).toHaveValue(
        MOCK_MOVIE.vote_average
      );
      expect(screen.getByTestId("movie-description-textarea")).toHaveValue(
        MOCK_MOVIE.overview
      );
      expect(screen.getByTestId("movie-release-date-input")).toHaveValue(
        "2023-01-15"
      );
    });

    it("should check genre checkboxes based on initial movie data", () => {
      render(
        <MovieForm
          onSubmit={jest.fn()}
          onCancel={jest.fn()}
          initialMovie={MOCK_MOVIE}
          availableGenres={MOCK_GENRES}
        />
      );

      expect(screen.getByTestId("genre-checkbox-action")).toBeChecked();
      expect(screen.getByTestId("genre-checkbox-drama")).toBeChecked();

      expect(screen.getByTestId("genre-checkbox-comedy")).not.toBeChecked();
      expect(screen.getByTestId("genre-checkbox-horror")).not.toBeChecked();
      expect(
        screen.getByTestId("genre-checkbox-science fiction")
      ).not.toBeChecked();
    });

    it("should render empty form when no initial data is provided", () => {
      render(
        <MovieForm
          onSubmit={jest.fn()}
          onCancel={jest.fn()}
          availableGenres={MOCK_GENRES}
        />
      );

      expect(screen.getByTestId("movie-title-input")).toHaveValue("");
      expect(screen.getByTestId("movie-image-url-input")).toHaveValue("");
      expect(screen.getByTestId("movie-duration-input")).toHaveValue(null);
      expect(screen.getByTestId("movie-rating-input")).toHaveValue(null);
      expect(screen.getByTestId("movie-description-textarea")).toHaveValue("");
      expect(screen.getByTestId("movie-release-date-input")).toHaveValue("");
    });

    it("should call onSubmit with correct data when form is submitted", async () => {
      const mockOnSubmit = jest.fn();
      render(
        <MovieForm
          onSubmit={mockOnSubmit}
          onCancel={jest.fn()}
          availableGenres={MOCK_GENRES}
        />
      );

      fireEvent.change(screen.getByTestId("movie-title-input"), {
        target: { value: "New Movie" },
      });
      fireEvent.change(screen.getByTestId("movie-image-url-input"), {
        target: { value: "https://example.com/new.jpg" },
      });
      fireEvent.change(screen.getByTestId("movie-duration-input"), {
        target: { value: "90" },
      });
      fireEvent.change(screen.getByTestId("movie-release-date-input"), {
        target: { value: "2024-01-01" },
      });
      fireEvent.change(screen.getByTestId("movie-rating-input"), {
        target: { value: "7.5" },
      });
      fireEvent.change(screen.getByTestId("movie-description-textarea"), {
        target: { value: "A new movie description" },
      });

      fireEvent.click(screen.getByTestId("genre-checkbox-action"));
      fireEvent.click(screen.getByTestId("genre-checkbox-comedy"));

      // Submit
      fireEvent.click(screen.getByTestId("movie-form-submit-button"));
      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledTimes(1);
      });

      const submittedData: MovieFormData = mockOnSubmit.mock.calls[0][0];
      expect(submittedData.title).toBe("New Movie");
      expect(submittedData.poster_path).toBe("https://example.com/new.jpg");
      expect(submittedData.runtime).toBe(90);
      expect(submittedData.vote_average).toBe(7.5);
      expect(submittedData.overview).toBe("A new movie description");
      expect(submittedData.release_date).toEqual(new Date("2024-01-01"));
      expect(submittedData.genres).toEqual(["Action", "Comedy"]);
    });

    it("should call onCancel when cancel button is clicked", () => {
      const mockOnCancel = jest.fn();
      render(
        <MovieForm
          onSubmit={jest.fn()}
          onCancel={mockOnCancel}
          availableGenres={MOCK_GENRES}
        />
      );

      fireEvent.click(screen.getByTestId("movie-form-cancel-button"));

      expect(mockOnCancel).toHaveBeenCalledTimes(1);
    });
  });
});
