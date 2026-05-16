/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FIREBASE_API_KEY?: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN?: string;
  readonly VITE_FIREBASE_PROJECT_ID?: string;
  readonly VITE_FIREBASE_STORAGE_BUCKET?: string;
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID?: string;
  readonly VITE_FIREBASE_APP_ID?: string;
  /** Legacy CRA (Adam branch) — still supported when envPrefix includes REACT_APP_ */
  readonly REACT_APP_FIREBASE_API_KEY?: string;
  readonly REACT_APP_FIREBASE_AUTH_DOMAIN?: string;
  readonly REACT_APP_FIREBASE_PROJECT_ID?: string;
  readonly REACT_APP_FIREBASE_STORAGE_BUCKET?: string;
  readonly REACT_APP_FIREBASE_MESSAGING_SENDER_ID?: string;
  readonly REACT_APP_FIREBASE_APP_ID?: string;
  readonly REACT_APP_API_KEY?: string;
  readonly REACT_APP_AUTH_DOMAIN?: string;
  readonly REACT_APP_PROJECT_ID?: string;
  readonly REACT_APP_STORAGE_BUCKET?: string;
  readonly REACT_APP_MESSAGING_SENDER_ID?: string;
  readonly REACT_APP_APP_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
