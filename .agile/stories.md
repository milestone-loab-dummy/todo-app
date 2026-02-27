# Todo App — User Stories

> **Project**: Todo App  
> **Stack**: React + TypeScript (frontend) · Go + Gin (backend)  
> **Updated**: 2026-02-27

---

## EPIC-01 — Project Foundation & Infrastructure

---

### US-01 — Go Backend Scaffold

**Priority**: Must Have | **Estimate**: 2 SP | **Status**: Done

#### Acceptance Criteria
- [x] Given the repo is cloned, when `go run ./...` is executed from `backend/`, then the server starts on port `8080`
- [x] Given the server is running, when `GET /health` is called, then it returns `200 OK` with `{"status":"ok"}`
- [x] Given first run, when the server starts, then `todos.db` is auto-created via GORM auto-migrate
- [x] Given any request, when it completes, then method, path, status code, and latency are logged to stdout

---

### US-02 — React + TypeScript Frontend Scaffold

**Priority**: Must Have | **Estimate**: 1 SP | **Status**: Done

#### Acceptance Criteria
- [x] Given the repo is cloned, when `npm install && npm run dev` is executed from `frontend/`, then the dev server starts on `http://localhost:3000`
- [x] Given the dev server is running, when the browser opens the URL, then the Todo App title is visible
- [x] Given `npm run build` is executed, then the build completes without TypeScript errors

---

## EPIC-02 — Todo CRUD (Core Feature)

---

### US-03 — Create a Todo

**Priority**: Must Have | **Estimate**: 3 SP | **Status**: Done

#### Acceptance Criteria
- [x] Given I type text and press Enter, when the input is non-empty, then the todo appears in the list
- [x] Given I type text and press Enter, when the input is empty, then nothing happens (no empty todos)
- [x] Given the todo is created, when the list reloads, then the new todo persists (stored in DB)
- [x] Given the todo is created, then `POST /todos` returns `201 Created` with the new todo object
- [x] Given the todo is created, when the backend confirms, then the input field clears

---

### US-04 — List All Todos

**Priority**: Must Have | **Estimate**: 2 SP | **Status**: Done

#### Acceptance Criteria
- [x] Given the app loads, when `GET /todos` is called, then all stored todos are returned in an array
- [x] Given the list is empty, when the app loads, then an empty state message is shown
- [x] Given todos exist, when the app loads, then each todo shows its title and completion status
- [x] Given the app loads, when fetching is in progress, then a loading indicator is shown

---

### US-05 — Complete / Uncomplete a Todo

**Priority**: Must Have | **Estimate**: 2 SP | **Status**: Done

#### Acceptance Criteria
- [x] Given a todo is active, when I click the checkbox, then it is marked completed (strikethrough style)
- [x] Given a todo is completed, when I click the checkbox, then it is unmarked (toggled back)
- [x] Given the toggle, when the backend confirms, then the state persists across page reloads
- [x] Given `PUT /todos/:id` is called, when the ID doesn't exist, then 404 is returned

---

### US-06 — Edit a Todo Title

**Priority**: Must Have | **Estimate**: 3 SP | **Status**: Done

#### Acceptance Criteria
- [x] Given a todo, when I double-click its title, then it becomes an editable input field
- [x] Given I'm editing, when I press Enter or click away, then the new title is saved
- [x] Given I'm editing, when I press Escape, then the edit is cancelled and original title restored
- [x] Given I save with an empty title, then the edit is cancelled (no empty todos)
- [x] Given the save, when the backend confirms, then the new title persists

---

### US-07 — Delete a Todo

**Priority**: Must Have | **Estimate**: 2 SP | **Status**: Done

#### Acceptance Criteria
- [x] Given a todo, when I click the delete button, then the todo is removed from the list immediately
- [x] Given the deletion, when the backend confirms, then the todo is gone from the DB
- [x] Given `DELETE /todos/:id`, when the ID doesn't exist, then 404 is returned
- [x] Given the delete button, it is only visible on hover (not always cluttering the UI)

---

## EPIC-03 — Todo Organization & Filtering

---

### US-08 — Filter Todos by Status

**Priority**: Should Have | **Estimate**: 2 SP | **Status**: Done

#### Acceptance Criteria
- [x] Given the footer filter, when I click "Active", then only incomplete todos are shown
- [x] Given the footer filter, when I click "Completed", then only completed todos are shown
- [x] Given the footer filter, when I click "All", then all todos are shown
- [x] Given a filter is active, then the selected filter is visually highlighted

---

### US-09 — Search Todos

**Priority**: Should Have | **Estimate**: 2 SP | **Status**: Done

