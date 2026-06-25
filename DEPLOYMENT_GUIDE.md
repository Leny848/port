# Vercel Deployment Guide - Chukwuma Promise Portfolio v7

## The Real Problem (Why Blob Wasn't Working)
Vercel Blob has CDN caching issues. When you overwrite a blob, it can take up to 60 seconds to propagate. Also, `list()` and `del()` with `put()` have race conditions in serverless functions.

**v7 Solution:** We now use **Vercel Edge Config** — it's designed exactly for storing small JSON data. It updates instantly (no caching delay) and works perfectly with serverless functions.

---

## Step-by-Step Deployment

### Step 1: Connect Vercel Edge Config (CRITICAL)

1. Go to [vercel.com](https://vercel.com) -> Your Project
2. Click the **"Storage"** tab at the top
3. Click **"Connect Store"** -> Select **"Edge Config"**
4. Click **"Create"** to create a new Edge Config store
5. Vercel will **automatically** add the `EDGE_CONFIG` environment variable

### Step 2: Set Your Admin Password

1. In Vercel Dashboard -> **Settings** -> **Environment Variables**
2. Add:
   - **Name:** `ADMIN_PASSWORD`
   - **Value:** `YourSuperSecretPassword123`
3. Click **Save**

### Step 3: Upload This New Code

1. Download the v7 ZIP file
2. Extract it, open terminal in the folder
3. Run: `npm install` (this installs `@vercel/edge-config`)
4. Push to GitHub:
   ```bash
   git add .
   git commit -m "v7 - Using Vercel Edge Config for storage"
   git push origin main
   ```

### Step 4: Redeploy

Vercel will auto-deploy when you push.

### Step 5: Test

1. Visit `your-site.com/admin`
2. Enter your password
3. Add a project with an image
4. Go back to `your-site.com` -> Project appears **immediately**
5. Delete it -> It disappears **immediately**
6. Refresh the page -> Data is still there (permanent!)

---

## Important Notes

### Image Storage
Images are converted to **Base64** and stored inside Edge Config. Keep images under **2MB**.

### Edge Config Limits
- 100KB per item (enough for ~10-15 projects with images)
- Updates propagate in < 1 second globally
- Free tier: Unlimited reads, 100 writes/day

---

## Troubleshooting

**"Failed to fetch projects" error?**
-> You forgot to connect Vercel Edge Config. Go to Storage tab and create an Edge Config store.

**"Unauthorized" or "No token found" error?**
-> The Edge Config token wasn't added. Disconnect and reconnect Edge Config storage.

**Admin password not working?**
-> Make sure `ADMIN_PASSWORD` is set in Vercel Environment Variables.

**Projects not showing after adding?**
-> Check browser console (F12) for errors. The data should appear instantly with Edge Config.

---

## Pre-Launch Checklist

- [ ] Vercel Edge Config store created and connected
- [ ] `ADMIN_PASSWORD` environment variable set
- [ ] Code pushed to GitHub and deployed
- [ ] Tested adding a project in admin
- [ ] Verified project appears on main page instantly
- [ ] Tested deleting a project
- [ ] Refreshed page and confirmed data persists
