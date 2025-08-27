import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SortControl from "../SortControl";

describe("SortControl Component", () => {
  const mockOnSortChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render sort control with label and select", () => {
    render(
      <SortControl currentSort="Release Date" onSortChange={mockOnSortChange} />
    );

    expect(screen.getByText("Sort by:")).toBeInTheDocument();
    expect(screen.getByTestId("sort-select")).toBeInTheDocument();
  });

  it("should display current sort selection correctly", () => {
    render(<SortControl currentSort="Title" onSortChange={mockOnSortChange} />);

    const selectElement = screen.getByTestId(
      "sort-select"
    ) as HTMLSelectElement;
    expect(selectElement.value).toBe("Title");
  });

  it("should have both sort options available", () => {
    render(
      <SortControl currentSort="Release Date" onSortChange={mockOnSortChange} />
    );

    expect(
      screen.getByRole("option", { name: "Release Date" })
    ).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Title" })).toBeInTheDocument();
  });

  it("should call onSortChange when selection changes to Title", () => {
    render(
      <SortControl currentSort="Release Date" onSortChange={mockOnSortChange} />
    );

    const selectElement = screen.getByTestId("sort-select");
    fireEvent.change(selectElement, { target: { value: "Title" } });

    expect(mockOnSortChange).toHaveBeenCalledWith("Title");
    expect(mockOnSortChange).toHaveBeenCalledTimes(1);
  });
});
