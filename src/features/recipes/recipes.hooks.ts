import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createRecipe, deleteRecipe, getRecipes, updateRecipe } from "./recipes.api";
import type { NewRecipe, RecipePatch, SavedRecipe } from "./recipes.types";

const KEY = ["recipes"];

export function useSavedRecipes() {
  return useQuery({
    queryKey: KEY,
    queryFn: getRecipes,
  });
}

export function useCreateRecipe() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (recipe: NewRecipe) => createRecipe(recipe),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY }),
  });
}

export function useUpdateRecipe() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (patch: RecipePatch) => updateRecipe(patch),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY }),
  });
}

export function useDeleteRecipe() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteRecipe(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY }),
  });
}

export function useToggleFavorite() {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: KEY });

  return useMutation({
    mutationFn: updateRecipe,
    onMutate: async ({ id, favorite }: RecipePatch) => {
      await queryClient.cancelQueries({ queryKey: KEY });
      const previous = queryClient.getQueryData<SavedRecipe[]>(KEY);
      queryClient.setQueryData<SavedRecipe[]>(KEY, (old = []) =>
        old.map((recipe) =>
          recipe.id === id ? { ...recipe, favorite: Boolean(favorite) } : recipe,
        ),
      );
      return { previous };
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(KEY, context?.previous);
    },
    onSettled: invalidate,
  });
}
