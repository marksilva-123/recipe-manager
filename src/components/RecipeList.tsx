import type { RecipePatch, SavedRecipe } from "@/features/recipes/recipes.types";
import SavedRecipeCard from "./SavedRecipeCard";

interface RecipeListProps {
  recipes: SavedRecipe[];
  onToggleFavorite: (recipe: SavedRecipe) => void;
  onEdit: (recipe: SavedRecipe) => void;
  onDelete: (id: SavedRecipe["id"]) => void;
  deletingId: SavedRecipe["id"] | null;
}

export default function RecipeList({ recipes, onToggleFavorite, onEdit, onDelete, deletingId }: RecipeListProps) {
  if (recipes.length === 0) {
    return <p className="text-center py-8 text-base-content/60">No saved recipes match this filter.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {recipes.map((recipe) => (
        <SavedRecipeCard
          key={recipe.id}
          recipe={recipe}
          isEditing={false}
          onEdit={onEdit}
          onCancel={() => undefined}
          onSave={(_patch: RecipePatch) => undefined}
          onDelete={onDelete}
          onToggleFavorite={onToggleFavorite}
          deleting={deletingId === recipe.id}
        />
      ))}
    </div>
  );
}
