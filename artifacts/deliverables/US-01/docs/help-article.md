# Setting Up the Go Backend

This guide walks you through starting the Todo App backend server for the first time.

---

## Before You Start

- Go 1.21 or later installed (`go version`)
- The `backend/` directory cloned to your machine

---

## Start the Server

### Step 1: Navigate to the backend folder

Open a terminal and go to the `backend/` directory inside your project.

### Step 2: Install dependencies

```
go mod download
```

### Step 3: Start the server

```
go run ./...
```

You should see:

```
[GIN-debug] Listening and serving HTTP on :8080
```

The server is now running. A `todos.db` file is created automatically in the same folder — this is your database.

### Step 4: Verify it's working

In a new terminal, run:

```
curl http://localhost:8080/health
```

You should receive:

```json
{"status":"ok"}
```

---

## Configuration

You can change the port by setting the `PORT` environment variable:

```
PORT=9000 go run ./...
```

---

## In-App Copy Suggestions

| Location | Suggested Text |
|----------|----------------|
| Backend startup log | `Server starting on port 8080` |
| Health check response | `{"status":"ok"}` |
| DB error (startup) | `Failed to connect to database — check that todos.db is writable` |

---

## Troubleshooting

### Server won't start

**Problem:** Port 8080 is already in use.

**Solution:** Set a different port:
```
PORT=9090 go run ./...
```
Then update `VITE_API_URL` in the frontend to match.

### `todos.db` permission error

**Problem:** The server can't create `todos.db`.

**Solution:** Make sure the `backend/` directory is writable:
```
chmod 755 backend/
```

### CORS errors in the browser

**Problem:** API requests fail with "blocked by CORS policy".

**Solution:** Ensure the frontend is running on `http://localhost:3000`. The backend only allows that origin by default.

---

## Related Articles

- [Setting Up the Frontend](../US-02/docs/help-article.md)
- [Creating Your First Todo](../US-03/docs/help-article.md)
