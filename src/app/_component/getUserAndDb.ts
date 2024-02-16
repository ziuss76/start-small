import clientPromise from '@/../util/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/routes';

interface UserInfo {
  user: {
    name: string;
    email: string;
    image: string;
  };
}

export const getUserAndDb = async () => {
  const session = await getServerSession(authOptions);
  let userInfo: UserInfo | null = null;

  if (session) {
    userInfo = JSON.parse(JSON.stringify(session));
  }
  let db = (await clientPromise)?.db('StartSmall');

  return { userInfo, db };
};
