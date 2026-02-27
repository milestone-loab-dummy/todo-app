# US-06 — Edit a Todo Title

**Date:** 2026-02-27
**Status:** Implemented
**Story Points:** 3
**Sprint:** Sprint 1 — "It Works"

## Summary

Users can double-click a todo title to edit it inline. Pressing Enter or clicking away saves the change; pressing Escape cancels it.

## What Was Built

- `frontend/src/TodoItem.tsx` — `editing` state toggles between a `<span>` (read mode) and an `<input>` (edit mode). `startEdit()` triggered by `onDoubleClick`. `commitEdit()` trims value, cancels if empty, calls `onEdit()` if changed. `cancelEdit()` sets a `cancelledRef` flag to prevent `onBlur` from saving after Escape.
- `frontend/src/App.tsx` — `handleEdit`: calls `updateTodo(id, { title })`, updates state from server response.
- `backend/handlers/todos.go` — `UpdateTodo` handles partial updates (title-only, completed-only, or both).

## Acceptance Criteria Results

- ✅ Double-clicking title enters inline edit mode
- ✅ Enter or click away (blur) saves new title via `PUT /todos/:id`
- ✅ Escape cancels edit and restores original title (no API call made)
- ✅ Empty title on save cancels edit silently
- ✅ Saved title persists across page reloads

## Technical Details

- **`cancelledRef`:** A `useRef<boolean>` that is set to `true` in `cancelEdit()` and checked at the top of `commitEdit()`, preventing the `onBlur` handler from firing a save after Escape
- **Auto-focus + select:** `useEffect` focuses and selects the edit input when `editing` becomes `true`
- **No-op on unchanged title:** `commitEdit()` only calls `onEdit()` when `trimmed !== todo.title`

## Files Changed

- `frontend/src/TodoItem.tsx` (edit mode logic, `cancelledRef`)
- `frontend/src/App.tsx` (`handleEdit`)
- `backend/handlers/todos.go` (`UpdateTodo` partial update)

## Traceability

- Sprint: Sprint 1 — "It Works"
- Epic: EPIC-02 — Todo CRUD (Core Feature)
