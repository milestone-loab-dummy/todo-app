# Filtering Todos by Status

Learn how to view only active or completed todos using the footer filters.

---

## Use the Filter Bar

At the bottom of the todo list you'll find three filter buttons:

| Button | Shows |
|--------|-------|
| **All** | Every todo regardless of status |
| **Active** | Only incomplete todos |
| **Completed** | Only completed todos |

The currently selected filter is highlighted.

### Step 1: Look at the footer

The filter buttons appear below your todo list once at least one todo exists.

### Step 2: Click a filter

The list updates instantly to show only the matching todos.

### Step 3: Click **All** to reset

Click **All** to go back to seeing every todo.

---

## Filter + Search Together

If you have a search term typed in the search box, the filter and search work together. For example:
- Filter = "Active" + Search = "milk" → shows only active todos containing "milk"

---

## In-App Copy Suggestions

| Location | Suggested Text |
|----------|----------------|
| Filter buttons | `All` / `Active` / `Completed` |
| Active filter `aria-pressed` | `true` |
| Active filter empty state | `No active todos.` |
| Completed filter empty state | `No completed todos.` |
| Items left count | `X item left` / `X items left` |

---

## Troubleshooting

### No todos show after clicking a filter

**Problem:** The list is empty after clicking Active or Completed.

**Solution:** This is correct if you have no todos with that status. Check:
- Are all your todos completed? Switch to **Completed** to confirm.
- Is there a search term in the search box filtering out results? Clear it.

### Filter resets after page reload

**Problem:** You left the app on "Active" but it shows "All" when you return.

**Solution:** The selected filter is stored in memory only — it resets to "All" on page load. This is expected behaviour.

---

## Frequently Asked Questions

**Q: Does the filter change what's stored in the database?**

A: No. Filtering only changes what you see on screen. Your todos are always stored and retrievable.

**Q: What does "X items left" mean?**

A: It shows how many todos are still active (not completed).

**Q: Can I combine filter and search?**

A: Yes — the search box filters within the currently selected status filter.

---

## Related Articles

- [Completing Todos](../US-05/docs/help-article.md)
- [Searching Todos](../../US-09/docs/help-article.md)
