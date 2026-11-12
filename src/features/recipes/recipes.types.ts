import type { Recipe } from "@/features/meals/meals.types";

export type NewRecipe = Recipe;

export type SavedRecipe = Recipe & {
  id: string;
};

export type RecipePatch = {
  id: string;
} & Partial<Omit<SavedRecipe, "id">>;
