# Ralph Tasks — Sprint 1

## US-01 — Go Backend Scaffold
- [x] Create backend/ Go module with go.mod (module: todo-app/backend)
- [x] Add Gin, GORM, SQLite dependencies
- [x] Implement Todo model with GORM auto-migrate
- [x] Implement GET /health endpoint returning {"status":"ok"}
- [x] Add Gin request logging middleware (method, path, status, latency)
- [x] Server starts on PORT env var (default 8080)
- [x] Run `go build ./...` and `go vet ./...` — pass with no errors

## US-02 — React + TypeScript Frontend Scaffold
- [x] Scaffold frontend/ with Vite react-ts template
- [x] Configure dev server port to 3000
- [x] Display "Todo App" title on the page
- [x] VITE_API_URL env var support (default http://localhost:8080)
- [x] Run `npm run build` — zero TypeScript errors

## US-03 — Create a Todo
- [x] Backend: POST /todos returns 201 with new todo object
- [x] Frontend: Add input field, create todo on Enter if non-empty
- [x] Input clears after successful creation
- [x] Todo persists in DB across reloads

## US-04 — List All Todos
- [x] Backend: GET /todos returns array of all todos
- [x] Frontend: Fetch and display todos on load
- [x] Show empty state message when no todos
- [x] Show loading indicator while fetching

## US-05 — Complete / Uncomplete a Todo
- [x] Backend: PUT /todos/:id toggles completed field, 404 if not found
- [x] Frontend: Checkbox toggles completed state with strikethrough style
- [x] State persists across page reloads

## US-06 — Edit a Todo Title
- [x] Frontend: Double-click title enters edit mode (inline input)
- [x] Press Enter or blur saves new title via PUT /todos/:id
- [x] Press Escape cancels edit, restores original title
- [x] Empty title cancels edit (no empty todos)
- [x] New title persists in DB

## US-07 — Delete a Todo
- [x] Backend: DELETE /todos/:id returns 204, 404 if not found
- [x] Frontend: Delete button removes todo from list immediately
- [x] Delete button only visible on hover

## US-08 — Filter Todos by Status
- [x] Frontend: Footer filter buttons (All / Active / Completed)
- [x] Clicking filter shows only matching todos
- [x] Active filter button is visually highlighted

## US-11 — Loading & Error States
- [x] Frontend: Skeleton loader shown while fetching todos
- [x] Toast notification on any API error
- [x] Toast auto-dismisses after 4 seconds
- [x] Action buttons disabled while request is in-flight

## Final Validation
- [x] `go build ./...` passes with no errors
- [x] `go vet ./...` passes with no errors
- [x] `npm run build` passes with zero TypeScript errors
- [x] No hardcoded URLs — VITE_API_URL env var used
- [x] No TypeScript `any` types without justification
- [x] CORS enabled on backend for http://localhost:3000
