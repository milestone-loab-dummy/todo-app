# Todo App — User Stories

> **Project**: Todo App  
> **Stack**: React + TypeScript (frontend) · Go + Gin (backend)  
> **Updated**: 2026-02-27

---

## EPIC-01 — Project Foundation & Infrastructure

---

### US-01 — Go Backend Scaffold

**Priority**: Must Have | **Estimate**: 2 SP | **Status**: Backlog

#### User Story
As a developer,  
I want a runnable Go backend with Gin and SQLite wired up,  
So that I can build API endpoints against a real database without manual setup.

#### Acceptance Criteria
- [ ] Given the repo is cloned, when `go run ./...` is executed from `backend/`, then the server starts on port `8080`
- [ ] Given the server is running, when `GET /health` is called, then it returns `200 OK` with `{"status":"ok"}`
- [ ] Given first run, when the server starts, then `todos.db` is auto-created via GORM auto-migrate
- [ ] Given any request, when it completes, then method, path, status code, and latency are logged to stdout

#### Tasks
- [ ] `go mod init todo-app/backend`
- [ ] Add Gin, GORM, SQLite driver dependencies
- [ ] Create `Todo` model with GORM tags
- [ ] Wire up GORM with SQLite and auto-migrate
- [ ] Register `/health` endpoint
- [ ] Add Gin default logger middleware

#### Definition of Done
- [ ] `go run ./...` starts the server with no errors
- [ ] `/health` returns 200
- [ ] `todos.db` file created on first start
- [ ] Code compiles with `go build`

---

### US-02 — React + TypeScript Frontend Scaffold

**Priority**: Must Have | **Estimate**: 1 SP | **Status**: Backlog

#### User Story
As a developer,  
I want a Vite + React + TypeScript project bootstrapped,  
So that I can build UI components immediately without configuration overhead.

#### Acceptance Criteria
- [ ] Given the repo is cloned, when `npm install && npm run dev` is executed from `frontend/`, then the dev server starts on `http://localhost:5173`
- [ ] Given the dev server is running, when the browser opens the URL, then the Todo App title is visible
- [ ] Given `npm run build` is executed, then the build completes without TypeScript errors

#### Tasks
- [ ] Scaffold with `npm create vite@latest frontend -- --template react-ts`
- [ ] Remove boilerplate content
- [ ] Add Tailwind CSS
- [ ] Create minimal `App.tsx` with app title

#### Definition of Done
- [ ] Dev server runs without errors
- [ ] `npm run build` produces no TS errors
- [ ] Tailwind classes apply correctly

---

## EPIC-02 — Todo CRUD (Core Feature)

---

### US-03 — Create a Todo

**Priority**: Must Have | **Estimate**: 3 SP | **Status**: Backlog

#### User Story
As a user,  
I want to type a todo and press Enter (or a button) to add it,  
So that I can capture tasks quickly without leaving the keyboard.

#### Acceptance Criteria
- [ ] Given I type text and press Enter, when the input is non-empty, then the todo appears in the list
- [ ] Given I type text and press Enter, when the input is empty, then nothing happens (no empty todos)
- [ ] Given the todo is created, when the list reloads, then the new todo persists (stored in DB)
- [ ] Given the todo is created, then `POST /todos` returns `201 Created` with the new todo object
- [ ] Given the todo is created, when the backend confirms, then the input field clears

#### Tasks
- [ ] `POST /todos` handler: validate body, insert to DB, return 201
- [ ] `Todo` type in TypeScript (`id`, `title`, `completed`, `createdAt`)
- [ ] `api.ts` client with `createTodo(title)` function
- [ ] `AddTodoForm` component with controlled input
- [ ] On submit, call API, then refresh list

#### Definition of Done
- [ ] POST /todos returns 201 with correct JSON
- [ ] POST /todos with empty title returns 400
- [ ] UI adds todo and clears input

---

### US-04 — List All Todos

**Priority**: Must Have | **Estimate**: 2 SP | **Status**: Backlog

#### User Story
As a user,  
I want to see all my todos when I open the app,  
So that I know what tasks I have pending.

#### Acceptance Criteria
- [ ] Given the app loads, when `GET /todos` is called, then all stored todos are returned in an array
- [ ] Given the list is empty, when the app loads, then an empty state message is shown
- [ ] Given todos exist, when the app loads, then each todo shows its title and completion status
- [ ] Given the app loads, when fetching is in progress, then a loading indicator is shown

