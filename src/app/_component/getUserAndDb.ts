import clientPromise from '@/../util/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/../pages/api/auth/[...nextauth]';
import { cache } from 'react';

interface UserInfo {
  user: {
    name: string;
    email: string;
    image: string;
  };
}

export const getUserAndDb = cache(async () => {
  const session = await getServerSession(authOptions);
  let userInfo: UserInfo | null = null;

  if (session) {
    userInfo = JSON.parse(JSON.stringify(session));
  }
  let db = (await clientPromise)?.db('StartSmall');

  return { userInfo, db };
});
