import type { Recipe } from "@/features/meals/meals.types";

interface MealCardProps {
  meal: Recipe;
  isSaved: boolean;
  isSaving: boolean;
  onSave: (meal: Recipe) => void;
}

export default function MealCard({ meal, isSaved, isSaving, onSave }: MealCardProps) {
  const label = isSaved ? "Saved" : isSaving ? "Saving..." : "Save";

  return (
    <article className="card bg-base-100 shadow">
      <figure>
        <img src={meal.thumb} alt={meal.title} className="h-48 w-full object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{meal.title}</h2>
        <span className="badge badge-primary">{meal.category}</span>
        <div className="card-actions justify-end">
          <button
            className={`btn btn-sm ${isSaved ? "btn-disabled" : "btn-primary"}`}
            onClick={() => onSave(meal)}
            disabled={isSaved || isSaving}
            type="button"
          >
            {label}
          </button>
        </div>
      </div>
    </article>
  );
}
