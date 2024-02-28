import DarkModeBtn from './_component/DarkModeBtn';
import ResetBtn from './_component/ResetBtn';
import LogoutBtn from './_component/LogoutBtn';
import LowerBtn from './_component/LowerBtn';
import NotificationBtn from './_component/NotificationBtn';
import IncreaseBtn from './_component/IncreaseBtn';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { getUserAndDb } from '@/app/_function/getUserAndDb';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Seoul');

export default async function Setting() {
  const { userInfo } = await getUserAndDb();

  const curDate = dayjs().tz().format('YYYY-MM-DD');

  return (
    <div className='flex justify-center'>
      <div className='mx-3 flex h-full w-full flex-col justify-start text-center'>
        <div className='mb-3 flex h-16 w-full items-center justify-center rounded-lg bg-slate-300 text-center dark:bg-slate-500'>
          <DarkModeBtn />
        </div>
        <NotificationBtn userInfo={userInfo} />
        <IncreaseBtn curDate={curDate} />
        <LowerBtn curDate={curDate} />
        <div className='mb-3 flex h-16 w-full items-center justify-center rounded-lg bg-slate-300 text-center dark:bg-slate-500'>
          <div>
            <ResetBtn />
          </div>
        </div>
        <div className='mb-3 flex h-16 w-full items-center justify-center rounded-lg bg-slate-300 text-center dark:bg-slate-500'>
          <LogoutBtn userInfo={userInfo} />
        </div>
      </div>
    </div>
  );
}
