import type { Recipe } from "@/features/meals/meals.types";

export type NewRecipe = Recipe;

export type SavedRecipe = Recipe & {
  id: number;
};

export type RecipePatch = {
  id: number;
} & Partial<Pick<Recipe, "time" | "notes" | "favorite">>;
