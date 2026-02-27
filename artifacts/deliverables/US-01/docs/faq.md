# FAQ — Go Backend Scaffold (US-01)

## What port does the backend run on?

The server runs on port **8080** by default. You can change this by setting the `PORT` environment variable before starting:

```
PORT=9090 go run ./...
```

## Where is the database stored?

The backend creates a `todos.db` SQLite file in the `backend/` directory on first run. GORM auto-migrates the schema automatically — you do not need to run any database setup commands manually.

## What is the `/health` endpoint for?

`GET /health` returns a JSON status response (`{"status":"ok"}`) that confirms the server is running. Use it to check liveness in scripts, CI pipelines, or load balancers.

## Does the backend create the database schema automatically?

Yes. When the server starts for the first time, GORM runs `AutoMigrate` and creates the `todos` table. You do not need to run migrations manually.

## What Go version is required?

Go **1.21 or later**. Run `go version` to check what you have installed.

## Can I run the backend without the frontend?

Yes. The backend is a standalone REST API. You can call it with `curl`, Postman, or any HTTP client independently of the frontend.

## Why do I see CORS errors in the browser?

The backend allows requests from `http://localhost:3000` only (the default frontend origin). If your frontend runs on a different port, update the CORS configuration in `main.go`.

## How do I stop the server?

Press `Ctrl+C` in the terminal where the server is running.
