import type { RecipePatch, SavedRecipe } from "@/features/recipes/recipes.types";
import EditRecipeForm from "./EditRecipeForm";

interface SavedRecipeCardProps {
  recipe: SavedRecipe;
  isEditing: boolean;
  onEdit: (recipe: SavedRecipe) => void;
  onCancel: () => void;
  onSave: (patch: RecipePatch) => void;
  onDelete: (id: number) => void;
  onToggleFavorite: (recipe: SavedRecipe) => void;
}

export default function SavedRecipeCard({
  recipe,
  isEditing,
  onEdit,
  onCancel,
  onSave,
  onDelete,
  onToggleFavorite,
}: SavedRecipeCardProps) {
  return (
    <article className="card bg-base-100 shadow">
      <figure>
        <img src={recipe.thumb} alt={recipe.title} className="h-48 w-full object-cover" />
      </figure>
      <div className="card-body">
        {isEditing ? (
          <EditRecipeForm recipe={recipe} onSave={onSave} onCancel={onCancel} />
        ) : (
          <>
            <div className="flex items-start justify-between gap-3">
              <h2 className="card-title">{recipe.title}</h2>
              <button
                className="btn btn-ghost btn-sm"
                type="button"
                aria-label={`Toggle favorite for ${recipe.title}`}
                onClick={() => onToggleFavorite(recipe)}
              >
                {recipe.favorite ? "★" : "☆"}
              </button>
            </div>
            <div className="flex gap-2">
              <span className="badge badge-primary">{recipe.category}</span>
              <span className="badge badge-ghost">{recipe.time} min</span>
            </div>
            {recipe.notes && <p className="text-sm">{recipe.notes}</p>}
            <div className="card-actions justify-end">
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => onEdit(recipe)}>
                Edit
              </button>
              <button type="button" className="btn btn-error btn-sm" onClick={() => onDelete(recipe.id)}>
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </article>
  );
}
