'use client';
import { signOut } from 'next-auth/react';
import Image from 'next/image';

interface UserInfo {
  user: {
    name: string;
    email: string;
    image: string;
  };
}

export default function LogoutBtn({ userInfo }: { userInfo: UserInfo | null }) {
  const userImage = userInfo?.user?.image || '/favicon.ico';

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
      <Image
        src={userImage}
        className='mr-1 inline-block'
        alt='userImg'
        width={18}
        height={18}
      />
      <p>{userInfo?.user.name} 로그아웃</p>
    </button>
  );
}
