# CalcHub AI – Deployment Guide

## 1. Deploying Frontend on Vercel
1. Push project repository to GitHub.
2. Connect Vercel to repository and set Root Directory to `frontend`.
3. Build Command: `npm run build`
4. Output Directory: `dist`

## 2. Deploying Backend on Render
1. Create a Web Service on Render pointing to repository.
2. Set Root Directory to `backend`.
3. Build Command: `npm install`
4. Start Command: `node server.js`
5. Add Environment Variables:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `GEMINI_API_KEY`
   - `NODE_ENV=production`

## 3. MongoDB Atlas
1. Create a MongoDB Atlas cluster.
2. Whitelist Render IP addresses or allow `0.0.0.0/0`.
3. Obtain connection string and place into `MONGO_URI`.
