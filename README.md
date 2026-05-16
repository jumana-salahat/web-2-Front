# FitGenie (unified)

Single Vite + React app combining work from the `naseem`, `lina11`, `jomana`, `birawi`, and `Adam` branches.

## Setup

```bash
npm install
npm run dev
```

## Routes

| Path | Description |
|------|-------------|
| `/` | Home |
| `/payment` | Payment methods |
| `/offers` | Offers selection (from lina11) |
| `/information` | User information / plan intake (from jomana) |
| `/metrics` | Metrics dashboard (birawi-style dashboard) |
| `/plan` | Placeholder after plan generation redirect |
| `/signin` | Google sign-in (Firebase; from Adam) |
| `/signup` | Google sign-up (Firebase; from Adam) |

## Environment (Firebase)

Vite reads variables from `.env` at the project root. **Adam’s CRA app used `REACT_APP_*` names**; this repo supports **both** those and **`VITE_FIREBASE_*`** (see `src/lib/firebase.js`).

**Quick start:** copy the template and add your Firebase values (same names as on Adam):

```bash
cp .env.example .env
# edit .env, then restart: npm run dev
```

Adam’s `firebase.js` (unchanged names) expects:

```bash
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

**Option B — same names as Adam / Create React App**

```bash
REACT_APP_FIREBASE_API_KEY=...
REACT_APP_FIREBASE_AUTH_DOMAIN=...
REACT_APP_FIREBASE_PROJECT_ID=...
REACT_APP_FIREBASE_STORAGE_BUCKET=...
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=...
REACT_APP_FIREBASE_APP_ID=...
```

Some tutorials use shorter names (`REACT_APP_API_KEY`, etc.) — those are supported too.

After changing `.env`, **restart** `npm run dev`. In the Firebase console, add **`localhost`** (and your dev port if needed) under **Authentication → Settings → Authorized domains**.

## Build

```bash
npm run build
```
