# Troubleshooting — Delete a Todo (US-07)

## Delete button doesn't appear on hover

**Symptom:** Hovering over a todo does not reveal the delete button.

**Cause:** Touch devices or some mouse configurations may not trigger CSS hover states.

**Fix:**
1. On desktop, move the mouse cursor directly over the todo row.
2. On touch devices, tap the todo to reveal the button.
3. If using a trackpad, ensure hover/pointer events are enabled.

---

## Todo is not removed from the list after clicking delete

**Symptom:** Clicking delete has no visible effect.

**Cause:** The delete request may have failed.

**Fix:**
1. Check for a toast error notification.
2. Verify the backend is running: `curl http://localhost:8080/health`
3. Check the browser console for network errors.

---

## Todo reappears after deletion on page refresh

**Symptom:** A deleted todo comes back when you refresh the page.

**Cause:** The delete request did not reach the backend.

**Fix:**
1. Check browser DevTools → Network tab for the `DELETE /todos/:id` request.
2. Verify the backend processed the request and returned 200.
3. Check backend logs for errors.

---

## 404 when deleting a todo

**Symptom:** Browser console shows a 404 for `DELETE /todos/:id`.

**Cause:** The todo was already deleted (possibly in another tab or session).

**Fix:** Refresh the page to sync the list with the database.

---

## Accidentally deleted the wrong todo

**Symptom:** You clicked delete on the wrong item.

**Fix:** There is no undo. You will need to re-add the todo manually using the create input at the top of the page.

---

## All todos deleted unexpectedly

**Symptom:** The entire list is gone.

**Cause:** "Clear completed" may have been clicked while all todos were marked complete.

**Fix:** Re-add your todos. Ensure you only click "Clear completed" when you intend to remove all completed items.
