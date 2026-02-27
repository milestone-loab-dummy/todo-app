# E2E Test Report — Todo App

| Field | Value |
|-------|-------|
| **Date** | 2026-02-27 |
| **Time** | 14:13 – 14:19 (UTC+1) |
| **Frontend** | http://localhost:3000 (React + TypeScript + Vite) |
| **Backend** | http://localhost:8080 (Go + Gin + SQLite) |
| **DB Path** | `/projects/todo-app/backend/todos.db` |
| **Browser** | Chromium (via agent-browser / Playwright) |
| **Tester** | OpenCode E2E Agent |
| **Overall Result** | **PASS** |

---

## Summary

| Journey | Story | Status | Screenshots |
|---------|-------|--------|-------------|
| 1 – App Load & Empty State | US-04, US-11 | ✅ PASS | `00-initial-load.png` |
| 2 – Create Todos | US-03 | ✅ PASS | `01-create-todo.png`, `02-list-three-todos.png` |
| 3 – Complete / Uncomplete a Todo | US-05 | ✅ PASS | `03-complete-todo.png`, `04-uncomplete-todo.png` |
| 4 – Edit a Todo | US-06 | ✅ PASS | `05-edit-mode.png`, `06-edit-saved.png` |
| 5 – Cancel Edit with Escape | US-06 | ✅ PASS | `07-edit-mode-cancel.png`, `08-edit-cancelled.png` |
| 6 – Filter Todos | US-08 | ✅ PASS | `09-filter-active.png`, `10-filter-completed.png`, `11-filter-all.png` |
| 7 – Delete a Todo | US-07 | ✅ PASS | `12-delete-todo.png` |
| 8 – Empty Input Validation | US-03 | ✅ PASS | `13-empty-input.png` |
| 9 – Mobile Responsive | US-13 | ✅ PASS | `14-mobile-view.png`, `15-desktop-view.png` |

**Total journeys tested:** 9  
**Passed:** 9  
**Failed:** 0  
**Screenshots captured:** 16

---

## Journey Details

### Journey 1: App Load & Empty State (US-04, US-11)

**Status:** ✅ PASS

**Steps performed:**
- Opened http://localhost:3000
- Waited for network idle

**Verification:**
- "Todo App" `<h1>` heading visible ✓
- Empty state message: "No todos yet. Add one above!" ✓
- "New todo" input with placeholder rendered ✓
- Filter buttons (All / Active / Completed) visible ✓
- "0 items left" counter displayed ✓

**Screenshots:** `00-initial-load.png`

---

### Journey 2: Create Todos (US-03)

**Status:** ✅ PASS

**Steps performed:**
- Typed "Buy groceries" → pressed Enter
- Typed "Walk the dog" → pressed Enter
- Typed "Read a book" → pressed Enter

**DB Validation (after all three):**
```
1|Buy groceries|0|2026-02-27 14:13:23
2|Walk the dog|0|2026-02-27 14:13:33
3|Read a book|0|2026-02-27 14:13:38
```
All three todos persisted with `completed=0`. ✓

**Screenshots:** `01-create-todo.png`, `02-list-three-todos.png`

---

### Journey 3: Complete / Uncomplete a Todo (US-05)

**Status:** ✅ PASS

**Steps performed:**
- Clicked checkbox on "Buy groceries" → marked complete
- Verified DB: `completed=1` for id=1 ✓
- Clicked checkbox again → marked active
- Verified DB: `completed=0` for id=1 ✓

**DB Validation (after uncomplete):**
```
1|Buy groceries|0
2|Walk the dog|0
3|Read a book|0
```

**Screenshots:** `03-complete-todo.png`, `04-uncomplete-todo.png`

---

### Journey 4: Edit a Todo (US-06)

**Status:** ✅ PASS

**Steps performed:**
- Triggered `dblclick` on "Walk the dog" span via synthetic MouseEvent
- Edit input appeared with current title ✓
- Cleared input and typed "Walk the cat" using React-native input value setter
- Dispatched `keydown` Enter event to commit
- Waited for API call

**DB Validation:**
```
4|Walk the cat|0
```
Title updated in DB. ✓

**Notes:** Direct `agent-browser dblclick` on a snapshot ref that had shifted caused an accidental delete during testing. Subsequent approach using `eval` with `span.todo-title` CSS selector targeted correctly. "Walk the dog" was recreated as id=4 before editing.

**Screenshots:** `05-edit-mode.png`, `06-edit-saved.png`

---

### Journey 5: Cancel Edit with Escape (US-06)

**Status:** ✅ PASS

**Steps performed:**
- Triggered `dblclick` on "Walk the cat" span
- Edit input appeared ✓
- Dispatched `keydown` Escape event
- Edit mode closed, span reverted to "Walk the cat" ✓

**DB Validation:**
```
4|Walk the cat|0
```
Title unchanged. ✓

**Screenshots:** `07-edit-mode-cancel.png`, `08-edit-cancelled.png`

---

