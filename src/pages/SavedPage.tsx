import { useState } from "react";
import { useCategories } from "@/features/meals/meals.hooks";
import { useSavedRecipes, useDeleteRecipe, useToggleFavorite, useUpdateRecipe } from "@/features/recipes/recipes.hooks";
import type { SavedRecipe } from "@/features/recipes/recipes.types";
import CategoryFilter from "@/components/CategoryFilter";
import RecipeList from "@/components/RecipeList";
import SummaryBar from "@/components/SummaryBar";
import EditRecipeForm from "@/components/EditRecipeForm";

export default function SavedPage() {
  const [filter, setFilter] = useState("All");
  const [editing, setEditing] = useState<SavedRecipe | null>(null);
  const query = useSavedRecipes();
  const categories = useCategories();
  const remove = useDeleteRecipe();
  const update = useUpdateRecipe();
  const favorite = useToggleFavorite();
  const saved = query.data ?? [];
  const favoriteCount = saved.filter((recipe) => recipe.favorite).length;
  const visible = filter === "All" ? saved : saved.filter((recipe) => recipe.category === filter);

  return (
    <>
      <SummaryBar total={saved.length} favorites={favoriteCount} />
      <CategoryFilter categories={categories.data ?? []} activeFilter={filter} onFilterChange={setFilter} />
      {query.isPending && <div className="text-center py-12"><span className="loading loading-spinner loading-lg" /></div>}
      {query.isError && <div className="alert alert-error">Could not load saved recipes.</div>}
      {query.data && (
        <RecipeList
          recipes={visible}
          onToggleFavorite={(recipe) => favorite.mutate({ id: recipe.id, favorite: !recipe.favorite })}
          onEdit={setEditing}
          onDelete={remove.mutate}
          deletingId={remove.isPending ? (remove.variables ?? null) : null}
        />
      )}
      {editing && (
        <div className="modal modal-open">
          <div className="modal-box">
            <EditRecipeForm
              recipe={editing}
              onSave={(patch) => {
                update.mutate(patch);
                setEditing(null);
              }}
              onCancel={() => setEditing(null)}
            />
          </div>
        </div>
      )}
    </>
  );
}
