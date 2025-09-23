import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import MovieTile from "../MovieTile";
import type { Movie } from "../../../types/movie";

const mockMovie: Movie = {
  id: 1,
  title: "Test Movie",
  genres: ["Action", "Comedy"],
  poster_path: "https://example.com/poster.jpg",
  vote_average: 8.5,
  overview: "A test movie description",
  release_date: new Date(2023, 11, 1),
  runtime: 120,
};

const mockMovieNoImageUrl: Movie = {
  id: 1,
  title: "Test Movie With No Image",
  genres: ["Action", "Comedy"],
  poster_path: "",
  vote_average: 8.5,
  overview: "A test movie description",
  release_date: new Date(2023, 11, 1),
  runtime: 120,
};

describe("MovieTile Component", () => {
  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();
  const mockOnClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render movie information correctly", () => {
    render(
      <MovieTile
        movie={mockMovie}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onClick={mockOnClick}
      />
    );

    expect(screen.getByText("Test Movie")).toBeInTheDocument();
    expect(screen.getByText("2023")).toBeInTheDocument();
    expect(screen.getByText("Action, Comedy")).toBeInTheDocument();
  });

  it("should display genres correctly when multiple genres exist", () => {
    render(
      <MovieTile
        movie={mockMovie}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onClick={mockOnClick}
      />
    );

    expect(screen.getByText("Action, Comedy")).toBeInTheDocument();
  });

  it("should render poster image when imageUrl is provided", () => {
    render(
      <MovieTile
        movie={mockMovie}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onClick={mockOnClick}
      />
    );

    const posterImage = screen.getByAltText("Test Movie poster");
    expect(posterImage).toBeInTheDocument();
    expect(posterImage).toHaveAttribute(
      "src",
      "https://example.com/poster.jpg"
    );
  });

  it("should render placeholder when imageUrl is empty", () => {
    render(
      <MovieTile
        movie={mockMovieNoImageUrl}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onClick={mockOnClick}
      />
    );

    expect(screen.getByText("No Image")).toBeInTheDocument();
    expect(
      screen.queryByAltText("Test Movie With No Image poster")
    ).not.toBeInTheDocument();
  });

  it("should show context menu button", () => {
    render(
      <MovieTile
        movie={mockMovie}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onClick={mockOnClick}
      />
    );

    const menuButton = screen.getByTestId("movie-tile-dropdown-1");
    expect(menuButton).toBeInTheDocument();
  });

  it("should have Edit and Delete options in dropdown menu", () => {
    render(
      <MovieTile
        movie={mockMovie}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onClick={mockOnClick}
      />
    );

    expect(screen.getByTestId("movie-tile-edit-button-1")).toBeInTheDocument();
    expect(
      screen.getByTestId("movie-tile-delete-button-1")
    ).toBeInTheDocument();
    expect(screen.getByText("Edit")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it("should call onClick when movie tile is clicked", () => {
    render(
      <MovieTile
        movie={mockMovie}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onClick={mockOnClick}
      />
    );

    const movieTile = screen.getByTestId("movie-tile-1");
    fireEvent.click(movieTile);

    expect(mockOnClick).toHaveBeenCalledWith(mockMovie);
  });

  it("should not call onClick when dropdown is clicked", () => {
    render(
      <MovieTile
        movie={mockMovie}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onClick={mockOnClick}
      />
    );

    const menuButton = screen.getByTestId("movie-tile-dropdown-1");
    fireEvent.click(menuButton);

    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it("should call onEdit when Edit menu item is clicked", () => {
    render(
      <MovieTile
        movie={mockMovie}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onClick={mockOnClick}
      />
    );

    const editButton = screen.getByTestId("movie-tile-edit-button-1");
    fireEvent.click(editButton);

    expect(mockOnEdit).toHaveBeenCalledWith(mockMovie);
  });

  it("should call onDelete when Delete menu item is clicked", () => {
    render(
      <MovieTile
        movie={mockMovie}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onClick={mockOnClick}
      />
    );

    const deleteButton = screen.getByTestId("movie-tile-delete-button-1");
    fireEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledWith(mockMovie);
  });
});
