# Troubleshooting — React + TypeScript Frontend Scaffold (US-02)

## Dev server fails to start: "ENOENT: no such file or directory"

**Symptom:** Running `npm run dev` fails immediately.

**Cause:** Dependencies are not installed.

**Fix:**
```bash
cd frontend
npm install
npm run dev
```

---

## Blank page at http://localhost:3000

**Symptom:** The browser shows a white page with no content or errors.

**Cause:** Often a JavaScript runtime error or missing environment variable.

**Fix:**
1. Open browser DevTools → Console tab.
2. Look for red error messages.
3. Ensure `VITE_API_URL` is set in `frontend/.env` if you changed the backend port.

---

## Port 3000 already in use

**Symptom:** `Error: Port 3000 is already in use`.

**Fix:** Change the port in `vite.config.ts`:
```ts
server: { port: 4000 }
```
Or kill the process using port 3000:
```bash
lsof -i :3000
kill -9 <PID>
```

---

## TypeScript build errors

**Symptom:** `npm run build` fails with TypeScript errors.

**Fix:** Run `npm run build` and read the error messages carefully. They show file name, line number, and description. Fix the reported type issues before deploying.

---

## API requests fail with "Failed to fetch"

**Symptom:** The app loads but shows error toasts on every action.

**Cause:** The backend is not running or `VITE_API_URL` points to the wrong address.

**Fix:**
1. Start the backend: `cd backend && go run ./...`
2. Check `frontend/.env` has the correct backend URL.
3. Restart the dev server after changing `.env`.

---

## Hot reload not working

**Symptom:** Saving a file does not update the browser.

**Fix:**
1. Check the terminal for Vite errors.
2. Restart the dev server with `Ctrl+C` then `npm run dev`.
3. On some systems, increase the file watcher limit:
```bash
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```
