import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import MealCard from "@/components/MealCard";
import SavedRecipeCard from "@/components/SavedRecipeCard";
import { useCategories, useSearchMeals } from "@/features/meals/meals.hooks";
import type { Recipe } from "@/features/meals/meals.types";
import {
  useCreateRecipe,
  useDeleteRecipe,
  useSavedRecipes,
  useToggleFavorite,
  useUpdateRecipe,
} from "@/features/recipes/recipes.hooks";
import type { RecipePatch, SavedRecipe } from "@/features/recipes/recipes.types";

export default function App() {
  const [term, setTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [editing, setEditing] = useState<SavedRecipe | null>(null);
  const search = useSearchMeals(term);
  const categories = useCategories();
  const savedQuery = useSavedRecipes();
  const create = useCreateRecipe();
  const update = useUpdateRecipe();
  const remove = useDeleteRecipe();
  const favorite = useToggleFavorite();
  const saved = savedQuery.data ?? [];
  const meals = search.data ?? [];
  const savedMealIds = new Set(saved.map((recipe) => recipe.mealId));
  const visible = filter === "All" ? saved : saved.filter((recipe) => recipe.category === filter);

  const saveMeal = (meal: Recipe) => create.mutate(meal);
  const saveEdit = (patch: RecipePatch) => {
    update.mutate(patch, { onSuccess: () => setEditing(null) });
  };

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="text-center">
          <h1 className="text-4xl font-bold">Recipe Manager</h1>
          <p className="text-base-content/70 mt-2">Search TheMealDB and manage your saved recipes</p>
        </header>

        <section className="space-y-4">
          <SearchBar term={term} onChange={setTerm} />
          {search.isLoading && <p className="text-center">Searching...</p>}
          {search.isError && <p className="alert alert-error">Could not load meals.</p>}
          {term && !search.isLoading && meals.length === 0 && <p className="text-center py-4">No meals found.</p>}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {meals.map((meal) => (
              <MealCard
                key={meal.mealId}
                meal={meal}
                isSaved={savedMealIds.has(meal.mealId)}
                isSaving={create.isPending && create.variables?.mealId === meal.mealId}
                onSave={saveMeal}
              />
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex flex-wrap gap-2 justify-center">
            <button type="button" className={`btn ${filter === "All" ? "btn-primary" : "btn-outline"}`} onClick={() => setFilter("All")}>
              All
            </button>
            {(categories.data ?? []).map((category) => (
              <button
                type="button"
                key={category}
                className={`btn ${filter === category ? "btn-primary" : "btn-outline"}`}
                onClick={() => setFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
          {savedQuery.isLoading && <p className="text-center">Loading saved recipes...</p>}
          {savedQuery.isError && <p className="alert alert-error">Could not load saved recipes.</p>}
          {!savedQuery.isLoading && visible.length === 0 && <p className="text-center py-4">No saved recipes match this filter.</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {visible.map((recipe) => (
              <SavedRecipeCard
                key={recipe.id}
                recipe={recipe}
                isEditing={editing?.id === recipe.id}
                onEdit={setEditing}
                onCancel={() => setEditing(null)}
                onSave={saveEdit}
                onDelete={(id) => remove.mutate(id)}
                onToggleFavorite={(recipe) => favorite.mutate({ id: recipe.id, favorite: !recipe.favorite })}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
