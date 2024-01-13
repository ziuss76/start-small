'use server';
import { revalidatePath } from 'next/cache';
import clientPromise from '../../../../util/db';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../pages/api/auth/[...nextauth]';

export default async function ResetWeight() {
  const session = await getServerSession(authOptions);
  interface UserInfo {
    user: {
      name: string;
      email: string;
      image: string;
    };
  }

  let userInfo: UserInfo | null = null;

  if (session) {
    userInfo = JSON.parse(JSON.stringify(session));
  }
  const userEmail = userInfo?.user.email;

  let db = (await clientPromise)?.db('StartSmall');
  await db?.collection('trainingmaxes').deleteMany({ email: userEmail });
  revalidatePath('/home');
  redirect('/home');
}
