'use client';
import { useEffect, useState } from 'react';

const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY;
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY;

export default function NotificationBtn() {
  const [permission, setPermission] = useState<string>();

  useEffect(() => {
    if (!('Notification' in window)) {
      console.log('This browser does not support desktop notification');
    } else {
      setPermission(Notification.permission);
    }
  }, []);

  const handleClick = async () => {
    if (Notification.permission === 'granted') {
      new Notification('테스트');
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(async (permission) => {
        setPermission(permission);
        if (permission === 'granted') {
          new Notification('Test notification');

          // Register the service worker
          const registration =
            await navigator.serviceWorker.register('/service-worker.js');

          console.log(registration);

          // Subscribe to push notifications
          const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(
              VAPID_PUBLIC_KEY as string
            ),
          });

          console.log(subscription);
        }
      });
    }
  };

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
  return (
    <div>
      <button
        className='rounded-lg bg-slate-50 px-5 py-2.5 text-sm font-medium text-slate-900 shadow-md active:bg-slate-200 dark:bg-slate-700 dark:text-white dark:active:bg-slate-600'
        onClick={handleClick}
      >
        알림 테스트
      </button>
    </div>
  );
}
