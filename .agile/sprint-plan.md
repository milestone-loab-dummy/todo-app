# Todo App — Sprint Plan

> **Project**: Todo App  
> **Updated**: 2026-02-27

---

## Sprint 1 — "It Works" (Must Have, 12 SP)

**Sprint Goal**: A user can add, list, complete, edit, and delete todos through a running UI connected to a real backend with a persistent database.

| Story | Title                        | Points | Status  |
|-------|------------------------------|--------|---------|
| US-01 | Go Backend Scaffold          | 2      | Backlog |
| US-02 | React + TS Frontend Scaffold | 1      | Backlog |
| US-03 | Create a Todo                | 3      | Backlog |
| US-04 | List All Todos               | 2      | Backlog |
| US-05 | Complete / Uncomplete a Todo | 2      | Backlog |
| US-06 | Edit a Todo Title            | 3      | Backlog |
| US-07 | Delete a Todo                | 2      | Backlog |
| US-08 | Filter Todos by Status       | 2      | Backlog |
| US-11 | Loading & Error States       | 3      | Backlog |
|       | **Sprint 1 Total**           | **20** |         |

---

## Sprint 2 — "It's Useful" (Core UX + Edit, 10 SP)

**Sprint Goal**: The app is complete enough for daily use — edit, filter, search, and bulk actions all work.

| Story | Title                        | Points | Status  |
|-------|------------------------------|--------|---------|
| US-06 | Edit a Todo Title            | 3      | Backlog |
| US-08 | Filter Todos by Status       | 2      | Backlog |
| US-09 | Search Todos                 | 2      | Backlog |
| US-10 | Bulk Actions                 | 3      | Backlog |
|       | **Sprint 2 Total**           | **10** |         |

---

## Sprint 3 — "It's Delightful" (Polish + Quality, 11 SP)

**Sprint Goal**: The app is polished, accessible, mobile-friendly, and the backend is production-quality.

| Story | Title                                  | Points | Status  |
|-------|----------------------------------------|--------|---------|
| US-11 | Loading & Error States                 | 3      | Backlog |
| US-12 | Keyboard Accessibility                 | 2      | Backlog |
| US-13 | Mobile Responsive Layout               | 2      | Backlog |
| US-14 | Input Validation & Error Responses     | 2      | Backlog |
| US-15 | Structured Logging & Health Check      | 2      | Backlog |
|       | **Sprint 3 Total**                     | **11** |         |

---

## Definition of Done (Project-wide)

- [ ] Code compiles with no errors (`go build`, `npm run build`)
- [ ] All acceptance criteria in the story are verified manually
- [ ] No TypeScript `any` types without explicit justification
- [ ] Go code passes `go vet ./...`
- [ ] API returns correct HTTP status codes for all scenarios
- [ ] UI is tested in Chrome at 375px and 1280px viewport widths
- [ ] No hardcoded URLs — all config via environment variables

## Definition of Ready (before a story can start)

- [ ] Acceptance criteria are written and understood
- [ ] API contract (request/response shape) is agreed
- [ ] Story is estimated
- [ ] No unresolved dependencies
