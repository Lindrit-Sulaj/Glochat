'use client'
import React from 'react'
import signInWithGoogle from '@/firebase/auth/signInWIthGoogle'

export default function Login() {
  return (
    <div className='w-full h-screen flex justify-center items-center flex-col'>
      <h1 className='font-bold text-3xl'>Welcome to <span className='text-blue-300'>Glochat</span></h1>
      <button onClick={async () => await signInWithGoogle()} className='flex mt-4 items-center px-6 py-3 gap-2 border-solid border-[1px] border-neutral-700 hover:bg-neutral-800 hover:border-neutral-800'>
        <img className='w-5 h-5' src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/706px-Google_%22G%22_Logo.svg.png" alt="Google Logo" />
        <span className='font-medium'>Sign in with Google</span>
      </button>
    </div>
  )
}
