# Troubleshooting — Filter Todos by Status (US-08)

## Clicking a filter button has no effect

**Symptom:** Clicking "Active", "Completed", or "All" doesn't change the list.

**Cause:** JavaScript may not have loaded, or an error is preventing event handlers from registering.

**Fix:**
1. Refresh the page.
2. Check the browser console for JavaScript errors.
3. Ensure the app is running on a supported browser (Chrome, Firefox, Safari, Edge).

---

## "Active" filter shows completed todos (or vice versa)

**Symptom:** The filter shows incorrect todos.

**Cause:** This may be a display bug if the completion state is out of sync.

**Fix:**
1. Refresh the page to reload from the backend.
2. Check if the todos have the correct completion state by toggling them.

---

## Selected filter highlight is not visible

**Symptom:** You clicked a filter but it doesn't look visually selected.

**Cause:** CSS may not have loaded correctly.

**Fix:** Hard refresh the page (`Ctrl+Shift+R` on Windows/Linux, `Cmd+Shift+R` on Mac).

---

## Filter resets unexpectedly

**Symptom:** The filter switches back to "All" without you clicking it.

**Cause:** A page action (like adding a todo) may be triggering a state reset.

**Fix:** This is a known behaviour on page-level state changes. Re-apply the filter after the action.

---

## Footer count seems wrong while filtering

**Symptom:** The "X items left" count in the footer doesn't match the filtered list.

**Cause:** The footer count always shows the total number of **active** (incomplete) todos, not the number of visible todos in the current filter view.

**Fix:** This is by design. The count reflects items remaining to complete, not the current view count.
