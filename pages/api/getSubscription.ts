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

    const subscription = await collection?.findOne(
      { userEmail: email },
      { projection: { endpoint: 1, keys: 1, alarmTime: 1 } }
    );

    if (subscription) {
      res.status(200).json(subscription);
    } else {
      res.status(404).json({ error: 'No subscription found' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

// 동일한 프로젝션에서 포함(inclusion)과 제외(exclusion)를 동시에 사용할 수 없음
// _id 필드는 예외적으로 제외할 수 있지만, 그 외의 필드는 포함과 제외를 동시에 사용할 수 없음
// 따라서 위처럼 필요한 필드만 포함하도록 수정
