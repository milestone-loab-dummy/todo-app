# FAQ — Loading & Error States (US-11)

## What is the skeleton loader?

When the app first opens, it fetches todos from the backend. During this time, animated placeholder cards are shown in the list to indicate loading is in progress.

## What is a toast notification?

A toast is a small message that appears briefly in the corner of the screen to inform you of a success or error. It disappears automatically after 4 seconds.

## Why do I see a toast error?

A toast error means an API request failed. Common causes: the backend is not running, a network issue occurred, or the request timed out. Check that the backend server is running on port 8080.

## Can I dismiss a toast manually?

Yes. Click the × on the toast to dismiss it immediately without waiting for the 4-second timer.

## Why is my button greyed out?

Buttons are disabled while an API request is in flight. This prevents duplicate requests (e.g., double-submitting a todo). The button re-enables once the request completes.

## What happens if a request times out?

A toast error notification appears. The action (create, update, delete) is not applied. Try the action again.

## Do errors affect other todos in the list?

No. A failed request on one todo does not affect the rest of the list.

## How long does the skeleton loader show?

The skeleton shows until the `GET /todos` request completes. On a local network this is typically under one second. If it persists, check that the backend is running.
