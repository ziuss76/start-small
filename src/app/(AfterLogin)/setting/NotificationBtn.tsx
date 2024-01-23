'use client';

import { useEffect, useState } from 'react';
import { Subscribe } from './Subscribe';

const NEXT_PUBLIC_VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

interface UserInfo {
  user: {
    name: string;
    email: string;
    image: string;
  };
}

export default function NotificationBtn({
  userInfo,
}: {
  userInfo: UserInfo | null;
}) {
  const [pushManager, setPushManager] = useState<PushManager | null>(null);

  const [applicationServerKey, setApplicationServerKey] =
    useState<Uint8Array | null>(null);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js');
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
      const response = await fetch(
        `/api/getSubscription?email=${userInfo?.user.email}`,
        {
          method: 'GET',
        }
      );
      const data = await response.json();

      if (data.error && data.error === 'No subscription found') {
        const newSubscription = await pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: applicationServerKey,
        });
        await Subscribe(newSubscription.toJSON());
        window.alert('알림이 생성되었습니다');
      } else {
        window.alert('이미 알림이 존재합니다.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnsubscribe = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `/api/unSubscribe?email=${userInfo?.user.email}`,
        {
          method: 'DELETE',
        }
      );
      if (!response.ok) {
        window.alert('삭제할 알림이 없습니다.');
        return;
      }
      const data = await response.json();
      window.alert('알림을 삭제했습니다.');
    } catch (error) {
      console.error(error);
      window.alert('알림 삭제에 실패했습니다.');
    }
  };

  const pushAlarm = async () => {
    const response = await fetch(
      `/api/getSubscription?email=${userInfo?.user.email}`
    );
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
      <form onSubmit={handleUnsubscribe}>
        <button
          type='submit'
          className='rounded-lg bg-slate-50 px-5 py-2.5 text-sm font-medium text-slate-900 shadow-md active:bg-slate-200 dark:bg-slate-700 dark:text-white dark:active:bg-slate-600'
        >
          구독 취소
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
