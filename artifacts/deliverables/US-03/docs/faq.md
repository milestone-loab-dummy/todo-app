# FAQ — Create a Todo (US-03)

## How do I add a new todo?

Type your task in the input field at the top of the page and press **Enter**. The todo is added to the list immediately.

## What happens if I press Enter on an empty input?

Nothing. The app ignores empty submissions — no blank todos are created.

## Is my todo saved if I refresh the page?

Yes. Each todo is saved to the backend database (SQLite) when you create it. Refreshing the page reloads todos from the database.

## Can I add a todo by clicking a button instead of pressing Enter?

The primary interaction is pressing Enter. There is no separate "Add" button in the default design.

## What is the maximum length for a todo title?

There is no hard character limit enforced in the UI, but keep titles concise for readability. Very long titles may wrap in the list.

## Why does the input field clear after I add a todo?

This is intentional. The input clears automatically after a successful submission so you can add the next task without manually clearing it.

## What happens if the backend is unreachable when I create a todo?

A toast error notification appears telling you the request failed. The todo is not added to the list.

## Can I undo adding a todo?

There is no undo action. You can delete the todo you just added by hovering over it and clicking the delete button.
