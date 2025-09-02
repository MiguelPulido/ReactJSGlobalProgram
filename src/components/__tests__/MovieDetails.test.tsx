import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import MovieDetails from "../MovieDetails";
import type { Movie } from "../../types/movie";

const mockMovie: Movie = {
  id: "1",
  title: "Test Movie",
  genres: ["Action", "Comedy"],
  imageUrl: "https://example.com/poster.jpg",
  rating: 8.5,
  description: "test movie 1",
  releaseDate: new Date(2023, 11, 1),
  durationInMinutes: 120,
};

const mockMovieMissingImageAndGenres: Movie = {
  id: "2",
  title: "Missing Data Movie",
  genres: [],
  imageUrl: "",
  rating: 7.0,
  description: "Missing Data description",
  releaseDate: new Date(2020, 0, 1),
  durationInMinutes: 90,
};

const mockMovieLongDuration: Movie = {
  id: "3",
  title: "Epic Movie",
  genres: ["Drama", "Adventure", "Fantasy"],
  imageUrl: "https://example.com/epic.jpg",
  rating: 9.2,
  description: "test movie 3",
  releaseDate: new Date(2021, 5, 15),
  durationInMinutes: 195,
};

describe("MovieDetails Component", () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render movie information correctly", () => {
    render(<MovieDetails movie={mockMovie} onClose={mockOnClose} />);

    expect(screen.getByText("Test Movie")).toBeInTheDocument();
    expect(screen.getByText("2023")).toBeInTheDocument();
    expect(screen.getByText("8.5")).toBeInTheDocument();
    expect(screen.getByText("2h 0m")).toBeInTheDocument();
    expect(screen.getByText("test movie 1")).toBeInTheDocument();
  });

  it("should render poster image when imageUrl is provided", () => {
    render(<MovieDetails movie={mockMovie} onClose={mockOnClose} />);

    const posterImage = screen.getByTestId("movie-poster");
    expect(posterImage).toBeInTheDocument();
    expect(posterImage).toHaveAttribute(
      "src",
      "https://example.com/poster.jpg"
    );
    expect(posterImage).toHaveAttribute("alt", "Test Movie poster");
  });

  it("should render placeholder when imageUrl is empty", () => {
    render(
      <MovieDetails
        movie={mockMovieMissingImageAndGenres}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByTestId("movie-poster-placeholder")).toBeInTheDocument();
    expect(screen.getByText("No Image")).toBeInTheDocument();
    expect(screen.queryByTestId("movie-poster")).not.toBeInTheDocument();
  });

  it("should format duration correctly for standard length movies", () => {
    render(<MovieDetails movie={mockMovie} onClose={mockOnClose} />);
    expect(screen.getByText("2h 0m")).toBeInTheDocument();
  });

  it("should format duration correctly for long movies", () => {
    render(
      <MovieDetails movie={mockMovieLongDuration} onClose={mockOnClose} />
    );
    expect(screen.getByText("3h 15m")).toBeInTheDocument();
  });

  it("should display genres correctly when multiple genres exist", () => {
    render(<MovieDetails movie={mockMovie} onClose={mockOnClose} />);

    expect(screen.queryByText("Genres")).toBeInTheDocument();
    expect(screen.queryByText("Action, Comedy")).toBeInTheDocument();
  });

  it("should not show genres section when genres array is empty", () => {
    render(
      <MovieDetails
        movie={mockMovieMissingImageAndGenres}
        onClose={mockOnClose}
      />
    );

    expect(screen.queryByTestId("movie-genres")).not.toBeInTheDocument();
    expect(screen.queryByText("Genres")).not.toBeInTheDocument();
  });

  it("should call onClose when close button is clicked", () => {
    render(<MovieDetails movie={mockMovie} onClose={mockOnClose} />);

    const closeButton = screen.getByTestId("close-button");
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
