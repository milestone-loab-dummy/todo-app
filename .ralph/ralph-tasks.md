# Ralph Tasks — Sprint 1 "It Works"

## US-01 — Go Backend Scaffold
- [x] Create `backend/` directory with Go module (`go mod init`)
- [x] Add Gin, GORM, SQLite driver dependencies
- [ ] Scaffold main.go with Gin router, CORS middleware, request logger middleware
- [ ] Define `Todo` GORM model (ID, Title, Completed, CreatedAt, UpdatedAt)
- [ ] Auto-migrate `todos.db` on startup
- [ ] Implement `GET /health` returning `{"status":"ok"}`
- [ ] Server starts on port 8080 (`go run ./...` from `backend/`)
- [ ] Log method, path, status code, and latency for every request

## US-02 — React + TypeScript Frontend Scaffold
- [ ] Create `frontend/` directory with Vite + React + TypeScript template
- [ ] Configure Tailwind CSS
- [ ] Proxy `/api` to `http://localhost:8080` in Vite config
- [ ] App renders "Todo App" title on `http://localhost:3000`
- [ ] `npm run build` completes without TypeScript errors

## US-03 — Create a Todo
- [ ] Backend: `POST /todos` — create todo, return 201 with todo object
- [ ] Backend: validate non-empty title, return 400 if missing/empty
- [ ] Frontend: input field with Enter key handler
- [ ] Frontend: ignore submit if input is empty
- [ ] Frontend: clear input after successful creation
- [ ] Frontend: new todo appears in list immediately

## US-04 — List All Todos
- [ ] Backend: `GET /todos` — return all todos as JSON array
- [ ] Frontend: fetch todos on mount
- [ ] Frontend: show loading indicator while fetching
- [ ] Frontend: show empty state message if no todos
- [ ] Frontend: each todo shows title and completion checkbox

## US-05 — Complete / Uncomplete a Todo
- [ ] Backend: `PUT /todos/:id` — update completed field, return updated todo
- [ ] Backend: return 404 if ID not found
- [ ] Frontend: checkbox toggles completed state
- [ ] Frontend: completed todos show strikethrough style
- [ ] Frontend: toggled state persists across page reloads

## US-06 — Edit a Todo Title
- [ ] Backend: `PUT /todos/:id` — update title field (same endpoint as toggle)
- [ ] Frontend: double-click on title enters edit mode (inline input)
- [ ] Frontend: Enter or blur saves new title
- [ ] Frontend: Escape cancels edit, restores original title
- [ ] Frontend: saving empty title cancels edit (no empty todos)
- [ ] Frontend: saved title persists across reloads

## US-07 — Delete a Todo
- [ ] Backend: `DELETE /todos/:id` — delete todo, return 204
- [ ] Backend: return 404 if ID not found
- [ ] Frontend: delete button visible on hover only
- [ ] Frontend: clicking delete removes todo from list immediately
- [ ] Frontend: deletion persists (todo gone from DB)

## US-08 — Filter Todos by Status
- [ ] Frontend: footer with "All", "Active", "Completed" filter buttons
- [ ] Frontend: "Active" filter shows only incomplete todos
- [ ] Frontend: "Completed" filter shows only completed todos
- [ ] Frontend: "All" shows all todos
- [ ] Frontend: active filter is visually highlighted

## US-11 — Loading & Error States
- [ ] Frontend: skeleton loader shown while fetching todos
- [ ] Frontend: toast notification on any API error
- [ ] Frontend: toast auto-dismisses after 4 seconds
- [ ] Frontend: action buttons disabled while request in-flight

## Validation
- [ ] `go build ./...` succeeds with no errors from `backend/`
- [ ] `go vet ./...` passes with no warnings from `backend/`
- [ ] `go test ./...` passes from `backend/`
- [ ] `npm run build` succeeds with no TypeScript errors from `frontend/`
- [ ] Server starts on port 8080 with `go run ./...`
- [ ] Dev server starts on port 3000 with `npm run dev`
- [ ] All Sprint 1 acceptance criteria verified
