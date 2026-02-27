# FAQ — Edit a Todo Title (US-06)

## How do I edit a todo?

**Double-click** the todo title. The title becomes an editable input field.

## How do I save my changes?

Press **Enter** or click anywhere outside the input field. The new title is saved to the backend.

## How do I cancel an edit?

Press **Escape**. The input is dismissed and the original title is restored — nothing is saved.

## What happens if I save an empty title?

The edit is cancelled automatically. Empty titles are not allowed, so the original title is restored.

## Can I edit a completed todo's title?

Yes. Double-clicking a completed todo's title activates edit mode regardless of its completion status.

## Does the edit persist after a page refresh?

Yes. The updated title is saved to the backend database immediately when you confirm the edit.

## What if I accidentally press Enter before finishing?

The title is saved as-is. To continue editing, double-click the title again.

## What if the save request fails?

A toast notification appears and the original title is restored. The change is not persisted until the backend confirms.
