import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

/**
 * Adam branch used Create React App: `process.env.REACT_APP_*`.
 * Unified app uses Vite: `import.meta.env.VITE_FIREBASE_*`.
 * We accept both so an existing Adam `.env` keeps working (see vite.config envPrefix).
 */
const env = /** @type {Record<string, string | undefined>} */ (import.meta.env);

function pick(...keys) {
  for (const key of keys) {
    const v = env[key];
    if (typeof v === "string" && v.trim() !== "" && v !== "undefined") {
      return v.trim();
    }
  }
  return undefined;
}

const firebaseConfig = {
  apiKey: pick(
    "VITE_FIREBASE_API_KEY",
    "REACT_APP_FIREBASE_API_KEY",
    "REACT_APP_apiKey",
    "REACT_APP_API_KEY",
  ),
  authDomain: pick(
    "VITE_FIREBASE_AUTH_DOMAIN",
    "REACT_APP_FIREBASE_AUTH_DOMAIN",
    "REACT_APP_authDomain",
    "REACT_APP_AUTH_DOMAIN",
  ),
  projectId: pick(
    "VITE_FIREBASE_PROJECT_ID",
    "REACT_APP_FIREBASE_PROJECT_ID",
    "REACT_APP_projectId",
    "REACT_APP_PROJECT_ID",
  ),
  storageBucket: pick(
    "VITE_FIREBASE_STORAGE_BUCKET",
    "REACT_APP_FIREBASE_STORAGE_BUCKET",
    "REACT_APP_storageBucket",
    "REACT_APP_STORAGE_BUCKET",
  ),
  messagingSenderId: pick(
    "VITE_FIREBASE_MESSAGING_SENDER_ID",
    "REACT_APP_FIREBASE_MESSAGING_SENDER_ID",
    "REACT_APP_messagingSenderId",
    "REACT_APP_MESSAGING_SENDER_ID",
  ),
  appId: pick(
    "VITE_FIREBASE_APP_ID",
    "REACT_APP_FIREBASE_APP_ID",
    "REACT_APP_appId",
    "REACT_APP_APP_ID",
  ),
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId &&
    firebaseConfig.appId,
);

let auth = null;
let provider = null;

if (isFirebaseConfigured) {
  const app =
    getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  auth = getAuth(app);
  provider = new GoogleAuthProvider();
}

export { auth, provider, signInWithPopup };
