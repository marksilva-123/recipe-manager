const FILTERS = ["All", "Breakfast", "Lunch", "Dinner", "Dessert"];

export default function CategoryFilter({ activeFilter, onFilterChange }) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {/* TODO: render one button per FILTERS entry.
          - Each button calls onFilterChange(f) on click.
          - The active button should look different from the others
            (e.g., "btn-primary" for active, "btn-outline" otherwise).
          - Don't forget the `key` prop! */
        ["all", "watched", "unwatched"].map((filter) => (
        <button
        key={filter}
        className={`btn join-item ${currentFilter === filter ? "btn-primary" : "btn-ghost"}`}
        onClick={() => onChangeFilter(filter)}
        type="button"
      >
        {filter[0].toUpperCase() + filter.slice(1)}
      </button>
    ))}
    </div>
  );
}
