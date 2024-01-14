'use server';
import { revalidatePath } from 'next/cache';
import clientPromise from '../../../../util/db';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../pages/api/auth/[...nextauth]';

export default async function LowerWeight() {
  try {
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
    await db?.collection('trainingmaxes').updateMany(
      { email: userEmail },
      {
        $mul: {
          press: 0.9,
          squat: 0.9,
          bench: 0.9,
          deadLift: 0.9,
        },
      }
    );
  } catch (error) {
    console.error('중량 낮추기 에러입니다: ', error);
  }
  revalidatePath('/home');
  redirect('/home'); // try 문 안에 있으면 리디렉트 에러발생
}
