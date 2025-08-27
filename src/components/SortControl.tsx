export type SortOption = "Release Date" | "Title";

export interface SortControlProps {
  currentSort: SortOption;
  onSortChange: (sortOption: SortOption) => void;
}

export const SortControl = ({
  currentSort,
  onSortChange,
}: SortControlProps) => {
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = event.target.value as SortOption;
    onSortChange(newSort);
  };

  return (
    <div className="d-flex align-items-center gap-2" data-testid="sort-control">
      <label className="form-label mb-0 fw-medium">Sort by:</label>
      <select
        className="form-select form-select-sm"
        style={{ width: "auto", minWidth: "150px" }}
        value={currentSort}
        onChange={handleSortChange}
        data-testid="sort-select"
        aria-label="Sort movies by"
      >
        <option value="Release Date">Release Date</option>
        <option value="Title">Title</option>
      </select>
    </div>
  );
};

export default SortControl;
