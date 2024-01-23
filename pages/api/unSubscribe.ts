import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/../util/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'DELETE') {
    const db = (await clientPromise)?.db('StartSmall');
    const collection = db?.collection('subscriptions');

    const { email } = req.query;

    const result = await collection?.deleteOne({ userEmail: email });

    if (result?.deletedCount > 0) {
      res.status(200).json({ message: '알림이 삭제되었습니다.' });
    } else {
      res.status(404).json({ error: '삭제할 알림이 존재하지 않습니다.' });
    }
  } else {
    res.status(405).json({ error: '잘못된 요청입니다.' });
  }
}
