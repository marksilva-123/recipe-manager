import { api } from "@/lib/api";
import type { NewRecipe, RecipePatch, SavedRecipe } from "./recipes.types";

export async function getRecipes(): Promise<SavedRecipe[]> {
  return (await api.get<SavedRecipe[]>("/recipes")).data;
}

export async function createRecipe(recipe: NewRecipe): Promise<SavedRecipe> {
  return (await api.post<SavedRecipe>("/recipes", recipe)).data;
}

export async function updateRecipe({ id, ...patch }: RecipePatch): Promise<SavedRecipe> {
  return (await api.patch<SavedRecipe>(`/recipes/${id}`, patch)).data;
}

export async function deleteRecipe(id: number): Promise<void> {
  await api.delete(`/recipes/${id}`);
}
