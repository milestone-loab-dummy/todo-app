# US-08 — Filter Todos by Status

**Date:** 2026-02-27
**Status:** Implemented
**Story Points:** 2
**Sprint:** Sprint 1 — "It Works"

## Summary

A footer filter bar lets users view All, Active (incomplete), or Completed todos. The active filter is visually highlighted.

## What Was Built

- `frontend/src/App.tsx` — `filter` state (`'all' | 'active' | 'completed'`). `filteredTodos` derived by filtering the `todos` array. Footer renders three `<button>` elements, each getting the `active` CSS class when selected. Also shows `X items left` count.
- `frontend/src/types.ts` — `Filter` type alias.

## Acceptance Criteria Results

- ✅ Clicking "Active" shows only incomplete todos
- ✅ Clicking "Completed" shows only completed todos
- ✅ Clicking "All" shows all todos
- ✅ Active filter button is visually highlighted (`.filter-btn.active` CSS class adds border/color)

## Technical Details

- **Client-side filtering:** No backend query parameter — all todos fetched once, filtered in-memory
- **Filter + search:** Both `filter` and `search` are applied together in `filteredTodos` — search operates within the currently filtered set
- **`aria-pressed`:** Each filter button has `aria-pressed={filter === f}` for accessibility

## Files Changed

- `frontend/src/App.tsx` (`filter` state, `filteredTodos`, footer JSX)
- `frontend/src/types.ts` (`Filter` type)
- `frontend/src/App.css` (`.filter-btn`, `.filter-btn.active`)

## Traceability

- Sprint: Sprint 1 — "It Works"
- Epic: EPIC-03 — Todo Organization & Filtering
