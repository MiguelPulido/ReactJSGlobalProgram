import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import MovieDetails from "../MovieDetails";
import type { Movie } from "../../../types/movie";

const mockMovie: Movie = {
  id: "1",
  title: "Test Movie",
  genres: ["Action", "Comedy"],
  poster_path: "https://example.com/poster.jpg",
  vote_average: 8.5,
  overview: "test movie 1",
  release_date: new Date(2023, 11, 1),
  runtime: 120,
};

const mockMovieMissingImageAndGenres: Movie = {
  id: "2",
  title: "Missing Data Movie",
  genres: [],
  poster_path: "",
  vote_average: 7.0,
  overview: "Missing Data description",
  release_date: new Date(2020, 0, 1),
  runtime: 90,
};

const mockMovieLongDuration: Movie = {
  id: "3",
  title: "Epic Movie",
  genres: ["Drama", "Adventure", "Fantasy"],
  poster_path: "https://example.com/epic.jpg",
  vote_average: 9.2,
  overview: "test movie 3",
  release_date: new Date(2021, 5, 15),
  runtime: 195,
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
