import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/../util/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'DELETE') {
    const db = (await clientPromise)?.db('StartSmall'); // 새로운 요청으로 새 인스턴스가 생성됨
    const collection = db?.collection('subscriptions'); // cache(getUserAndDb) 불러오기 불가능

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
