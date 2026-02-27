# Todo App — Product Epics

> **Project**: Todo App  
> **Stack**: React + TypeScript (frontend) · Go + Gin (backend)  
> **Updated**: 2026-02-27

---

## EPIC-01 — Project Foundation & Infrastructure

**Goal**: Set up the project skeleton, tooling, and developer experience so every engineer can build and run the app locally in under 5 minutes.

**Scope**:
- Go backend project structure (Gin, SQLite via GORM)
- React + TypeScript frontend scaffold (Vite)
- CORS configuration between frontend and backend
- Environment configuration (ports, DB path)
- README with run instructions

**Out of Scope**: Deployment, CI/CD, authentication

**Business Value**: Unblocks all other epics. Zero value without this.

**Priority**: Must Have  
**Estimate**: 3 story points  

---

## EPIC-02 — Todo CRUD (Core Feature)

**Goal**: Users can create, read, update, and delete todo items through a clean REST API and a responsive UI.

**Scope**:
- `GET /todos` — list all todos
- `POST /todos` — create a new todo
- `PUT /todos/:id` — update title or completion status
- `DELETE /todos/:id` — delete a todo
- Frontend: todo list view, add form, inline edit, delete button
- Persistence: SQLite database (survives restarts)

**Out of Scope**: User accounts, shared todos, file attachments

**Business Value**: The entire reason the app exists. Nothing else matters without this.

**Priority**: Must Have  
**Estimate**: 13 story points  

---

## EPIC-03 — Todo Organization & Filtering

**Goal**: Users can keep large todo lists manageable by filtering, searching, and organizing items.

**Scope**:
- Filter by status: All / Active / Completed
- Search todos by keyword (client-side)
- Mark all as complete / clear all completed (bulk actions)
- Item count summary ("3 items left")

**Out of Scope**: Tags, projects, folders, due dates

**Business Value**: Productivity boost once a user has more than ~10 todos.

**Priority**: Should Have  
**Estimate**: 8 story points  

---

## EPIC-04 — User Experience Polish

**Goal**: The app feels delightful, responsive, and accessible — not like a tutorial project.

**Scope**:
- Loading states (skeleton / spinner) while fetching data
- Optimistic UI updates (instant feedback before server confirms)
- Empty state illustration and call-to-action
- Error handling with user-friendly toast notifications
- Keyboard accessibility (Enter to add, Escape to cancel edit)
- Mobile-responsive layout

**Out of Scope**: Animations beyond subtle transitions, theming, i18n

**Business Value**: Differentiates the app from a raw CRUD demo; drives user retention.

**Priority**: Should Have  
**Estimate**: 8 story points  

---

## EPIC-05 — API Quality & Observability

**Goal**: The backend API is robust, validated, and observable in production.

**Scope**:
- Input validation with proper error responses (400, 404, 422)
- Structured JSON logging (request method, path, status, latency)
- Health-check endpoint `GET /health`
- OpenAPI / Swagger documentation

**Out of Scope**: Distributed tracing, metrics dashboards, alerting

**Business Value**: Makes the backend maintainable and debuggable beyond development.

**Priority**: Could Have  
**Estimate**: 5 story points  

---

## Summary Table

| ID       | Title                            | Priority    | Points | Status   |
|----------|----------------------------------|-------------|--------|----------|
| EPIC-01  | Project Foundation & Infrastructure | Must Have | 3      | Backlog  |
| EPIC-02  | Todo CRUD (Core Feature)         | Must Have   | 13     | Backlog  |
| EPIC-03  | Todo Organization & Filtering    | Should Have | 8      | Backlog  |
| EPIC-04  | User Experience Polish           | Should Have | 8      | Backlog  |
| EPIC-05  | API Quality & Observability      | Could Have  | 5      | Backlog  |
|          | **Total**                        |             | **37** |          |
