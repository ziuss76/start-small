'use client';

import { useEffect, useState } from 'react';

export default function SettingPage() {
  const [permission, setPermission] = useState(Notification.permission);

  useEffect(() => {
    if (!('Notification' in window)) {
      console.log('This browser does not support desktop notification');
    }
  }, []);

  const handleClick = () => {
    if (Notification.permission === 'granted') {
      new Notification('Test notification');
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        setPermission(permission);
        if (permission === 'granted') {
          new Notification('Test notification');
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
