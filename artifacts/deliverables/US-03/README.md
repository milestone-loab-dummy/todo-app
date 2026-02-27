# US-03 — Create a Todo

**Date:** 2026-02-27
**Status:** Implemented
**Story Points:** 3
**Sprint:** Sprint 1 — "It Works"

## Summary

Users can type a title and press Enter to create a new todo, which is persisted to the database and immediately appears in the list.

## What Was Built

- `backend/handlers/todos.go` — `CreateTodo` handler: validates `title` is non-empty, creates a `Todo` record via GORM, returns `201 Created` with the new todo JSON.
- `frontend/src/App.tsx` — `handleCreate` function: listens for `Enter` keydown on the new-todo input, skips if empty, calls `createTodo()` API, appends result to state, and clears the input.
- `frontend/src/api.ts` — `createTodo(title)` posts to `POST /todos`.

## Acceptance Criteria Results

- ✅ Type text + Enter → todo appears in the list
- ✅ Empty input + Enter → nothing happens (no empty todos created)
- ✅ Created todo persists across page reloads (stored in SQLite)
- ✅ `POST /todos` returns `201 Created` with the new todo object
- ✅ Input field clears after successful creation

## Technical Details

- **Endpoint:** `POST /todos` — body `{"title":"string"}`, returns `201` with full `Todo` JSON
- **Validation:** Backend rejects empty/missing `title` with `400 Bad Request`
- **State update:** Frontend appends the returned todo to the in-memory list — no refetch needed
- **Input guard:** `creating` boolean disables the input while the request is in-flight (US-11 integration)

## Files Changed

- `backend/handlers/todos.go` (`CreateTodo`)
- `frontend/src/App.tsx` (`handleCreate`, new-todo input JSX)
- `frontend/src/api.ts` (`createTodo`)

## Traceability

- Sprint: Sprint 1 — "It Works"
- Epic: EPIC-02 — Todo CRUD (Core Feature)