#### Tasks
- [ ] `GET /todos` handler: query all from DB, return JSON array
- [ ] `getTodos()` API function
- [ ] `TodoList` component rendering `TodoItem`s
- [ ] Loading spinner / skeleton state
- [ ] Empty state component

#### Definition of Done
- [ ] GET /todos returns 200 with array
- [ ] Empty array returns `[]`, not null
- [ ] UI shows loading state then renders list

---

### US-05 — Complete / Uncomplete a Todo

**Priority**: Must Have | **Estimate**: 2 SP | **Status**: Backlog

#### User Story
As a user,  
I want to check off a todo to mark it as done,  
So that I can track what I've accomplished.

#### Acceptance Criteria
- [ ] Given a todo is active, when I click the checkbox, then it is marked completed (strikethrough style)
- [ ] Given a todo is completed, when I click the checkbox, then it is unmarked (toggled back)
- [ ] Given the toggle, when the backend confirms, then the state persists across page reloads
- [ ] Given `PUT /todos/:id` is called, when the ID doesn't exist, then 404 is returned

#### Tasks
- [ ] `PUT /todos/:id` handler: update `completed` field
- [ ] `updateTodo(id, patch)` API function
- [ ] Checkbox in `TodoItem` with optimistic toggle
- [ ] Strikethrough / dimmed style for completed todos

#### Definition of Done
- [ ] PUT /todos/:id toggles completed and returns updated todo
- [ ] PUT /todos/999 returns 404
- [ ] UI reflects change immediately (optimistic)

---

### US-06 — Edit a Todo Title

**Priority**: Must Have | **Estimate**: 3 SP | **Status**: Backlog

#### User Story
As a user,  
I want to double-click a todo to edit its title inline,  
So that I can fix typos or change task descriptions without deleting and re-creating.

#### Acceptance Criteria
- [ ] Given a todo, when I double-click its title, then it becomes an editable input field
- [ ] Given I'm editing, when I press Enter or click away, then the new title is saved
- [ ] Given I'm editing, when I press Escape, then the edit is cancelled and original title restored
- [ ] Given I save with an empty title, then the edit is cancelled (no empty todos)
- [ ] Given the save, when the backend confirms, then the new title persists

#### Tasks
- [ ] `PUT /todos/:id` handler supports updating `title` field
- [ ] `TodoItem` edit mode with local state
- [ ] Double-click to enter edit mode
- [ ] Enter/blur to save, Escape to cancel
- [ ] Validation: reject empty title

#### Definition of Done
- [ ] Double-click enters edit mode
- [ ] Enter saves, Escape cancels
- [ ] Empty title cancels edit
- [ ] New title persists on reload

---

### US-07 — Delete a Todo

**Priority**: Must Have | **Estimate**: 2 SP | **Status**: Backlog

#### User Story
As a user,  
I want to delete a todo I no longer need,  
So that my list stays clean and relevant.

#### Acceptance Criteria
- [ ] Given a todo, when I click the delete button, then the todo is removed from the list immediately
- [ ] Given the deletion, when the backend confirms, then the todo is gone from the DB
- [ ] Given `DELETE /todos/:id`, when the ID doesn't exist, then 404 is returned
- [ ] Given the delete button, it is only visible on hover (not always cluttering the UI)

#### Tasks
- [ ] `DELETE /todos/:id` handler
- [ ] `deleteTodo(id)` API function
- [ ] Delete icon button in `TodoItem` (visible on hover)
- [ ] Remove item from local state on success

#### Definition of Done
- [ ] DELETE /todos/:id removes from DB and returns 204
- [ ] DELETE /todos/999 returns 404
- [ ] UI removes item immediately

---

## EPIC-03 — Todo Organization & Filtering

---

### US-08 — Filter Todos by Status

**Priority**: Should Have | **Estimate**: 2 SP | **Status**: Backlog

#### User Story
As a user,  
I want to filter my todos by All / Active / Completed,  
So that I can focus on what still needs to be done.

#### Acceptance Criteria
- [ ] Given the footer filter, when I click "Active", then only incomplete todos are shown
- [ ] Given the footer filter, when I click "Completed", then only completed todos are shown
- [ ] Given the footer filter, when I click "All", then all todos are shown
- [ ] Given a filter is active, then the selected filter is visually highlighted

