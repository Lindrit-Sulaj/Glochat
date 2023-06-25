'use client'
import { onAuthStateChanged } from 'firebase/auth'
import React, { useState, useEffect, useContext, createContext } from 'react'
import { auth } from '@/firebase';

export const useAuth = () => useContext(AuthContext)
const AuthContext = createContext<any>(null)

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null)
      }
    });

    return () => unsubscribe();
  }, [])
  
  return (
    <AuthContext.Provider value={user}>
      { children }
    </AuthContext.Provider>
  )
}
