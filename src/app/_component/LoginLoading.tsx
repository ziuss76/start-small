'use client';
import { signIn } from 'next-auth/react';
import { useEffect } from 'react';

export default function LoginLoading() {
  useEffect(() => {
    signIn();
  }, []);

  return (
    <div className='flex h-[100dvh] w-[100dvw] items-center justify-center'>
      <div className='flex'>
        <p>잠시만 기다려주세요...</p>
      </div>
    </div>
  );
}
