# Troubleshooting — Edit a Todo Title (US-06)

## Double-clicking the title doesn't open edit mode

**Symptom:** Double-clicking a todo title does nothing.

**Cause:** The click may not have registered as a double-click, or another element is capturing the event.

**Fix:**
1. Click slowly twice in quick succession directly on the title text.
2. Avoid clicking the checkbox or delete button — click the title text only.

---

## Edit mode opens but I can't type

**Symptom:** The input appears but keyboard input has no effect.

**Cause:** The input field may not have focus.

**Fix:** Click directly inside the input field to ensure it has focus, then type.

---

## Pressing Escape doesn't cancel the edit

**Symptom:** Pressing Escape while editing does not restore the original title.

**Cause:** The input field may have lost focus, or a browser extension is intercepting keyboard events.

**Fix:**
1. Click inside the input to re-focus it, then press Escape.
2. Alternatively, clicking outside the input (blur) will also save the current value.

---

## Changes are not saved after pressing Enter

**Symptom:** Pressing Enter dismisses edit mode but the old title shows on refresh.

**Cause:** The backend request failed.

**Fix:**
1. Check for a toast error notification.
2. Verify the backend is running.
3. Check the network request in browser DevTools → Network tab.

---

## Empty title saves (should cancel)

**Symptom:** Clearing the input and pressing Enter saves an empty title.

**Cause:** This should not happen — the app cancels edits with empty titles. If you see this, report it as a bug.

**Workaround:** Double-click the todo and re-type the correct title.

---

## Title flickers between old and new values

**Symptom:** The title briefly shows the old value before updating.

**Cause:** Normal behaviour during the backend round-trip. The UI updates once the server confirms.

**Fix:** This is not an error. If the flicker is long (> 1 second), check backend response times.
