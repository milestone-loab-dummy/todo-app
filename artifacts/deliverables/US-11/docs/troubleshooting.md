# Troubleshooting — Loading & Error States (US-11)

## Skeleton loader never goes away

**Symptom:** The skeleton animation plays indefinitely and no todos appear.

**Cause:** The `GET /todos` request is not completing (backend unreachable or request hanging).

**Fix:**
1. Check the backend is running: `curl http://localhost:8080/health`
2. Open browser DevTools → Network tab and look for the `todos` request status.
3. Verify `VITE_API_URL` in `frontend/.env` is correct.
4. Restart both frontend and backend.

---

## Toast notifications don't appear

**Symptom:** API calls fail silently — no visual feedback.

**Cause:** Toast rendering may be broken due to a component error.

**Fix:**
1. Check the browser console for React errors.
2. Refresh the page.
3. Verify `Toast.tsx` is imported and rendered in `App.tsx`.

---

## Toast appears but doesn't auto-dismiss

**Symptom:** The error toast stays on screen longer than 4 seconds.

**Cause:** The auto-dismiss timer may not be firing (rare browser tab focus issue).

**Fix:** Click the × on the toast to dismiss it manually. This is a cosmetic issue and does not affect functionality.

---

## Button stays disabled after a request completes

**Symptom:** A button remains greyed out and unclickable after the action finishes.

**Cause:** The loading state was not cleared — likely a frontend bug.

**Fix:** Refresh the page. If this happens consistently, check the browser console for unhandled promise rejections that prevent the loading state from resetting.

---

## Multiple error toasts stacking up

**Symptom:** Several toast notifications appear at once.

**Cause:** Multiple API requests failed in rapid succession.

**Fix:** Fix the underlying connectivity issue (start the backend). Dismiss all toasts with individual × buttons.

---

## No error shown but action didn't work

**Symptom:** No toast appeared but the create/update/delete didn't happen.

**Cause:** The request may have succeeded at the network level but returned a non-error status with an unexpected body.

**Fix:**
1. Check browser DevTools → Network tab for the request/response.
2. Check backend logs for the corresponding request.
3. Verify the backend returned the expected status code.
