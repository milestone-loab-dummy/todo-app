# FAQ — Delete a Todo (US-07)

## How do I delete a todo?

Hover over the todo. A delete button (×) appears on the right. Click it to remove the todo.

## Why doesn't the delete button show all the time?

The delete button is hidden by default to keep the interface clean. It appears on hover so it is available when you need it without cluttering the list.

## Is there a confirmation before deleting?

No confirmation dialog is shown. The todo is deleted immediately when you click the delete button.

## Can I undo a deletion?

There is no undo. Once a todo is deleted, it is permanently removed from the database.

## What if I delete a todo that is already completed?

Completed todos can be deleted the same way — hover and click the delete button. Alternatively, use "Clear completed" in the footer to delete all completed todos at once (see US-10).

## What happens if the delete request fails?

A toast notification appears and the todo remains in the list. The deletion is not applied until the backend confirms.

## Can I delete all todos at once?

Use the "Clear completed" bulk action to remove all completed todos at once. There is no "delete all" option that removes active todos in bulk.

## Does deleting a todo affect other todos?

No. Deleting one todo has no effect on the rest of the list.
