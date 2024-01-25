'use client';

import { useEffect, useState } from 'react';
import { Subscribe } from './Subscribe';
import TimePicker from './TimePicker';

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
  const [newTime, setNewTime] = useState({
    hours: '1',
    minutes: '0',
    ampm: 'am',
  });
  const [alarmTime, setAlarmTime] = useState({
    hours: '1',
    minutes: '0',
    ampm: 'am',
  });
  const [isAlarmSet, setIsAlarmSet] = useState(false);

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

  function convertTo12HourFormat(time: string): {
    hours: string;
    minutes: string;
    ampm: string;
  } {
    const [hours24, minutes] = time.split(':');
    let hours = parseInt(hours24);
    let ampm = 'am';

    if (hours === 0) {
      hours = 12;
    } else if (hours === 12) {
      ampm = 'pm';
    } else if (hours > 12) {
      hours -= 12;
      ampm = 'pm';
    }

    return {
      hours: hours.toString(),
      minutes,
      ampm,
    };
  }

  useEffect(() => {
    const checkExistingAlarm = async () => {
      try {
        const response = await fetch(
          `/api/getSubscription?email=${userInfo?.user.email}`,
          {
            method: 'GET',
          }
        );
        const data = await response.json();

        if (data.error && data.error === 'No subscription found') {
          setIsAlarmSet(false);
        } else {
          setIsAlarmSet(true);
          setAlarmTime(convertTo12HourFormat(data.alarmTime));
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkExistingAlarm();
  }, [isAlarmSet]);

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
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
        await Subscribe(newSubscription.toJSON(), newTime);
        window.alert('알림이 생성되었습니다');
      } else {
        window.alert('이미 알림이 존재합니다.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnsubscribe = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
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
      window.alert('알림을 삭제했습니다.');
    } catch (error) {
      console.error(error);
      window.alert('알림 삭제에 실패했습니다.');
    }
  };

  // const pushAlarm = async (e: React.FormEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   const response = await fetch(
  //     `/api/getSubscription?email=${userInfo?.user.email}`
  //   );
  //   const subscription = await response.json();

  //   if (subscription) {
  //     await fetch('/api/sendNotification', {
  //       method: 'POST',
  //       body: JSON.stringify(subscription),
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });
  //   }
  // };
  const handleTimeChange = (newTime: {
    hours: string;
    minutes: string;
    ampm: string;
  }) => {
    setNewTime(newTime);
  };

  return (
    <div className='flex'>
      <button className='rounded-lg bg-slate-50 px-5 py-2.5 text-sm font-medium text-slate-900 shadow-md active:bg-slate-200 dark:bg-slate-700 dark:text-white dark:active:bg-slate-600'>
        ⏱️ 알림 설정
      </button>
      <TimePicker
        onTimeChange={handleTimeChange}
        disabled={isAlarmSet}
        time={alarmTime}
      />
      <button
        type='submit'
        onClick={(e) => handleSubmit(e)}
        className='ml-2 rounded-lg bg-slate-50 px-5 py-2.5 text-sm font-medium text-slate-900 shadow-md active:bg-slate-200 dark:bg-slate-700 dark:text-white dark:active:bg-slate-600'
      >
        생성
      </button>

      <button
        type='submit'
        onClick={(e) => handleUnsubscribe(e)}
        className='rounded-lg bg-slate-50 px-5 py-2.5 text-sm font-medium text-slate-900 shadow-md active:bg-slate-200 dark:bg-slate-700 dark:text-white dark:active:bg-slate-600'
      >
        ⏱️ 알림 삭제
      </button>

      {/* <button
        type='submit'
        className='rounded-lg bg-slate-50 px-5 py-2.5 text-sm font-medium text-slate-900 shadow-md active:bg-slate-200 dark:bg-slate-700 dark:text-white dark:active:bg-slate-600'
        onClick={(e) => pushAlarm(e)}
      >
        알림 테스트
      </button> */}
    </div>
  );
}
