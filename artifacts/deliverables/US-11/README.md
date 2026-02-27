# US-11 — Loading & Error States

**Date:** 2026-02-27
**Status:** Implemented
**Story Points:** 3
**Sprint:** Sprint 1 — "It Works"

## Summary

The app shows a skeleton loader while todos load, displays a toast notification on any API error, and disables action buttons while mutations are in-flight.

## What Was Built

- `frontend/src/App.tsx` — `loading` boolean state drives skeleton rendering. `toasts` state array manages active notifications. `addToast()` appends; `dismissToast()` removes by ID. `pendingIds` Set tracks in-flight mutations, passed to `TodoItem` to disable controls.
- `frontend/src/Toast.tsx` — `Toast` component: renders a stack of toast messages. Each toast calls `setTimeout` for 4-second auto-dismiss and has a manual close button.
- `frontend/src/App.tsx` skeleton JSX — three `<li className="skeleton-item">` with animated `.skeleton-checkbox` and `.skeleton-text` divs shown while `loading === true`.

## Acceptance Criteria Results

- ✅ Skeleton loader (3 placeholder rows) shown while fetching todos on load
- ✅ Toast notification appears on any API error (create, update, delete, initial fetch)
- ✅ Toast auto-dismisses after 4 seconds
- ✅ Action buttons (checkbox, delete) disabled while their request is in-flight (`pendingIds`)

## Technical Details

- **Skeleton animation:** CSS `@keyframes shimmer` with `background: linear-gradient(...)` animating `background-position`
- **Toast stack:** Multiple toasts can be active simultaneously; each has a unique incrementing ID (`toastCounter`)
- **`pendingIds` Set:** Passed down to `TodoItem` as a prop; individual items check `pendingIds.has(todo.id)` to disable controls
- **Create guard:** `creating` boolean disables the new-todo input while `POST /todos` is in-flight

## Files Changed

- `frontend/src/App.tsx` (`loading`, `toasts`, `pendingIds`, skeleton JSX)
- `frontend/src/Toast.tsx` (new file)
- `frontend/src/App.css` (skeleton animation, toast styles)

## Traceability

- Sprint: Sprint 1 — "It Works"
- Epic: EPIC-04 — User Experience Polish
