# Troubleshooting — List All Todos (US-04)

## Todos don't load — skeleton shows forever

**Symptom:** The skeleton loading animation stays on screen and todos never appear.

**Cause:** The frontend cannot reach the backend.

**Fix:**
1. Verify the backend is running: `curl http://localhost:8080/health`
2. Check `VITE_API_URL` in `frontend/.env` points to the correct backend URL.
3. Restart the frontend dev server after any `.env` changes.

---

## Error toast on app load

**Symptom:** A toast error appears immediately when the page opens.

**Cause:** `GET /todos` request failed.

**Fix:**
1. Start the backend: `cd backend && go run ./...`
2. Check the browser console for network errors.
3. Verify CORS is not blocking the request.

---

## Some todos are missing from the list

**Symptom:** You know you added todos but they are not showing.

**Cause:** An active filter may be hiding them.

**Fix:** Check the filter bar at the bottom. Click **All** to see every todo.

---

## List shows stale data after changes

**Symptom:** You added or deleted a todo elsewhere and the list doesn't reflect it.

**Cause:** The app does not poll for changes in real time.

**Fix:** Refresh the page to reload the latest todos from the backend.

---

## Empty state message shows even though todos exist in the database

**Symptom:** The database has records but the app shows "No todos yet".

**Cause:** `GET /todos` returned an empty array or failed silently.

**Fix:**
1. Call the API directly: `curl http://localhost:8080/todos`
2. If it returns `[]`, the database may be empty or pointing to a different `todos.db` file.
3. Check the backend `DATABASE_URL` or file path configuration.

---

## Loading is very slow

**Symptom:** It takes several seconds for todos to appear.

**Cause:** The backend may be starting up or the database has performance issues.

**Fix:**
1. Wait for the backend to fully start before opening the frontend.
2. Check backend logs for slow query warnings.
