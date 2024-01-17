'use client';
import { useEffect, useState } from 'react';

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
      new Notification('제목', { body: '내용', icon: '/favicon.ico' });
      console.log(permission);
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(async (permission) => {
        setPermission(permission);
        if (permission === 'granted') {
          new Notification('제목', { body: '내용', icon: '/favicon.ico' });
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
