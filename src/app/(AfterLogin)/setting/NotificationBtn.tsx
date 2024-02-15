'use client';

import { useEffect, useState } from 'react';
import { Subscribe } from './Subscribe';
import TimePicker from './TimePicker';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';
import { convertTo12HourFormat } from './ConvertTime';
import urlBase64ToUint8Array from './UrlBase64ToUnit8Array';

const NEXT_PUBLIC_VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

interface UserInfo {
  user: {
    name: string;
    email: string;
    image: string;
  };
}

const initialTime = {
  hours: '0',
  minutes: '0',
  ampm: 'am',
};

export default function NotificationBtn({
  userInfo,
}: {
  userInfo: UserInfo | null;
}) {
  const [pushManager, setPushManager] = useState<PushManager | null>(null);
  const [newTime, setNewTime] = useState(initialTime);
  const [alarmTime, setAlarmTime] = useState(initialTime);
  const [isAlarmSet, setIsAlarmSet] = useState(false);
  const [isTimePicker, setIsTimePicker] = useState(false);

  const showTimePicker = () => {
    setIsTimePicker(!isTimePicker);
  };

  const [applicationServerKey, setApplicationServerKey] =
    useState<Uint8Array | null>(null);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js');
      navigator.serviceWorker.ready.then((registration) => {
        setPushManager(registration.pushManager);
      });
    }

    setApplicationServerKey(
      urlBase64ToUint8Array(NEXT_PUBLIC_VAPID_PUBLIC_KEY ?? '')
    );
  }, []);

  useEffect(() => {
    checkExistingAlarm();
  }, []);

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
        setIsAlarmSet(true);
        checkExistingAlarm();
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
      setIsAlarmSet(false);
      setNewTime(initialTime);
      setAlarmTime(initialTime);
    } catch (error) {
      console.error(error);
      window.alert('알림 삭제에 실패했습니다.');
    }
  };

  const handleTimeChange = (newTime: {
    hours: string;
    minutes: string;
    ampm: string;
  }) => {
    setNewTime(newTime);
  };

  return !isTimePicker ? (
    <div className='mb-3 flex h-16 w-full items-center justify-center rounded-lg bg-slate-300 text-center dark:bg-slate-500 '>
      <button
        onClick={showTimePicker}
        className='w-[10rem] rounded-lg bg-slate-50 px-1 py-2.5 text-sm font-medium text-slate-900 shadow-md active:bg-slate-200 dark:bg-slate-700 dark:text-white dark:active:bg-slate-600'
      >
        <p>
          ⏱️ 푸시 알림이
          <FaAngleDown className='ml-1 inline-block h-4 w-4' />
        </p>
      </button>
    </div>
  ) : (
    <div className='mb-3 flex h-[10rem] w-full flex-col items-center justify-center space-y-2 rounded-lg bg-slate-300 p-3 text-center dark:bg-slate-500'>
      <button
        onClick={showTimePicker}
        className='w-[10rem] rounded-lg bg-slate-50 px-1 py-2.5 text-sm font-medium text-slate-900 shadow-md active:bg-slate-200 dark:bg-slate-700 dark:text-white dark:active:bg-slate-600'
      >
        <p>
          ⏱️ 푸시 알림이
          <FaAngleUp className='ml-1 inline-block h-4 w-4' />
        </p>
      </button>
      <TimePicker
        onTimeChange={handleTimeChange}
        disabled={isAlarmSet}
        time={alarmTime}
      />
      <div className='flex w-[10rem] rounded-lg bg-slate-50 px-1 py-2.5 text-sm font-medium text-slate-900 shadow-md active:bg-slate-200 dark:bg-slate-700 dark:text-white dark:active:bg-slate-600'>
        <button
          type='submit'
          onClick={(e) => handleSubmit(e)}
          className='px-4.5 flex-1 border-r border-slate-400 text-center dark:border-slate-300'
        >
          생성
        </button>

        <button
          type='submit'
          onClick={(e) => handleUnsubscribe(e)}
          className='px-4.5 flex-1 text-center'
        >
          삭제
        </button>
      </div>
    </div>
  );
}
