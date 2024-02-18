// checkExistingAlarm.ts
import { Dispatch, SetStateAction } from 'react';
import { convertTo12HourFormat } from './convertTime';

interface UserInfo {
  user: {
    name: string;
    email: string;
    image: string;
  };
}

export const checkExistingAlarm = async (
  userInfo: UserInfo | null,
  setIsAlarmSet: Dispatch<SetStateAction<boolean>>,
  setAlarmTime: Dispatch<
    SetStateAction<{ hours: string; minutes: string; ampm: string }>
  >
) => {
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
