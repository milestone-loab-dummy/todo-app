# Troubleshooting — Create a Todo (US-03)

## Pressing Enter does nothing

**Symptom:** Typing in the input and pressing Enter produces no result.

**Cause:** The input field may not have focus, or the backend is unreachable.

**Fix:**
1. Click inside the input field to make sure it has focus.
2. Check the browser console for errors.
3. Verify the backend is running: `curl http://localhost:8080/health`

---

## Todo appears then disappears

**Symptom:** The todo briefly shows up in the list then vanishes.

**Cause:** The backend request failed and the frontend reverted the optimistic update.

**Fix:**
1. Check for a toast error notification.
2. Verify the backend is running and reachable.
3. Check backend logs for errors.

---

## Input field does not clear after adding a todo

**Symptom:** After pressing Enter, the text stays in the input.

**Cause:** This indicates the create request failed.

**Fix:** Look for a toast error notification. The input only clears on a successful backend response. Fix the backend connectivity issue and try again.

---

## Todo is not saved after page refresh

**Symptom:** The todo appears in the list but is gone after refreshing.

**Cause:** The backend did not persist the todo (possible database write error).

**Fix:**
1. Check backend logs for GORM/SQLite errors.
2. Ensure `todos.db` is writable: `ls -la backend/todos.db`
3. Restart the backend.

---

## Duplicate todos appearing

**Symptom:** The same todo appears twice in the list.

**Cause:** The Enter key may have fired multiple times, or there was a network retry.

**Fix:** Delete the duplicate using the delete button (hover over it). Check your keyboard for sticky keys.

---

## "Failed to create todo" toast on every attempt

**Symptom:** Every create attempt shows an error toast.

**Cause:** Backend is unreachable or returning an error.

**Fix:**
1. Run `curl -X POST http://localhost:8080/todos -H 'Content-Type: application/json' -d '{"title":"test"}'`
2. If this fails, check the backend is running and review its logs.
