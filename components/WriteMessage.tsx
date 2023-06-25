'use client'
import React, { useState } from 'react'
import { useAuth } from '@/app/AuthContext';
import createMessage from '@/firebase/db/createMessage';

export default function WriteMessage() {
  const user = useAuth();
  const [text, setText] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const res = await createMessage({ text, photoURL: user.photoURL, displayName: user.displayName, uid: user.uid});
    console.log(res);
  }

  return (
    <form className="h-[60px] bg-neutral-800 w-full flex" onSubmit={(e) => handleSubmit(e)}>
      <input value={text} onChange={(e) => setText(e.target.value)} type="text" className='h-full grow bg-transparent outline-none px-5' placeholder='Write a message' />
      <button className='px-4 bg-blue-600 hover:bg-blue-700'>Submit</button>
    </form>
  )
}
