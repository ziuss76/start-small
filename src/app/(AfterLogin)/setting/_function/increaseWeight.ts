'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getUserAndDb } from '@/app/_function/getUserAndDb';

export default async function increaseWeight(
  training: string,
  curDate: string
) {
  try {
    const { userInfo, db } = await getUserAndDb();
    const userEmail = userInfo?.user.email;

    const trainingMap: { [key: string]: number } = {
      press: 2.5,
      squat: 5,
      bench: 2.5,
      deadLift: 5,
    };

    const currentWeights = await db
      ?.collection('trainingmaxes')
      .find({ email: userEmail })
      .sort({ date: -1 })
      .limit(1)
      .toArray();

    const { _id, ...latestWeights } = currentWeights[0];

    let weightsToUpdate: { [key: string]: any } = {};

    if (training === '전체 종목') {
      for (const key in trainingMap) {
        weightsToUpdate[key] = latestWeights[key] + trainingMap[key];
      }
      weightsToUpdate['email'] = userEmail;
      weightsToUpdate['date'] = curDate;
      await updateOrInsertData(db, userEmail!, curDate, weightsToUpdate);
    } else {
      const updatedWeights = {
        ...latestWeights,
        [training]: latestWeights[training] + trainingMap[training],
        date: curDate,
      };
      await updateOrInsertData(db, userEmail!, curDate, updatedWeights);
    }
  } catch (error) {
    console.error('중량 올리기 에러입니다: ', error);
  }
  revalidatePath('/graph/press');
  redirect('/graph/press'); // try 문 안에 있으면 리디렉트 에러발생
}

async function updateOrInsertData(
  db: any,
  userEmail: string,
  curDate: string,
  data: any
) {
  const existingData = await db
    ?.collection('trainingmaxes')
    .findOne({ email: userEmail, date: curDate });
  if (existingData) {
    // 동일 날짜 데이터가 있으면 update
    await db
      ?.collection('trainingmaxes')
      .updateOne({ email: userEmail, date: curDate }, { $set: data });
  } else {
    // 없으면 insert
    await db?.collection('trainingmaxes').insertOne(data);
  }
}
