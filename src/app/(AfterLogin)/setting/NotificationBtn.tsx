'use client';

import { useEffect, useState } from 'react';

export default function NotificationBtn() {
  const [permission, setPermission] = useState<string>();

  useEffect(() => {
    if (!('Notification' in window)) {
      console.log('This browser does not support desktop notification');
    } else {
      setPermission(Notification.permission);
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/public/service-worker.js');
      }
    }
  }, []);

  const showNotification = () => {
    Notification.requestPermission().then((result) => {
      if (result === 'granted') {
        navigator.serviceWorker.ready.then((registration) => {
          registration.showNotification('Vibration Sample', {
            body: 'Buzz! Buzz!',
            icon: '../images/touch/chrome-touch-icon-192x192.png',
            vibrate: [200, 100, 200, 100, 200, 100, 200],
          });
        });
      }
    });
  };

  const handleClick = async () => {
    if (Notification.permission === 'granted') {
      showNotification();
      console.log(permission);
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(async (permission) => {
        setPermission(permission);
        if (permission === 'granted') {
          showNotification();
        }
      });
    }
  };

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
