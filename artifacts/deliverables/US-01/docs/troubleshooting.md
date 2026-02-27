# Troubleshooting — Go Backend Scaffold (US-01)

## Server fails to start: "address already in use"

**Symptom:** Running `go run ./...` prints `listen tcp :8080: bind: address already in use`.

**Cause:** Another process is already using port 8080.

**Fix:**
```bash
# Find what's using port 8080
lsof -i :8080

# Kill the process (replace PID with the actual number)
kill -9 <PID>

# Or run on a different port
PORT=9090 go run ./...
```
If you change the port, update `VITE_API_URL` in the frontend `.env` file to match.

---

## `todos.db` permission error on startup

**Symptom:** `failed to open database file: unable to open database file`.

**Cause:** The `backend/` directory is not writable.

**Fix:**
```bash
chmod 755 backend/
```

---

## Go module errors: packages not found

**Symptom:** `go: module lookup disabled by GONOSUMCHECK` or `cannot find module`.

**Fix:**
```bash
cd backend
go mod tidy
go mod download
```

---

## CORS errors in the browser console

**Symptom:** `Access to fetch at 'http://localhost:8080/...' from origin 'http://localhost:3000' has been blocked by CORS policy`.

**Cause:** The frontend is running on a port the backend does not allow.

**Fix:** Ensure the frontend dev server is on `http://localhost:3000` (the default). If you changed the frontend port, update the CORS allowed origins in `backend/main.go`.

---

## Health check returns unexpected response

**Symptom:** `curl http://localhost:8080/health` returns HTML or a connection refused error.

**Cause:** The server is not running or is running on a different port.

**Fix:** Start the server with `go run ./...` and confirm it prints `Listening and serving HTTP on :8080`.

---

## Database migrations fail silently

**Symptom:** The server starts but API calls return 500 errors about missing columns.

**Fix:** Delete `todos.db` to force a fresh auto-migration:
```bash
rm backend/todos.db
go run ./...
```
