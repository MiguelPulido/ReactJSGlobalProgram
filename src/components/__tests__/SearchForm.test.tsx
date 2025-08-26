import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchForm from "../SearchForm";

import "@testing-library/jest-dom";

describe("SearchForm Component", () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
  });

  test("renders an input with the value equal to initial value passed in props", () => {
    const initialSearchText = "search value";
    render(
      <SearchForm
        initialSearchText={initialSearchText}
        onSearch={mockOnSearch}
      />
    );

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue(initialSearchText);
  });

  test('after typing to the input and a "click" event on the Submit button, the "onSearch" prop is called with proper value', async () => {
    const user = userEvent.setup();
    const initialText = "initial search value";
    const newSearchText = "new search value";

    render(
      <SearchForm initialSearchText={initialText} onSearch={mockOnSearch} />
    );

    const input = screen.getByRole("textbox");
    const submitButton = screen.getByRole("button", { name: /search/i });

    await user.clear(input);
    await user.type(input, newSearchText);
    expect(input).toHaveValue(newSearchText);
    await user.click(submitButton);

    expect(mockOnSearch).toHaveBeenCalledTimes(1);
    expect(mockOnSearch).toHaveBeenCalledWith(newSearchText);
  });

  test('after typing to the input and pressing Enter key, the "onSearch" prop is called with proper value', async () => {
    const user = userEvent.setup();
    const initialText = "initial search value";
    const newSearchText = "search with enter";

    render(
      <SearchForm initialSearchText={initialText} onSearch={mockOnSearch} />
    );

    const input = screen.getByRole("textbox");

    await user.clear(input);
    await user.type(input, newSearchText);
    expect(input).toHaveValue(newSearchText);
    await user.keyboard("{Enter}");

    expect(mockOnSearch).toHaveBeenCalledTimes(1);
    expect(mockOnSearch).toHaveBeenCalledWith(newSearchText);
  });
});
