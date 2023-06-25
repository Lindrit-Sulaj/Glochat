'use client'
import { useAuth } from "./AuthContext"
import { Login, WriteMessage } from "@/components";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { useState, useEffect, useRef } from "react";
import { db } from "@/firebase";
import { collection, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { Message } from "@/components";

export default function Home() {
  const q = query(collection(db, "messages"), orderBy("sentAt"), limit(50));
  const user = useAuth();
  const [messages, setMessages] = useState<any>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let newDocs: {[key:string]: string}[] = [];
      snapshot.docs.map((document) => {
        newDocs.push(document.data());
      });
      setMessages(newDocs)
    });

    return () => unsubscribe()
  }, [])

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      alert(err);
    }
  }

  if (!user) {
    return (
      <Login />
    )
  }

  return (
    <main className='w-full max-w-xl mx-auto bg-neutral-950 min-h-screen overflow-auto'>
      <div className="bg-neutral-900 flex justify-between items-center h-[70px] px-4">
        <div className="flex gap-3 items-center">
          <img className="w-12 h-12 rounded-full" src={user?.photoURL} alt={user?.displayName} />
          <div>
            <h4 className="font-semibold text-lg">{user?.displayName}</h4>
            <p className="text-sm text-neutral-400">{user?.email}</p>
          </div>
        </div>
        <button onClick={handleSignOut} className="bg-neutral-700 px-4 hover:opacity-70 py-2">
          Log Out
        </button>
      </div>
      <div className="overflow-y-scroll h-[calc(100vh-130px)] px-4 pt-6 pb-3">
        {messages.map((message: any, index: number) => (
          <Message {...message} key={index} />
        ))}
      </div>
      <WriteMessage />
    </main>
  )
}
