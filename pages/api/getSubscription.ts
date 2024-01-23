import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/../util/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const db = (await clientPromise)?.db('StartSmall');
    const collection = db?.collection('subscriptions');

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
