# FAQ — Complete / Uncomplete a Todo (US-05)

## How do I mark a todo as complete?

Click the **checkbox** to the left of the todo title. The title gets a strikethrough style and the todo is marked complete.

## How do I unmark a completed todo?

Click the checkbox again. The strikethrough is removed and the todo becomes active again.

## Does the completion state persist after I refresh the page?

Yes. The toggle is saved to the backend database immediately. Refreshing the page restores the last known state.

## Can I complete multiple todos at once?

Use the **Mark all complete** bulk action in the footer to complete all active todos at once (see US-10).

## What does the strikethrough style mean?

Strikethrough text is a visual indicator that a todo is done. Completed todos remain in the list until you delete them or use "Clear completed".

## What if the toggle request fails?

A toast notification appears and the checkbox visually reverts to its previous state. The change is not saved until the backend confirms.

## Does completing a todo delete it?

No. Completing a todo only changes its status. To remove it from the list, use the delete button or the "Clear completed" bulk action.

## How do I tell which todos are active vs. completed?

Active todos have a normal title. Completed todos show a strikethrough title and a filled checkbox.
