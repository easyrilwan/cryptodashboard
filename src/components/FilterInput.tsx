interface FilterInputProps {
  filter: string;
  onFilterChange: (value: string) => void;
}

export default function FilterInput({
  filter,
  onFilterChange,
}: FilterInputProps) {
  return (
    <div className="filter">
      <input
        type="search"
        placeholder="Filter coins by name or symbol"
        value={filter}
        onChange={(e) => onFilterChange(e.target.value)}
      />
    </div>
  );
}