### Journey 6: Filter Todos (US-08)

**Status:** ✅ PASS

**Setup:** Marked "Buy groceries" as complete before filtering.

**Steps performed:**
- Clicked "Active" filter → only "Read a book" and "Walk the cat" visible ✓
- Clicked "Completed" filter → only "Buy groceries" visible ✓
- Clicked "All" filter → all 3 todos visible ✓

**Screenshots:** `09-filter-active.png`, `10-filter-completed.png`, `11-filter-all.png`

---

### Journey 7: Delete a Todo (US-07)

**Status:** ✅ PASS

**Steps performed:**
- Hovered over "Read a book" list item
- Clicked delete (×) button
- Waited for API call

**DB Validation:**
```
1|Buy groceries|1
4|Walk the cat|0
```
"Read a book" (id=3) no longer in DB. ✓  
UI shows 2 remaining items. ✓

**Screenshots:** `12-delete-todo.png`

---

### Journey 8: Empty Input Validation (US-03)

**Status:** ✅ PASS

**Steps performed:**
- Clicked the "New todo" input field (left it empty)
- Pressed Enter

**Verification:**
- `querySelectorAll('li.todo-item').length` returned `2` (unchanged) ✓
- DB count remained `2` ✓
- No empty todo record created ✓

**Screenshots:** `13-empty-input.png`

---

### Journey 9: Mobile Responsive (US-13)

**Status:** ✅ PASS

**Steps performed:**
- Set viewport to 375×812 (iPhone-class mobile)
- Captured screenshot — layout reflows correctly, no overflow ✓
- Set viewport to 1440×900 (desktop)
- Captured screenshot — full layout restored ✓

**Screenshots:** `14-mobile-view.png`, `15-desktop-view.png`

---

## Issues Found

### Issue 1 — Snapshot Ref Drift on Re-use (Severity: LOW / Test Infrastructure)

**Description:** After a DOM change (e.g., adding a todo), previously captured snapshot refs (`@e6`) shift their meaning. Re-using a stale ref for a delete button triggered an accidental deletion of "Walk the dog" during Journey 4.

**Root Cause:** The `agent-browser snapshot -i` refs are ephemeral and reset after any DOM mutation. The ref used was captured before a DOM update.

**Impact:** One todo ("Walk the dog", id=2) was accidentally deleted mid-test. It was recreated as id=4 and the journey proceeded. No data corruption — the app responded correctly to the delete action (the behavior itself was correct).

**Recommendation:** Always call `agent-browser snapshot` immediately before using refs for destructive actions. Use CSS selectors or `eval`-based targeting for edit/delete operations.

**App Severity:** Not an app bug — test tooling workflow issue only.

---

### Issue 2 — Double-click Edit Requires React Native Input Setter (Severity: INFO)

**Description:** Triggering the edit flow via `agent-browser dblclick` on element refs did not reliably activate React's `onDoubleClick` handler. Inline `fill` on the edit input also didn't update React's controlled component state.

**Root Cause:** React synthetic events require native DOM event dispatch via `HTMLInputElement.prototype.value` setter + `new Event('input', {bubbles:true})` to update controlled component state. Standard Playwright fill works on uncontrolled inputs; controlled React inputs need the nativeInputValueSetter pattern.

**Workaround used:** `eval` with `MouseEvent('dblclick', {bubbles:true})` on the correct `span.todo-title` element, followed by React native setter for value change.

**App Severity:** Not an app bug — React behavior is standard. Test infrastructure note.

---

## DB State at End of Test Run

```sql
SELECT id, title, completed FROM todos ORDER BY id;
-- 1|Buy groceries|1
-- 4|Walk the cat|0
```

---

## Screenshots Index

| File | Journey | Description |
|------|---------|-------------|
| `00-initial-load.png` | J1 | Empty state on first load |
| `01-create-todo.png` | J2 | After creating "Buy groceries" |
| `02-list-three-todos.png` | J2 | All three todos in list |
| `03-complete-todo.png` | J3 | "Buy groceries" checked/completed |
| `04-uncomplete-todo.png` | J3 | "Buy groceries" unchecked/active |
| `05-edit-mode.png` | J4 | Edit input open with "Walk the cat" |
| `06-edit-saved.png` | J4 | Edit saved — title updated |
| `07-edit-mode-cancel.png` | J5 | Edit input open before Escape |
| `08-edit-cancelled.png` | J5 | Edit cancelled — title unchanged |
| `09-filter-active.png` | J6 | Active filter showing 2 todos |
| `10-filter-completed.png` | J6 | Completed filter showing 1 todo |
| `11-filter-all.png` | J6 | All filter showing 3 todos |
| `12-delete-todo.png` | J7 | Before/after delete of "Read a book" |
| `13-empty-input.png` | J8 | Empty input press Enter — no new todo |
| `14-mobile-view.png` | J9 | Mobile viewport 375×812 |
| `15-desktop-view.png` | J9 | Desktop viewport 1440×900 |
