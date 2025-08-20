import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GenreSelect from "../GenreSelect";

import "@testing-library/jest-dom";

describe("GenreSelect Component", () => {
  const mockOnSelect = jest.fn();
  const MOCK_GENRES = ["All", "Documentary", "Comedy", "Horror", "Crime"];

  beforeEach(() => {
    mockOnSelect.mockClear();
  });

  test("component renders all genres passed in props", () => {
    render(
      <GenreSelect
        genres={MOCK_GENRES}
        selectedGenre={MOCK_GENRES[0]}
        onSelect={mockOnSelect}
      />
    );

    MOCK_GENRES.forEach((genre) => {
      expect(screen.getByRole("button", { name: genre })).toBeInTheDocument();
    });
  });

  test("component highlights a selected genre passed in props", () => {
    const selectedGenre = MOCK_GENRES[2];
    const nonSelectedGenre = MOCK_GENRES[3];
    render(
      <GenreSelect
        genres={MOCK_GENRES}
        selectedGenre={selectedGenre}
        onSelect={mockOnSelect}
      />
    );

    const selectedButton = screen.getByRole("button", { name: selectedGenre });
    const nonSelectedButton = screen.getByRole("button", {
      name: nonSelectedGenre,
    });

    expect(selectedButton).toHaveClass("genre-button-selected");
    expect(selectedButton).not.toHaveClass("genre-button");

    expect(nonSelectedButton).toHaveClass("genre-button");
    expect(nonSelectedButton).not.toHaveClass("genre-button-selected");
  });

  test('after a click event on a genre button component calls "onSelect" callback and passes correct genre in arguments', async () => {
    const user = userEvent.setup();
    const targetGenre = MOCK_GENRES[3];

    render(
      <GenreSelect
        genres={MOCK_GENRES}
        selectedGenre={MOCK_GENRES[0]}
        onSelect={mockOnSelect}
      />
    );

    const genreButton = screen.getByRole("button", { name: targetGenre });
    await user.click(genreButton);

    expect(mockOnSelect).toHaveBeenCalledTimes(1);
    expect(mockOnSelect).toHaveBeenCalledWith(targetGenre);
  });
});