#### Tasks
- [ ] Filter state in `App.tsx` (All | Active | Completed)
- [ ] Filter bar component with three buttons
- [ ] Filter logic applied to the displayed list (client-side)
- [ ] Active filter styling

#### Definition of Done
- [ ] All three filters work correctly
- [ ] Active filter is visually distinct

---

### US-09 — Search Todos

**Priority**: Should Have | **Estimate**: 2 SP | **Status**: Backlog

#### User Story
As a user,  
I want to type in a search box to filter todos by keyword,  
So that I can find a specific item quickly in a long list.

#### Acceptance Criteria
- [ ] Given a search term, when I type in the search box, then only matching todos are shown (case-insensitive)
- [ ] Given a search term, when I clear it, then all todos return
- [ ] Given no matches, then an "no results" message is shown

#### Tasks
- [ ] Search input component
- [ ] Client-side filter on `title.toLowerCase().includes(query)`
- [ ] "No results" empty state

#### Definition of Done
- [ ] Search filters list in real time
- [ ] Case-insensitive matching works
- [ ] Empty result state shown

---

### US-10 — Bulk Actions

**Priority**: Should Have | **Estimate**: 3 SP | **Status**: Backlog

#### User Story
As a user,  
I want to mark all todos as complete and clear all completed todos at once,  
So that I can manage my list efficiently.

#### Acceptance Criteria
- [ ] Given active todos exist, when I click "Mark all complete", then all become completed
- [ ] Given all are already complete, when I click "Mark all complete", then all become active (toggle)
- [ ] Given completed todos exist, when I click "Clear completed", then they are deleted
- [ ] Given the footer, a count shows "X items left" (active todos only)

#### Tasks
- [ ] `PUT /todos/complete-all` bulk endpoint (or loop on client)
- [ ] `DELETE /todos/completed` bulk delete endpoint (or loop on client)
- [ ] Mark-all toggle button
- [ ] Clear-completed button (hidden when no completed items)
- [ ] Items-left counter

#### Definition of Done
- [ ] Mark all and clear completed work correctly
- [ ] Items left count is accurate

---

## EPIC-04 — User Experience Polish

---

### US-11 — Loading & Error States

**Priority**: Should Have | **Estimate**: 3 SP | **Status**: Backlog

#### User Story
As a user,  
I want clear feedback when data is loading or an error occurs,  
So that I'm never confused about what the app is doing.

#### Acceptance Criteria
- [ ] Given the app loads, when fetching todos, then a skeleton loader is shown
- [ ] Given a network error, when any API call fails, then a toast notification appears
- [ ] Given the toast, it auto-dismisses after 4 seconds
- [ ] Given a pending mutation, when the request is in-flight, then the action button is disabled

#### Tasks
- [ ] Skeleton loader component for todo list
- [ ] Toast notification system (or `react-hot-toast`)
- [ ] Error boundaries for fetch failures
- [ ] Disable submit/delete buttons during pending requests

#### Definition of Done
- [ ] Skeleton shown on initial load
- [ ] Toast shown on API error
- [ ] No double-submission possible

---

### US-12 — Keyboard Accessibility

**Priority**: Should Have | **Estimate**: 2 SP | **Status**: Backlog

#### User Story
As a keyboard-only user,  
I want to fully manage my todos without a mouse,  
So that the app is accessible and fast to use.

#### Acceptance Criteria
- [ ] Given the add form, when I press Enter, then the todo is created
- [ ] Given edit mode, when I press Escape, then the edit is cancelled
- [ ] Given the todo list, all interactive elements are reachable by Tab
- [ ] Given focus, all interactive elements have a visible focus ring

#### Tasks
- [ ] Ensure all buttons/inputs are native elements (keyboard-focusable by default)
- [ ] Add `onKeyDown` handlers for Enter and Escape in edit mode
- [ ] Verify focus ring in CSS (Tailwind `focus-visible:ring`)
- [ ] Logical tab order across the form and list

#### Definition of Done
- [ ] All actions completable via keyboard
- [ ] Focus rings visible on all interactive elements

---

### US-13 — Mobile Responsive Layout

**Priority**: Should Have | **Estimate**: 2 SP | **Status**: Backlog

#### User Story
As a mobile user,  
I want the app to look and work well on my phone,  
So that I can manage todos on the go.

