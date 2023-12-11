'use client';
import { signIn } from 'next-auth/react';

type SessionProp = {
  user: {
    name: string;
    email: string;
    image: string;
  };
};

export default function LoginButton({ session }: { session: SessionProp }) {
  return (
    <button
      type='button'
      className='rounded-lg bg-slate-50 px-5 py-2.5 text-sm font-medium text-slate-900 hover:bg-slate-200'
      onClick={() => signIn()}
    >
      로그인
    </button>
  );
}
