'use client';
import { signIn } from 'next-auth/react';
import { useEffect } from 'react';

export default function LoginBtn() {
  useEffect(() => {
    signIn();
  }, []);

  return (
    <div className='flex h-[100dvh] w-[100dvw] items-center justify-center'>
      <div>잠시만 기다려주세요...</div>
    </div>
  );
}
