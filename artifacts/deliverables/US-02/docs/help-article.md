# Setting Up the React Frontend

This guide walks you through running the Todo App frontend for the first time.

---

## Before You Start

- Node.js 18 or later installed (`node --version`)
- The backend server running on port 8080 (see [Setting Up the Backend](../US-01/docs/help-article.md))
- The `frontend/` directory cloned to your machine

---

## Start the Dev Server

### Step 1: Navigate to the frontend folder

Open a terminal and go to the `frontend/` directory.

### Step 2: Install dependencies

```
npm install
```

### Step 3: Start the dev server

```
npm run dev
```

You should see:

```
  VITE  Local:   http://localhost:3000/
```

### Step 4: Open the app

Open `http://localhost:3000` in your browser. You should see the **Todo App** title.

---

## Configuration

If your backend runs on a different port, set `VITE_API_URL`:

Create a `.env.local` file in the `frontend/` directory:

```
VITE_API_URL=http://localhost:9090
```

Restart the dev server after saving this file.

---

## Build for Production

```
npm run build
```

Output is placed in `frontend/dist/`. Serve with any static file server.

---

## In-App Copy Suggestions

| Location | Suggested Text |
|----------|----------------|
| Page title | `Todo App` |
| Browser tab | `Todo App` |
| Loading state | `Loading...` |

---

## Troubleshooting

### Port 3000 already in use

**Problem:** The dev server fails to start on port 3000.

**Solution:** Change the port in `vite.config.ts`:
```ts
server: { port: 3001 }
```

### "Cannot connect to backend" errors

**Problem:** API calls fail on page load.

**Solution:**
1. Make sure the backend is running on port 8080
2. Check `VITE_API_URL` matches your backend address
3. Reload the page

### TypeScript errors during build

**Problem:** `npm run build` fails with type errors.

**Solution:** Run `npm run build` and fix each error reported. No `any` types are allowed.

---

## Related Articles

- [Setting Up the Backend](../US-01/docs/help-article.md)
- [Creating Your First Todo](../US-03/docs/help-article.md)
