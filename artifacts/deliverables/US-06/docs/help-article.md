# Editing a Todo Title

Learn how to rename a todo without deleting and recreating it.

---

## Edit a Todo

### Step 1: Double-click the todo title

The title text is replaced with an input field containing the current title. All the text is selected so you can start typing straight away.

### Step 2: Type your new title

Edit the text as needed.

### Step 3: Save or cancel

| Action | Result |
|--------|--------|
| Press **Enter** | Saves the new title |
| Click anywhere else | Saves the new title |
| Press **Escape** | Cancels — original title restored |

> **Tip:** If you clear the field completely and try to save, the edit is cancelled automatically. The original title is kept.

---

## In-App Copy Suggestions

| Location | Suggested Text |
|----------|----------------|
| Title `title` attribute | `Double-click to edit` |
| Edit input placeholder | *(keep current title selected — no placeholder needed)* |
| Error toast (save failed) | `Failed to update todo. Please try again.` |

---

## Troubleshooting

### Double-click opens edit but Escape doesn't cancel

**Problem:** Pressing Escape seems to save instead of cancel.

**Solution:** This is fixed in the implementation with a `cancelledRef` guard. If you see this behaviour, ensure you are running the latest version of the frontend.

### Clicking away saves an empty title

**Problem:** Clicking outside with an empty field triggers a save.

**Solution:** The app checks for empty titles on blur — if the field is empty, the edit is silently cancelled and the original title is kept. No empty todos are created.

### Edit disappears without saving

**Problem:** You edited a title but the original text reappears after you save.

**Solution:**
1. Check the backend is running
2. Look for an error toast — if the API call failed, the local update is not applied
3. Refresh the page to see the current saved state

---

## Frequently Asked Questions

**Q: Can I edit the title of a completed todo?**

A: Yes — double-clicking works regardless of whether the todo is completed.

**Q: Does editing change the completion status?**

A: No — editing only updates the title. The completed state is unchanged.

**Q: What happens if I save the same title I started with?**

A: The app detects no change and skips the API call entirely. No network request is made.

---

## Related Articles

- [Adding Todos](../US-03/docs/help-article.md)
- [Completing Todos](../US-05/docs/help-article.md)
