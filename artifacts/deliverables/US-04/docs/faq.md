# FAQ — List All Todos (US-04)

## Where does the app load todos from?

Todos are fetched from the backend API (`GET /todos`) when the app loads. They are stored in a SQLite database on the backend.

## What do I see while todos are loading?

A skeleton loading animation is displayed while the app fetches todos from the backend. This indicates the request is in progress.

## What happens if I have no todos?

When the list is empty, the app shows an empty state message to let you know there are no todos yet.

## Does the list update automatically?

The list reloads after every create, update, or delete action. It does not poll for changes in real time — if another user adds todos, you need to refresh the page to see them.

## Can I reorder todos?

Todos are displayed in the order they were created (most recent last by default). Manual reordering is not available in the current version.

## What information is shown for each todo?

Each todo shows its **title** and a **checkbox** indicating whether it is complete or active.

## What if the backend is down when the app loads?

The app displays an error toast notification and shows no todos. Refresh the page once the backend is running again.

## How many todos can the list show?

There is no pagination limit in the current version. All todos are loaded and displayed at once.
