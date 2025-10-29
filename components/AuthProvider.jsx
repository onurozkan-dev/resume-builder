"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebaseClient";

const AuthContext = createContext({
  user: null,
  loading: true,
  authEnabled: false,
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const authEnabled = Boolean(auth);

  useEffect(() => {
    if (!authEnabled) {
      console.warn(
        "Firebase configuration is missing. Check your .env file and refresh the page."
      );
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [authEnabled]);

  return (
    <AuthContext.Provider value={{ user, loading, authEnabled }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
