# Adding Todos

Learn how to create new todos in the Todo App.

---

## Before You Start

- The app is open at `http://localhost:3000`
- The backend is running on port 8080

---

## Create a Todo

### Step 1: Click the input at the top of the page

The input field reads "What needs to be done? Press Enter to add."

### Step 2: Type your todo title

Enter any text that describes the task you want to track.

### Step 3: Press Enter

The todo appears immediately in the list below. The input field clears, ready for your next todo.

> **Tip:** If you press Enter on an empty input, nothing happens — the app prevents blank todos.

---

## What Happens Behind the Scenes

Your todo is saved to the database immediately. If you reload the page, it will still be there.

---

## In-App Copy Suggestions

| Location | Suggested Text |
|----------|----------------|
| Input placeholder | `What needs to be done? Press Enter to add.` |
| Input `aria-label` | `New todo` |
| Error toast (create failed) | `Failed to create todo. Please try again.` |
| Success (input clears) | *(input clears — no confirmation message needed)* |

---

## Troubleshooting

### Todo doesn't appear after pressing Enter

**Problem:** The todo doesn't show up in the list.

**Solution:**
1. Make sure the backend is running (`curl http://localhost:8080/health`)
2. Check the browser console for errors
3. Reload the page — if the todo appears after reload, it was saved but the UI failed to update

### Input stays disabled after creating

**Problem:** The input field stays greyed out after pressing Enter.

**Solution:** The input is temporarily disabled while the request is in-flight. If it stays disabled, the request may have timed out — check your backend is responsive.

---

## Frequently Asked Questions

**Q: Can I add multiple todos quickly?**

A: Yes — after pressing Enter, the input clears immediately so you can type the next todo right away.

**Q: Is there a character limit?**

A: No character limit is enforced by the frontend. The database stores any length of text.

**Q: What if I accidentally press Enter on an empty input?**

A: Nothing happens. The app ignores empty submissions.

---

## Related Articles

- [Listing Your Todos](../US-04/docs/help-article.md)
- [Editing a Todo](../US-06/docs/help-article.md)
- [Deleting a Todo](../US-07/docs/help-article.md)
