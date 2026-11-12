interface CategoryFilterProps {
  categories: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function CategoryFilter({ categories, activeFilter, onFilterChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {["All", ...categories].map((category) => (
        <button
          type="button"
          key={category}
          className={`btn ${activeFilter === category ? "btn-primary" : "btn-outline"}`}
          onClick={() => onFilterChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
