'use server';
import clientPromise from '@/../util/db';
import { authOptions } from '../../../../pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { convertTo24HourFormat } from './ConvertTime';

export async function Subscribe(
  subscription: any,
  newTime: { hours: string; minutes: string; ampm: string }
) {
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

  try {
    let db = (await clientPromise)?.db('StartSmall');
    const collection = db?.collection('subscriptions');

    await collection?.createIndex({ 'keys.auth': 1 }, { unique: true });
    // 구독정보 중복 방지

    if (userInfo) {
      subscription.userEmail = userInfo.user.email;
      subscription.alarmTime = convertTo24HourFormat(
        newTime.hours,
        newTime.minutes,
        newTime.ampm
      );
    }

    await collection?.insertOne(subscription);
  } catch (err) {
    console.error(err);
    return;
  }
}
