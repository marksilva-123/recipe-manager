import type { NewRecipe, RecipePatch, SavedRecipe } from "./recipes.types";

const KEY = "saved-recipes";

const read = (): SavedRecipe[] => {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]") as SavedRecipe[];
  } catch {
    return [];
  }
}

const write = (rows: SavedRecipe[]) => localStorage.setItem(KEY, JSON.stringify(rows));

export const getRecipes = async (): Promise<SavedRecipe[]> => read();

export const createRecipe = async (recipe: NewRecipe): Promise<SavedRecipe> => {
  const row: SavedRecipe = { ...recipe, id: crypto.randomUUID() };
  write([...read(), row]);
  return row;
};

export const updateRecipe = async ({ id, ...patch }: RecipePatch): Promise<SavedRecipe> => {
  const rows = read().map((recipe) => (recipe.id === id ? { ...recipe, ...patch } : recipe));
  write(rows);
  return rows.find((recipe) => recipe.id === id)!;
};

export const deleteRecipe = async (id: string): Promise<{ id: string }> => {
  write(read().filter((recipe) => recipe.id !== id));
  return { id };
};
