# US-05 — Complete / Uncomplete a Todo

**Date:** 2026-02-27
**Status:** Implemented
**Story Points:** 2
**Sprint:** Sprint 1 — "It Works"

## Summary

Users can click a checkbox to toggle a todo's completed state. The change is persisted to the database and reflected visually with a strikethrough.

## What Was Built

- `backend/handlers/todos.go` — `UpdateTodo` handler: parses `:id`, looks up the record, merges `title` and/or `completed` fields from the request body, saves, returns `200` with updated todo. Returns `404` if ID not found.
- `frontend/src/TodoItem.tsx` — `<input type="checkbox">` with `onChange` calling `onToggle(todo.id, !todo.completed)`. Item gets `completed` CSS class for strikethrough when `todo.completed` is `true`. Checkbox is disabled while the todo ID is in `pendingIds`.
- `frontend/src/App.tsx` — `handleToggle`: adds ID to `pendingIds`, calls `updateTodo(id, { completed })`, updates state on success, shows toast on error.

## Acceptance Criteria Results

- ✅ Clicking checkbox on active todo marks it completed (strikethrough applied)
- ✅ Clicking checkbox on completed todo marks it active (strikethrough removed)
- ✅ State persists across page reloads (backend + SQLite)
- ✅ `PUT /todos/:id` with unknown ID returns `404`

## Technical Details

- **Endpoint:** `PUT /todos/:id` — body `{"completed": bool}`, returns `200` with updated `Todo`
- **Optimistic UI:** ID added to `pendingIds` immediately; checkbox disabled until response; state updated from server response
- **Strikethrough:** CSS class `.todo-item.completed .todo-title { text-decoration: line-through; }`

## Files Changed

- `backend/handlers/todos.go` (`UpdateTodo`)
- `frontend/src/TodoItem.tsx` (checkbox, `.completed` class)
- `frontend/src/App.tsx` (`handleToggle`, `pendingIds`)

## Traceability

- Sprint: Sprint 1 — "It Works"
- Epic: EPIC-02 — Todo CRUD (Core Feature)
