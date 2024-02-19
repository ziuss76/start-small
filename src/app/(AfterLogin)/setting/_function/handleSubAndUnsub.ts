import { Dispatch, SetStateAction, FormEvent } from 'react';
import { subscribe } from './subscribe';
import { checkExistingAlarm } from './checkExistingAlarm';

interface UserInfo {
  user: {
    name: string;
    email: string;
    image: string;
  };
}

export const handleSubscribe = async (
  e: FormEvent<HTMLButtonElement>,
  pushManager: PushManager | null,
  applicationServerKey: Uint8Array | null,
  userInfo: UserInfo | null,
  newTime: { hours: string; minutes: string; ampm: string },
  setIsAlarmSet: Dispatch<SetStateAction<boolean>>,
  setAlarmTime: Dispatch<
    SetStateAction<{ hours: string; minutes: string; ampm: string }>
  >
) => {
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
      await subscribe(newSubscription.toJSON(), newTime);
      window.alert('알림이 생성되었습니다');
      setIsAlarmSet(true);
      checkExistingAlarm(userInfo, setIsAlarmSet, setAlarmTime);
    } else {
      window.alert('이미 알림이 존재합니다.');
    }
  } catch (error) {
    console.error(error);
  }
};

export const handleUnsubscribe = async (
  e: FormEvent<HTMLButtonElement>,
  userInfo: UserInfo | null,
  setIsAlarmSet: Dispatch<SetStateAction<boolean>>,
  setNewTime: Dispatch<
    SetStateAction<{ hours: string; minutes: string; ampm: string }>
  >,
  setAlarmTime: Dispatch<
    SetStateAction<{ hours: string; minutes: string; ampm: string }>
  >,
  initialTime: { hours: string; minutes: string; ampm: string }
) => {
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
