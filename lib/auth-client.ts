import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000",
  fetchOptions: {
    onRequest: (context) => {
      return {
        ...context,
        headers: {
          ...context.headers,
        },
      };
    },
    onResponse: (context) => {
      return context;
    },
  },
  storage: {
    get: (key) => {
      if (typeof window === "undefined") return null;
      return localStorage.getItem(key);
    },
    set: (key, value) => {
      if (typeof window === "undefined") return;
      localStorage.setItem(key, value);
    },
    remove: (key) => {
      if (typeof window === "undefined") return;
      localStorage.removeItem(key);
    },
  },
});

export const { signIn, signUp, signOut, useSession } = authClient;
