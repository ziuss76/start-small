'use client';

import { useEffect, useState } from 'react';
import TimePicker from './TimePicker';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';
import urlBase64ToUint8Array from '../_function/urlBase64ToUnit8Array';
import { checkExistingAlarm } from '../_function/checkExistingAlarm';
import {
  handleSubscribe,
  handleUnsubscribe,
} from '../_function/handleSubAndUnsub';

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
    checkExistingAlarm(userInfo, setIsAlarmSet, setAlarmTime);
  }, [userInfo, setIsAlarmSet, setAlarmTime]);

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
          onClick={(e) =>
            handleSubscribe(
              e,
              pushManager,
              applicationServerKey,
              userInfo,
              newTime,
              setIsAlarmSet,
              setAlarmTime
            )
          }
          className='px-4.5 flex-1 border-r border-slate-400 text-center dark:border-slate-300'
        >
          생성
        </button>

        <button
          type='submit'
          onClick={(e) =>
            handleUnsubscribe(
              e,
              userInfo,
              setIsAlarmSet,
              setNewTime,
              setAlarmTime,
              initialTime
            )
          }
          className='px-4.5 flex-1 text-center'
        >
          삭제
        </button>
      </div>
    </div>
  );
}
