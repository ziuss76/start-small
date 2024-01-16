'use client';
import { signIn } from 'next-auth/react';
import { useEffect } from 'react';
import favicon from 'public/icons/favicon.ico';
import Image from 'next/image';

export default function LoginLoading() {
  useEffect(() => {
    signIn();
  }, []);

  return (
    <div className='flex h-[100dvh] w-[100dvw] items-center justify-center'>
      <div className='flex'>
        <p>잠시만 기다려주세요...</p>
        <Image
          src={favicon}
          className='ml-1 inline-block'
          alt='거북이'
          width={25}
          height={25}
        />
      </div>
    </div>
  );
}
