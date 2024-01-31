'use server';
import { revalidatePath } from 'next/cache';
import clientPromise from '../../../../util/db';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../pages/api/auth/[...nextauth]';

export default async function IncreaseWeight(
  training: string,
  curDate: string
) {
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
      press: 2.5,
      squat: 5,
      bench: 2.5,
      deadLift: 5,
    };

    let dataToInsert: { [key: string]: any } = {};

    if (training === '전체 종목') {
      const currentWeights = await db
        ?.collection('trainingmaxes')
        .find({ email: userEmail })
        .sort({ date: -1 })
        .limit(1)
        .toArray();
      const latestWeights = currentWeights[0];
      for (const key in trainingMap) {
        dataToInsert[key] = latestWeights[key] + trainingMap[key];
      }
      dataToInsert['email'] = userEmail;
      dataToInsert['date'] = curDate;

      const existingData = await db
        ?.collection('trainingmaxes')
        .findOne({ email: userEmail, date: curDate });
      if (existingData) {
        await db
          ?.collection('trainingmaxes')
          .updateOne(
            { email: userEmail, date: curDate },
            { $set: dataToInsert }
          );
      } else {
        await db?.collection('trainingmaxes').insertOne(dataToInsert);
      }
    } else {
      const currentWeights = await db
        ?.collection('trainingmaxes')
        .find({ email: userEmail })
        .sort({ date: -1 })
        .limit(1)
        .toArray();
      const { _id, ...latestWeights } = currentWeights[0];
      const updatedWeights = {
        ...latestWeights,
        [training]: latestWeights[training] + trainingMap[training],
        date: curDate,
      };

      const existingData = await db
        ?.collection('trainingmaxes')
        .findOne({ email: userEmail, date: curDate });
      if (existingData) {
        await db
          ?.collection('trainingmaxes')
          .updateOne(
            { email: userEmail, date: curDate },
            { $set: updatedWeights }
          );
      } else {
        await db?.collection('trainingmaxes').insertOne(updatedWeights);
      }
    }
  } catch (error) {
    console.error('중량 올리기 에러입니다: ', error);
  }
  revalidatePath('/home');
  redirect('/home'); // try 문 안에 있으면 리디렉트 에러발생
}
