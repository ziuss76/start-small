'use client';

import { useEffect, useState } from 'react';
import { Subscribe } from './Subscribe';

const NEXT_PUBLIC_VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

export default function NotificationBtn() {
  const [pushManager, setPushManager] = useState<PushManager | null>(null);

  const [applicationServerKey, setApplicationServerKey] =
    useState<Uint8Array | null>(null);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        setPushManager(registration.pushManager);
      });
    }

    function urlBase64ToUint8Array(base64String: string) {
      const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
      const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

      const rawData = window.atob(base64);
      const outputArray = new Uint8Array(rawData.length);

      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
      }
      return outputArray;
    }

    setApplicationServerKey(
      urlBase64ToUint8Array(NEXT_PUBLIC_VAPID_PUBLIC_KEY ?? '')
    );
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!pushManager) {
      console.log('Push Manager is not available.');
      return;
    }
    try {
      const newSubscription = await pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey,
      });
      console.log('이제 알림 구독중 입니다.');
      await Subscribe(newSubscription.toJSON());
    } catch (error) {
      console.error(error);
    }
  };

  const pushAlarm = async () => {
    const response = await fetch('/api/getSubscription');
    const subscription = await response.json();

    if (subscription) {
      await fetch('/api/sendNotification', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  };

  return (
    <div className='flex'>
      <form onSubmit={handleSubmit}>
        <button
          type='submit'
          className='rounded-lg bg-slate-50 px-5 py-2.5 text-sm font-medium text-slate-900 shadow-md active:bg-slate-200 dark:bg-slate-700 dark:text-white dark:active:bg-slate-600'
        >
          구독 테스트
        </button>
      </form>
      <button
        onClick={pushAlarm}
        className='rounded-lg bg-slate-50 px-5 py-2.5 text-sm font-medium text-slate-900 shadow-md active:bg-slate-200 dark:bg-slate-700 dark:text-white dark:active:bg-slate-600'
      >
        알림 테스트
      </button>
    </div>
  );
}
