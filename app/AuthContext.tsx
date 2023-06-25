'use client'
import { onAuthStateChanged } from 'firebase/auth'
import React, { useState, useEffect, useContext, createContext } from 'react'
import { auth } from '@/firebase';
import {useRouter} from 'next/navigation'

export const useAuth = () => useContext(AuthContext)
const AuthContext = createContext<any>(null)

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null)
      }

      setLoading(false);
      router.refresh();
    });

    return () => unsubscribe();
  }, [])
  
  return (
    <AuthContext.Provider value={user}>
      { children }
    </AuthContext.Provider>
  )
}
