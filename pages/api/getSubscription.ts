import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/../util/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const db = (await clientPromise)?.db('StartSmall');
    const collection = db?.collection('subscriptions');

    const subscription = await collection?.findOne({}); // get the first subscription

    if (subscription) {
      const { _id, ...subscriptionWithoutId } = subscription;
      res.status(200).json(subscriptionWithoutId);
    } else {
      res.status(404).json({ error: 'No subscription found' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
