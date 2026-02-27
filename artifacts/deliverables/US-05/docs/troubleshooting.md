# Troubleshooting — Complete / Uncomplete a Todo (US-05)

## Checkbox click has no effect

**Symptom:** Clicking the checkbox does not change the todo's appearance.

**Cause:** The update request may have failed, or the button is in a disabled state.

**Fix:**
1. Check for a toast error notification.
2. Verify the backend is running: `curl http://localhost:8080/health`
3. Check the browser console for network errors.

---

## Todo reverts to previous state after toggling

**Symptom:** The checkbox changes briefly then flips back.

**Cause:** The backend returned an error and the frontend reverted the UI.

**Fix:**
1. Look for a toast error.
2. Check backend logs for the `PUT /todos/:id` request.
3. Ensure the todo ID exists: `curl http://localhost:8080/todos`

---

## Completion state not saved after page refresh

**Symptom:** A completed todo appears as active after refreshing.

**Cause:** The update did not reach or persist in the backend.

**Fix:**
1. Check backend logs for database write errors.
2. Verify `todos.db` is writable.
3. Retry toggling and check the network request in browser DevTools → Network tab.

---

## All todos show as active after app restart

**Symptom:** Previously completed todos all show as active when you restart the app.

**Cause:** The app may be connecting to a fresh/different `todos.db` file.

**Fix:**
1. Check the `backend/` directory for multiple `.db` files.
2. Ensure the backend is reading the correct database file.

---

## 404 error when toggling

**Symptom:** Browser console shows a 404 for `PUT /todos/:id`.

**Cause:** The todo was deleted by another action or session.

**Fix:** Refresh the page to sync the list with the current database state.
