"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import type { User } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user] = useState<User | null>({
    id: "mock-user-id",
    email: "seller@example.com",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    aud: "authenticated",
    role: "authenticated",
    email_confirmed_at: new Date().toISOString(),
    phone: undefined,
    confirmed_at: new Date().toISOString(),
    last_sign_in_at: new Date().toISOString(),
    app_metadata: {},
    user_metadata: {},
    identities: [],
    factors: [],
  } as User);
  const [loading] = useState(false);

  async function signOut() {
    // Mock signout - do nothing for now
    console.log("Mock signout");
  }

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
