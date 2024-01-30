'use server';
import { revalidatePath } from 'next/cache';
import clientPromise from '../../../../util/db';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../pages/api/auth/[...nextauth]';

export default async function IncreaseWeight(training: string) {
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

    const trainingMap: { [key: string]: number } = {
      프레스: 2.5,
      스쿼트: 5,
      벤치: 2.5,
      데드: 5,
    };

    const fieldMap: { [key: string]: string } = {
      프레스: 'press',
      스쿼트: 'squat',
      벤치: 'bench',
      데드: 'deadLift',
    };

    await db?.collection('trainingmaxes').updateMany(
      { email: userEmail },
      {
        $inc: {
          [fieldMap[training]]: trainingMap[training],
        },
      }
    );
  } catch (error) {
    console.error('중량 낮추기 에러입니다: ', error);
  }
  revalidatePath('/home');
  redirect('/home'); // try 문 안에 있으면 리디렉트 에러발생
}
