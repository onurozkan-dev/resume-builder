import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let firebaseApp;
const isConfigValid = Object.values(firebaseConfig).every(Boolean);

try {
  if (isConfigValid) {
    firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
  } else {
    console.warn(
      "Firebase configuration is missing. Running in demo mode. Update your .env file to enable Firebase."
    );
  }
} catch (error) {
  console.error("Failed to initialize Firebase:", error);
}

export const auth = firebaseApp ? getAuth(firebaseApp) : null;
export const firebaseEnabled = Boolean(firebaseApp);
