# Ralph Tasks — Todo App (All Stories)

## EPIC-01 — Project Foundation & Infrastructure

### US-01 — Go Backend Scaffold
- [x] Create `backend/` directory with Go module (`go mod init`)
- [x] Add Gin and GORM (SQLite) dependencies
- [ ] Implement `GET /health` returning `{"status":"ok"}`
- [ ] Auto-migrate `todos.db` on startup via GORM
- [ ] Add request logging middleware (method, path, status, latency)
- [ ] Server listens on port 8080 (configurable via env)

### US-02 — React + TypeScript Frontend Scaffold
- [ ] Scaffold `frontend/` with Vite + React + TypeScript
- [ ] Dev server runs on port 3000
- [ ] Display "Todo App" title in browser
- [ ] `npm run build` completes without TypeScript errors
- [ ] CORS configured on backend to accept requests from frontend origin

## EPIC-02 — Todo CRUD (Core Feature)

### US-03 — Create a Todo
- [ ] `POST /todos` endpoint returns `201 Created` with todo object
- [ ] Empty title rejected (no empty todos created)
- [ ] Frontend: add form with Enter-to-submit
- [ ] Input clears after successful creation
- [ ] New todo persists in SQLite DB across restarts

### US-04 — List All Todos
- [ ] `GET /todos` returns all todos as JSON array
- [ ] Frontend fetches and displays todos on load
- [ ] Loading indicator shown while fetching
- [ ] Empty state message shown when no todos exist
- [ ] Each todo shows title and completion status

### US-05 — Complete / Uncomplete a Todo
- [ ] `PUT /todos/:id` toggles `completed` field
- [ ] `PUT /todos/:id` returns 404 when ID not found
- [ ] Frontend checkbox toggles completion with strikethrough style
- [ ] State persists across page reloads

### US-06 — Edit a Todo Title
- [ ] Double-click todo title enters edit mode (inline input)
- [ ] Press Enter or blur saves the new title
- [ ] Press Escape cancels edit and restores original title
- [ ] Empty title on save cancels edit (no empty todos)
- [ ] Updated title persists via `PUT /todos/:id`

### US-07 — Delete a Todo
- [ ] `DELETE /todos/:id` removes todo, returns 404 if not found
- [ ] Frontend delete button removes todo immediately from list
- [ ] Delete button only visible on hover

## EPIC-03 — Todo Organization & Filtering

### US-08 — Filter Todos by Status
- [ ] Footer filter: All / Active / Completed tabs
- [ ] "Active" filter shows only incomplete todos
- [ ] "Completed" filter shows only completed todos
- [ ] "All" shows everything
- [ ] Selected filter is visually highlighted

### US-09 — Search Todos
- [ ] Search input filters todos by keyword (case-insensitive, client-side)
- [ ] Clearing search restores full list
- [ ] "No results" message shown when no matches

### US-10 — Bulk Actions
- [ ] "Mark all complete" button completes all active todos
- [ ] If all already complete, "Mark all complete" toggles them back to active
- [ ] "Clear completed" deletes all completed todos
- [ ] Footer shows "X items left" count (active todos only)

## EPIC-04 — User Experience Polish

### US-11 — Loading & Error States
- [ ] Skeleton loader shown while fetching todos
- [ ] Toast notification shown on any API error
- [ ] Toast auto-dismisses after 4 seconds
- [ ] Action buttons disabled while request is in-flight

### US-12 — Keyboard Accessibility
- [ ] Enter in add form creates todo
- [ ] Escape in edit mode cancels edit
- [ ] All interactive elements reachable by Tab
- [ ] Visible focus ring on all interactive elements

### US-13 — Mobile Responsive Layout
- [ ] No horizontal scroll at 375px viewport
- [ ] Touch targets ≥ 44px for checkboxes and buttons
- [ ] Keyboard does not obscure add input on mobile

## EPIC-05 — API Quality & Observability

### US-14 — Input Validation & Error Responses
- [ ] `POST /todos` without `title` returns `400 {"error":"title is required"}`
- [ ] Invalid ID format returns `400 Bad Request`
- [ ] Valid but missing ID returns `404 {"error":"todo not found"}`
- [ ] Internal errors return `500` (never `200` with error body)

### US-15 — Structured Logging & Health Check
- [ ] Every HTTP request logs: method, path, status, latency
- [ ] `GET /health` returns `{"status":"ok","db":"connected"}`
- [ ] `GET /health` returns `503` when DB is unavailable

## Final Validation
- [ ] `go build ./...` passes with no errors
- [ ] `go vet ./...` passes with no warnings
- [ ] `npm run build` passes with no TypeScript errors
- [ ] All acceptance criteria verified for all 15 stories
- [ ] All API endpoints return correct HTTP status codes
- [ ] No hardcoded URLs — all config via environment variables
