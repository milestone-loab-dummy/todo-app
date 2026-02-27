# Ralph Tasks — Sprint 2

## US-06 — Edit a Todo Title (verify / enhance if needed)
- [x] Double-click todo title enters inline edit mode
- [x] Enter or blur saves new title via PUT /todos/:id
- [x] Escape cancels edit and restores original title
- [x] Empty title cancels edit silently (no empty todos)
- [x] Saved title persists across page reloads

## US-08 — Filter Todos by Status (verify / enhance if needed)
- [x] Footer filter buttons: All | Active | Completed
- [x] "Active" shows only incomplete todos
- [x] "Completed" shows only completed todos
- [x] "All" shows all todos
- [x] Active filter button is visually highlighted

## US-09 — Search Todos
- [x] Search input field present in the UI
- [ ] Typing filters todos case-insensitively by title
- [ ] Clearing search restores full list
- [ ] "No results" message shown when nothing matches

## US-10 — Bulk Actions
- [ ] Footer shows "X items left" count (active todos only)
- [ ] "Mark all complete" button: marks all active todos completed
- [ ] "Mark all complete" toggles: if all already complete, marks all active
- [ ] "Clear completed" button: deletes all completed todos
- [ ] Bulk actions call the real backend API

## Final Validation
- [ ] go build ./... from backend/ passes with no errors
- [ ] go vet ./... from backend/ passes with no errors
- [ ] npm run build from frontend/ passes with zero TypeScript errors
- [ ] No TypeScript any types without justification
- [ ] No hardcoded URLs
