import webpush from 'web-push';

const publicVapidKey = process.env.VAPID_PUBLIC_KEY;
const privateVapidKey = process.env.VAPID_PRIVATE_KEY;

webpush.setVapidDetails(
  'mailto:ziuss76@gmail.com',
  publicVapidKey as string,
  privateVapidKey as string
);

let subscriptions = [];

export default function handler(req: any, res: any) {
  if (req.method === 'POST') {
    const subscription = req.body;
    subscriptions.push(subscription);
    res.status(201).json({});
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
