'use client';
import { signOut } from 'next-auth/react';

interface UserInfo {
  user: {
    name: string;
    email: string;
    image: string;
  };
}

export default function LogoutBtn({ userInfo }: { userInfo: UserInfo | null }) {
  return (
    <button
      type='submit'
      className='flex rounded-lg bg-slate-700 px-5 py-2.5 text-sm font-medium text-white shadow-md hover:bg-slate-600'
      onClick={() => {
        if (window.confirm('로그아웃 하시겠습니까?')) {
          signOut();
        }
      }}
    >
      <img
        src={userInfo?.user.image}
        className='mr-1 inline-block h-[1.2rem] w-[1.2rem]'
      />
      <p>{userInfo?.user.name} 로그아웃</p>
    </button>
  );
}