#### Acceptance Criteria
- [x] Given a search term, when I type in the search box, then only matching todos are shown (case-insensitive)
- [x] Given a search term, when I clear it, then all todos return
- [x] Given no matches, then a "no results" message is shown

---

### US-10 — Bulk Actions

**Priority**: Should Have | **Estimate**: 3 SP | **Status**: Done

#### Acceptance Criteria
- [x] Given active todos exist, when I click "Mark all complete", then all become completed
- [x] Given all are already complete, when I click "Mark all complete", then all become active (toggle)
- [x] Given completed todos exist, when I click "Clear completed", then they are deleted
- [x] Given the footer, a count shows "X items left" (active todos only)

---

## EPIC-04 — User Experience Polish

---

### US-11 — Loading & Error States

**Priority**: Should Have | **Estimate**: 3 SP | **Status**: Done

#### Acceptance Criteria
- [x] Given the app loads, when fetching todos, then a skeleton loader is shown
- [x] Given a network error, when any API call fails, then a toast notification appears
- [x] Given the toast, it auto-dismisses after 4 seconds
- [x] Given a pending mutation, when the request is in-flight, then the action button is disabled

---

### US-12 — Keyboard Accessibility

**Priority**: Should Have | **Estimate**: 2 SP | **Status**: Done

#### Acceptance Criteria
- [x] Given the add form, when I press Enter, then the todo is created
- [x] Given edit mode, when I press Escape, then the edit is cancelled
- [x] Given the todo list, all interactive elements are reachable by Tab
- [x] Given focus, all interactive elements have a visible focus ring

---

### US-13 — Mobile Responsive Layout

**Priority**: Should Have | **Estimate**: 2 SP | **Status**: Done

#### Acceptance Criteria
- [x] Given a 375px viewport, when the app loads, then all content is visible without horizontal scroll
- [x] Given touch input, when I tap a checkbox or button, then it responds (touch target ≥ 44px)
- [x] Given the add form, when on mobile, then the keyboard does not obscure the input

---

## EPIC-05 — API Quality & Observability

---

### US-14 — Input Validation & Error Responses

**Priority**: Could Have | **Estimate**: 2 SP | **Status**: Done

#### Acceptance Criteria
- [x] Given `POST /todos` with no `title` field, then `400 Bad Request` with `{"error":"title is required"}`
- [x] Given any endpoint with an invalid ID format, then `400 Bad Request`
- [x] Given a valid ID that doesn't exist, then `404 Not Found` with `{"error":"todo not found"}`
- [x] Given an internal server error, then `500 Internal Server Error` (never 200 with error body)

---

### US-15 — Structured Logging & Health Check

**Priority**: Could Have | **Estimate**: 2 SP | **Status**: Done

#### Acceptance Criteria
- [x] Given any HTTP request, when it completes, then a log line is printed with `method`, `path`, `status`, `latency`
- [x] Given `GET /health`, then it returns `200 OK` with `{"status":"ok","db":"connected"}`
- [x] Given the DB is unavailable, then `/health` returns `503`

---

## Backlog Summary

| ID    | Story                            | Epic     | Priority    | Points | Status  |
|-------|----------------------------------|----------|-------------|--------|---------|
| US-01 | Go Backend Scaffold              | EPIC-01  | Must Have   | 2      | Done    |
| US-02 | React + TS Frontend Scaffold     | EPIC-01  | Must Have   | 1      | Done    |
| US-03 | Create a Todo                    | EPIC-02  | Must Have   | 3      | Done    |
| US-04 | List All Todos                   | EPIC-02  | Must Have   | 2      | Done    |
| US-05 | Complete / Uncomplete a Todo     | EPIC-02  | Must Have   | 2      | Done    |
| US-06 | Edit a Todo Title                | EPIC-02  | Must Have   | 3      | Done    |
| US-07 | Delete a Todo                    | EPIC-02  | Must Have   | 2      | Done    |
| US-08 | Filter Todos by Status           | EPIC-03  | Should Have | 2      | Done    |
| US-09 | Search Todos                     | EPIC-03  | Should Have | 2      | Done    |
| US-10 | Bulk Actions                     | EPIC-03  | Should Have | 3      | Done    |
| US-11 | Loading & Error States           | EPIC-04  | Should Have | 3      | Done    |
| US-12 | Keyboard Accessibility           | EPIC-04  | Should Have | 2      | Done    |
| US-13 | Mobile Responsive Layout         | EPIC-04  | Should Have | 2      | Done    |
| US-14 | Input Validation & Error Responses | EPIC-05 | Could Have | 2      | Done    |
| US-15 | Structured Logging & Health Check| EPIC-05  | Could Have  | 2      | Done    |
|       | **Total**                        |          |             | **33** |         |
