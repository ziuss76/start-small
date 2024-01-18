'use server';
import clientPromise from '@/../util/db';

export async function Subscribe(subscription: any) {
  try {
    let db = (await clientPromise)?.db('StartSmall');
    const collection = db?.collection('subscriptions');

    await collection?.createIndex({ 'keys.auth': 1 }, { unique: true });
    // 구독정보 중복 방지

    await collection?.insertOne(subscription);
  } catch (err) {
    console.error(err);
    return;
  }
}
