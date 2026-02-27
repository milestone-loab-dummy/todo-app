# US-01 — Go Backend Scaffold

**Date:** 2026-02-27
**Status:** Implemented
**Story Points:** 2
**Sprint:** Sprint 1 — "It Works"

## Summary

Set up the Go backend API server using Gin and GORM, auto-creating a SQLite database on first run and logging every request.

## What Was Built

- `backend/main.go` — Gin HTTP server with Logger middleware, Recovery middleware, and a manual CORS middleware allowing `http://localhost:3000`. Reads `PORT` env var (default `8080`).
- `backend/models/todo.go` — `Todo` struct with `ID`, `Title`, `Completed`, `CreatedAt`, `UpdatedAt` fields. GORM auto-migrates on startup.
- `backend/handlers/` — Handler struct wiring GORM DB into all route handlers.
- `backend/go.mod` — module `todo-app/backend`, dependencies: `gin-gonic/gin`, `gorm.io/gorm`, `gorm.io/driver/sqlite`.

## Acceptance Criteria Results

- ✅ `go run ./...` from `backend/` starts the server on port 8080
- ✅ `GET /health` returns `200 OK` with `{"status":"ok"}`
- ✅ `todos.db` is auto-created via GORM AutoMigrate on first run
- ✅ Every request logs method, path, status code, and latency to stdout

## Technical Details

- **Framework:** Gin (`gin.New()` with explicit `gin.Logger()` and `gin.Recovery()` middleware)
- **ORM:** GORM with SQLite driver (`gorm.io/driver/sqlite`)
- **CORS:** Manual middleware sets `Access-Control-Allow-Origin: http://localhost:3000` and handles `OPTIONS` preflight with `204`
- **Port:** Configurable via `PORT` env var, defaults to `8080`
- **DB file:** `todos.db` created in the working directory at startup

## Files Changed

- `backend/go.mod`
- `backend/go.sum`
- `backend/main.go`
- `backend/models/todo.go`
- `backend/handlers/handler.go`

## Traceability

- Sprint: Sprint 1 — "It Works"
- Epic: EPIC-01 — Project Foundation & Infrastructure
