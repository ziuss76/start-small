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
      notification: {
        title: 'Hello!',
        body: 'Hello World!',
      },
    });

    try {
      await webpush.sendNotification(subscription, payload);
      res.status(200).json({ success: true });
      console.log('Notification sent');
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to send notification' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
