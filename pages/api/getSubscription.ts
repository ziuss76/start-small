import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/../util/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const db = (await clientPromise)?.db('StartSmall'); // 새로운 요청으로 새 인스턴스가 생성됨
    const collection = db?.collection('subscriptions'); // cache(getUserAndDb) 불러오기 불가능

    const { email } = req.query;

    const subscription = await collection?.findOne({ userEmail: email });

    if (subscription) {
      const { _id, userEmail, ...subscriptionWithoutIdandEmail } = subscription;
      res.status(200).json(subscriptionWithoutIdandEmail);
    } else {
      res.status(404).json({ error: 'No subscription found' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
