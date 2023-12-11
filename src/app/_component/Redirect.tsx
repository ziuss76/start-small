'use client';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';

export type SessionProp = {
  user: {
    name: string;
    email: string;
    image: string;
  };
};

export default function Redirect({ session }: { session: SessionProp }) {
  useEffect(() => {
    if (session) {
      redirect('/home');
    }
  }, []);
  return <></>;
}
