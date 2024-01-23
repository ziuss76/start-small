import { NextApiRequest, NextApiResponse } from 'next';
import webpush from 'web-push';

webpush.setVapidDetails(
  'mailto:ziuss76@gmail.com',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY as string,
  process.env.VAPID_PRIVATE_KEY as string
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const subscription = req.body;

    const payload = JSON.stringify({
      title: 'Hello!',
      body: 'Hello World!',
      icon: 'https://start-small-ziuss.vercel.app/icons/android-chrome-192x192.png',
    });

    try {
      await webpush.sendNotification(subscription, payload);
      res.status(200).json({ success: true });
      console.log('알림을 보내는데 성공했습니다.');
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: '서버가 알림을 보내는데 실패했습니다.' });
    }
  } else {
    res.status(405).json({ error: '잘못된 요청입니다.' });
  }
}