#### Acceptance Criteria
- [ ] Given a 375px viewport, when the app loads, then all content is visible without horizontal scroll
- [ ] Given touch input, when I tap a checkbox or button, then it responds (touch target ≥ 44px)
- [ ] Given the add form, when on mobile, then the keyboard does not obscure the input

#### Tasks
- [ ] Responsive Tailwind classes (full-width on mobile, max-width on desktop)
- [ ] Touch target sizing (`min-h-[44px]` for interactive elements)
- [ ] Test on 375px, 768px, 1280px breakpoints

#### Definition of Done
- [ ] No horizontal scroll on 375px
- [ ] All touch targets ≥ 44px

---

## EPIC-05 — API Quality & Observability

---

### US-14 — Input Validation & Error Responses

**Priority**: Could Have | **Estimate**: 2 SP | **Status**: Backlog

#### User Story
As an API consumer,  
I want consistent, descriptive error responses,  
So that I can handle failures gracefully and debug quickly.

#### Acceptance Criteria
- [ ] Given `POST /todos` with no `title` field, then `400 Bad Request` with `{"error":"title is required"}`
- [ ] Given any endpoint with an invalid ID format, then `400 Bad Request`
- [ ] Given a valid ID that doesn't exist, then `404 Not Found` with `{"error":"todo not found"}`
- [ ] Given an internal server error, then `500 Internal Server Error` (never 200 with error body)

#### Tasks
- [ ] Centralized error response helper `respondError(c, status, msg)`
- [ ] Validate `title` on create/update
- [ ] ID parsing with error on non-integer
- [ ] GORM record-not-found check → 404

#### Definition of Done
- [ ] All error scenarios return correct HTTP status codes
- [ ] Error body always has `{"error":"..."}` shape

---

### US-15 — Structured Logging & Health Check

**Priority**: Could Have | **Estimate**: 2 SP | **Status**: Backlog

#### User Story
As a developer operating the backend,  
I want structured logs and a health-check endpoint,  
So that I can monitor the service and integrate it with infrastructure health checks.

#### Acceptance Criteria
- [ ] Given any HTTP request, when it completes, then a log line is printed with `method`, `path`, `status`, `latency`
- [ ] Given `GET /health`, then it returns `200 OK` with `{"status":"ok","db":"connected"}`
- [ ] Given the DB is unavailable, then `/health` returns `503`

#### Tasks
- [ ] Gin logger middleware (built-in or custom)
- [ ] `/health` endpoint that pings DB
- [ ] `503` response when DB ping fails

#### Definition of Done
- [ ] Every request produces a log line
- [ ] `/health` returns 200 when DB is up
- [ ] `/health` returns 503 when DB is down

---

## Backlog Summary

| ID    | Story                            | Epic     | Priority    | Points | Status  |
|-------|----------------------------------|----------|-------------|--------|---------|
| US-01 | Go Backend Scaffold              | EPIC-01  | Must Have   | 2      | Backlog |
| US-02 | React + TS Frontend Scaffold     | EPIC-01  | Must Have   | 1      | Backlog |
| US-03 | Create a Todo                    | EPIC-02  | Must Have   | 3      | Backlog |
| US-04 | List All Todos                   | EPIC-02  | Must Have   | 2      | Backlog |
| US-05 | Complete / Uncomplete a Todo     | EPIC-02  | Must Have   | 2      | Backlog |
| US-06 | Edit a Todo Title                | EPIC-02  | Must Have   | 3      | Backlog |
| US-07 | Delete a Todo                    | EPIC-02  | Must Have   | 2      | Backlog |
| US-08 | Filter Todos by Status           | EPIC-03  | Should Have | 2      | Backlog |
| US-09 | Search Todos                     | EPIC-03  | Should Have | 2      | Backlog |
| US-10 | Bulk Actions                     | EPIC-03  | Should Have | 3      | Backlog |
| US-11 | Loading & Error States           | EPIC-04  | Should Have | 3      | Backlog |
| US-12 | Keyboard Accessibility           | EPIC-04  | Should Have | 2      | Backlog |
| US-13 | Mobile Responsive Layout         | EPIC-04  | Should Have | 2      | Backlog |
| US-14 | Input Validation & Error Responses | EPIC-05 | Could Have | 2      | Backlog |
| US-15 | Structured Logging & Health Check| EPIC-05  | Could Have  | 2      | Backlog |
|       | **Total**                        |          |             | **33** |         |
