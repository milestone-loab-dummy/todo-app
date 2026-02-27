# US-04 — List All Todos

**Date:** 2026-02-27
**Status:** Implemented
**Story Points:** 2
**Sprint:** Sprint 1 — "It Works"

## Summary

When the app loads, all stored todos are fetched from the backend and displayed, with a skeleton loader while the request is in-flight and an empty state when the list is empty.

## What Was Built

- `backend/handlers/todos.go` — `GetTodos` handler: queries all `Todo` records ordered by `created_at DESC`, returns `200` with JSON array.
- `frontend/src/App.tsx` — `useEffect` on mount calls `fetchTodos()`, sets `loading` state during fetch, renders skeleton rows while loading, empty-state message when empty, or the todo list when populated.
- `frontend/src/api.ts` — `fetchTodos()` calls `GET /todos`.

## Acceptance Criteria Results

- ✅ `GET /todos` returns all stored todos as a JSON array
- ✅ Empty list shows "No todos yet. Add one above!" message
- ✅ Each todo displays its title and completion status (strikethrough + checkbox)
- ✅ Loading indicator (3 skeleton rows) shown while fetching

## Technical Details

- **Endpoint:** `GET /todos` — returns `[]Todo` ordered newest-first
- **Skeleton loader:** Three `<li>` elements with `.skeleton-checkbox` and `.skeleton-text` CSS animation (US-11 integration)
- **Re-fetch strategy:** The todo list is refreshed after every mutation (create, update, delete) by updating local state directly — no full refetch unless the page is reloaded

## Files Changed

- `backend/handlers/todos.go` (`GetTodos`)
- `frontend/src/App.tsx` (`useEffect` fetch, skeleton/empty-state JSX)
- `frontend/src/api.ts` (`fetchTodos`)

## Traceability

- Sprint: Sprint 1 — "It Works"
- Epic: EPIC-02 — Todo CRUD (Core Feature)
