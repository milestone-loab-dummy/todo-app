# Loading States and Error Notifications

Learn how the Todo App keeps you informed when data is loading or something goes wrong.

---

## Loading Indicator

When you first open the app, three animated placeholder rows appear while your todos are being fetched. This skeleton loader lets you know the app is working.

Once your todos load (usually under a second), the placeholders are replaced with your real list.

---

## Error Notifications (Toasts)

If any action fails — loading, creating, updating, or deleting a todo — a notification banner appears at the bottom of the screen.

The notification:
- Describes what went wrong (e.g., "Failed to create todo.")
- **Disappears automatically after 4 seconds**
- Can be closed immediately by clicking **×** on the banner

### Common error messages

| Message | What it means |
|---------|---------------|
| `Failed to load todos. Is the backend running?` | The app couldn't reach the backend on startup |
| `Failed to create todo.` | The create request didn't reach the server |
| `Failed to update todo.` | A toggle or edit didn't save |
| `Failed to delete todo.` | The delete request failed |

---

## Disabled Buttons

While a request is in-flight for a specific todo, its checkbox and delete button are temporarily disabled (greyed out). This prevents duplicate actions.

The new-todo input is also disabled while a create request is processing.

---

## In-App Copy Suggestions

| Location | Suggested Text |
|----------|----------------|
| Skeleton loader `aria-label` | `Loading todos` |
| Create error toast | `Failed to create todo.` |
| Update error toast | `Failed to update todo.` |
| Delete error toast | `Failed to delete todo.` |
| Load error toast | `Failed to load todos. Is the backend running?` |
| Clear completed error toast | `Failed to clear completed todos.` |
| Toast close button `aria-label` | `Dismiss notification` |

---

## Troubleshooting

### The skeleton loader never goes away

**Problem:** The loading animation runs indefinitely.

**Solution:**
1. Make sure the backend is running: `curl http://localhost:8080/health`
2. Open the browser DevTools → Network tab and check the `/todos` request
3. Verify `VITE_API_URL` points to the correct backend address

### Error toasts appear on every action

**Problem:** Every create, update, or delete shows an error toast.

**Solution:** The backend is likely not running or not reachable. Start it with `go run ./...` from the `backend/` folder and reload the page.

### Toasts don't dismiss automatically

**Problem:** Toast banners stay on screen indefinitely.

**Solution:** This is a browser focus issue in some environments. Click the **×** on the toast to dismiss it manually. Refreshing the page also clears all toasts.

---

## Frequently Asked Questions

**Q: Can I dismiss a toast before 4 seconds?**

A: Yes — click the **×** button on the toast.

**Q: What happens if multiple things fail at the same time?**

A: Each failure shows its own toast. Multiple toasts stack on screen and each dismisses independently after 4 seconds.

**Q: Are errors logged anywhere?**

A: Errors are shown as toasts in the UI. For more detail, check the browser console (F12 → Console) and the backend terminal output.

---

## Related Articles

- [Viewing Your Todos](../US-04/docs/help-article.md)
- [Setting Up the Backend](../US-01/docs/help-article.md)
