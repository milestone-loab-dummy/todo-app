# US-07 — Delete a Todo

**Date:** 2026-02-27
**Status:** Implemented
**Story Points:** 2
**Sprint:** Sprint 1 — "It Works"

## Summary

Users can delete a todo by clicking the × button that appears on hover. The todo is removed immediately and the deletion is confirmed by the backend.

## What Was Built

- `backend/handlers/todos.go` — `DeleteTodo` handler: parses `:id`, hard-deletes the record via GORM, returns `204 No Content`. Returns `404` if not found.
- `frontend/src/TodoItem.tsx` — `<button className="todo-delete">×</button>` rendered outside the `.todo-content` wrapper, only when not in edit mode. CSS `.todo-item .todo-delete { opacity: 0 }` / `.todo-item:hover .todo-delete { opacity: 1 }` makes it hover-only. Button is disabled while the todo is pending.
- `frontend/src/App.tsx` — `handleDelete`: adds ID to `pendingIds`, calls `deleteTodo(id)`, filters the todo out of state on success.

## Acceptance Criteria Results

- ✅ Clicking × removes the todo from the list immediately (optimistic update)
- ✅ Deletion confirmed by backend — todo gone from SQLite
- ✅ `DELETE /todos/:id` returns `404` for unknown IDs
- ✅ Delete button only visible on hover

## Technical Details

- **Endpoint:** `DELETE /todos/:id` — returns `204 No Content`
- **Hover visibility:** CSS `opacity` transition on `.todo-delete` — `0` at rest, `1` on `.todo-item:hover`
- **Edit mode guard:** Delete button is hidden (`{!editing && ...}`) while the todo is in inline-edit mode to avoid accidental deletion

## Files Changed

- `backend/handlers/todos.go` (`DeleteTodo`)
- `frontend/src/TodoItem.tsx` (delete button, hover CSS)
- `frontend/src/App.tsx` (`handleDelete`)

## Traceability

- Sprint: Sprint 1 — "It Works"
- Epic: EPIC-02 — Todo CRUD (Core Feature)
