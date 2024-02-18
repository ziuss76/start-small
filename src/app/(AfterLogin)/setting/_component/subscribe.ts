'use server';
import { convertTo24HourFormat } from './convertTime';
import { getUserAndDb } from '@/app/_component/getUserAndDb';

export async function subscribe(
  subscription: any,
  newTime: { hours: string; minutes: string; ampm: string }
) {
  try {
    const { userInfo, db } = await getUserAndDb();
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
