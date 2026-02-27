# Viewing Your Todos

Learn how the Todo App loads and displays your todo list.

---

## What You'll See

When you open the app at `http://localhost:3000`, it loads all your todos automatically.

### Loading State

While your todos are being fetched, you'll see three animated placeholder rows. This lets you know the app is working — it usually takes less than a second.

### Your Todo List

Each todo shows:
- A **checkbox** on the left (to mark it complete)
- The **title** in the centre
- A **delete button** (×) that appears when you hover over the row

### Empty State

If you haven't added any todos yet, you'll see:

> "No todos yet. Add one above!"

---

## In-App Copy Suggestions

| Location | Suggested Text |
|----------|----------------|
| Empty state | `No todos yet. Add one above!` |
| Loading `aria-label` | `Loading todos` |
| Error toast (load failed) | `Failed to load todos. Is the backend running?` |
| Active filter empty state | `No active todos.` |
| Completed filter empty state | `No completed todos.` |

---

## Troubleshooting

### Todos don't load (skeleton stays forever)

**Problem:** The placeholder animation runs but never shows your todos.

**Solution:**
1. Confirm the backend is running: `curl http://localhost:8080/health`
2. Check `VITE_API_URL` in your `.env.local` matches the backend address
3. Open the browser DevTools → Network tab and look for a failed request to `/todos`

### Some todos are missing

**Problem:** You know you added todos but they're not showing.

**Solution:**
1. Check whether a filter is active — click **All** in the footer to show everything
2. Clear the search box if you typed anything there
3. If the issue persists, the database may have been reset — check `backend/todos.db` exists

---

## Frequently Asked Questions

**Q: How are todos ordered?**

A: Newest todos appear at the bottom of the list (in the order they were created).

**Q: How many todos can I have?**

A: There's no limit — SQLite handles thousands of records without issue.

**Q: Do my todos save automatically?**

A: Yes. Every todo is saved to the database as soon as you create it.

---

## Related Articles

- [Adding Todos](../US-03/docs/help-article.md)
- [Filtering Todos](../US-08/docs/help-article.md)
- [Loading & Error States](../US-11/docs/help-article.md)
