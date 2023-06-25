import React from 'react'
import { useAuth } from '@/app/AuthContext'

export default function Message({ photoURL, displayName, text, sentAt, uid }: any) {
  const user = useAuth();

  const sentByCurrentUser = uid === user.uid

  return (
    <div className={`flex max-w-[70%] mt-2 gap-2 items-start ${sentByCurrentUser && 'justify-start flex-row-reverse ml-auto'}`}>
      <img className='w-8 h-8 rounded-full' src={photoURL} alt={displayName} />
      <p className={`px-3 ${sentByCurrentUser ? 'bg-blue-500' : 'bg-neutral-800'} py-[6px] rounded-lg`}>{text}</p>
    </div>
  )
}
