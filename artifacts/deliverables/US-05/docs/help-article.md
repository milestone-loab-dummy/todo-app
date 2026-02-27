# Completing and Uncompleting Todos

Learn how to mark todos as done and toggle them back to active.

---

## Mark a Todo Complete

### Step 1: Find the todo in your list

Scroll to the todo you want to complete.

### Step 2: Click the checkbox on the left

The todo title gets a strikethrough line to show it's done.

The change is saved automatically — if you reload the page, the todo stays completed.

---

## Mark a Completed Todo Active Again

Click the checkbox again. The strikethrough is removed and the todo returns to the active list.

---

## In-App Copy Suggestions

| Location | Suggested Text |
|----------|----------------|
| Checkbox `aria-label` (active) | `Mark as completed` |
| Checkbox `aria-label` (completed) | `Mark as active` |
| Error toast (toggle failed) | `Failed to update todo. Please try again.` |

---

## Troubleshooting

### Checkbox doesn't respond

**Problem:** Clicking the checkbox does nothing.

**Solution:**
1. The checkbox is disabled while a request is in-flight — wait a moment and try again
2. Check the backend is running
3. Open browser DevTools → Console for error messages

### Completed state resets on reload

**Problem:** A todo shows as completed but reverts to active after a page refresh.

**Solution:** The backend may not have received the update. Check:
1. Your network connection
2. The backend logs for a `PUT /todos/:id` entry
3. Run `sqlite3 backend/todos.db "SELECT * FROM todos"` to inspect the database directly

---

## Frequently Asked Questions

**Q: Can I complete multiple todos at once?**

A: Yes — use the **Mark all complete** button in the footer (added in Sprint 2).

**Q: Will completed todos be deleted automatically?**

A: No. Completed todos stay in your list until you delete them or use **Clear completed**.

---

## Related Articles

- [Filtering Todos by Status](../US-08/docs/help-article.md)
- [Deleting a Todo](../US-07/docs/help-article.md)
