# FAQ — React + TypeScript Frontend Scaffold (US-02)

## What URL does the frontend run on?

The dev server starts on **http://localhost:3000** by default.

## What Node version is required?

Node **18 or later** is recommended. Run `node --version` to check.

## How do I connect the frontend to the backend?

Set the `VITE_API_URL` environment variable. Create a `.env` file in the `frontend/` directory:

```
VITE_API_URL=http://localhost:8080
```

If the variable is not set, the frontend falls back to `http://localhost:8080` automatically.

## How do I run a production build?

```
npm run build
```

The output is placed in `frontend/dist/`. Serve it with any static file server.

## Can I run the frontend without the backend running?

Yes, the dev server will start, but API calls will fail and the app will show error states. Start the backend first for full functionality.

## Why does the browser show a blank page?

Make sure you ran `npm install` before `npm run dev`. If you see a white screen with no error, check the browser console for missing environment variables or import errors.

## How do I change the dev server port?

Update `vite.config.ts` to set a custom port:

```ts
server: {
  port: 4000
}
```

Then also update the backend's CORS allowed origins and set `VITE_API_URL` accordingly.

## Does the frontend have TypeScript strict mode enabled?

Yes. Run `npm run build` to catch type errors. The build fails on TypeScript errors by design.
