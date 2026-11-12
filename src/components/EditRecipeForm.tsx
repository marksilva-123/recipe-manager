import { useRef, useState } from "react";
import type { RecipePatch, SavedRecipe } from "@/features/recipes/recipes.types";

interface EditRecipeFormProps {
  recipe: SavedRecipe;
  onSave: (patch: RecipePatch) => void;
  onCancel: () => void;
}

export default function EditRecipeForm({ recipe, onSave, onCancel }: EditRecipeFormProps) {
  const [time, setTime] = useState(String(recipe.time ?? 0));
  const [notes, setNotes] = useState(recipe.notes ?? "");
  const original = useRef({ time: recipe.time ?? 0, notes: recipe.notes ?? "" });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextTime = Number(time) || 0;
    const nextNotes = notes.trim();

    if (nextTime === original.current.time && nextNotes === original.current.notes) {
      onCancel();
      return;
    }

    onSave({ id: recipe.id, time: nextTime, notes: nextNotes });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="number"
        min="0"
        className="input input-bordered w-full"
        value={time}
        onChange={(event) => setTime(event.target.value)}
      />
      <textarea
        className="textarea textarea-bordered w-full"
        rows={3}
        value={notes}
        onChange={(event) => setNotes(event.target.value)}
      />
      <div className="flex gap-2 justify-end">
        <button type="button" className="btn btn-ghost btn-sm" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary btn-sm">
          Save
        </button>
      </div>
    </form>
  );
}
