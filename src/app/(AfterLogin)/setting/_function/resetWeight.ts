'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getUserAndDb } from '@/app/_function/getUserAndDb';

export default async function resetWeight() {
  try {
    const { userInfo, db } = await getUserAndDb();
    const userEmail = userInfo?.user.email;

    await db?.collection('trainingmaxes').deleteMany({ email: userEmail });
  } catch (error) {
    console.error('중량 리셋 에러입니다: ', error);
  }
  revalidatePath('/home');
  redirect('/home'); // try 문 안에 있으면 리디렉트 에러발생
}
