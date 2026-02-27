# Deleting a Todo

Learn how to remove a todo permanently from your list.

---

## Delete a Todo

### Step 1: Hover over the todo you want to delete

A **×** button appears on the right side of the row.

### Step 2: Click the × button

The todo is removed from the list immediately and deleted from the database.

> **Note:** There is no undo. Once deleted, a todo cannot be recovered.

---

## In-App Copy Suggestions

| Location | Suggested Text |
|----------|----------------|
| Delete button `aria-label` | `Delete todo` |
| Button text | `×` |
| Error toast (delete failed) | `Failed to delete todo. Please try again.` |

---

## Troubleshooting

### The × button doesn't appear

**Problem:** You can't see the delete button.

**Solution:** Hover your mouse cursor directly over the todo row. The button is intentionally hidden until you hover to keep the list uncluttered.

On touch devices, tap and hold the row to reveal the button.

### Todo comes back after deleting

**Problem:** You deleted a todo but it reappears after a page reload.

**Solution:**
1. Check the backend is running
2. Look for an error toast at the time of deletion — if the API call failed, the local removal did not persist
3. The database was not updated — try deleting again

### Delete button is greyed out

**Problem:** The × button is visible but unresponsive.

**Solution:** Another action on this todo is in-flight (e.g., a toggle or edit). Wait a moment for it to complete, then try again.

---

## Frequently Asked Questions

**Q: Can I delete multiple todos at once?**

A: Yes — use the **Clear completed** button in the footer to delete all completed todos in one click.

**Q: Is there a way to undo a deletion?**

A: Not currently. To recover a deleted todo, you'll need to create it again.

**Q: Can I delete a completed todo?**

A: Yes — the delete button works on both active and completed todos.

---

## Related Articles

- [Completing Todos](../US-05/docs/help-article.md)
- [Filtering Todos](../US-08/docs/help-article.md)
