import DarkModeBtn from '@/app/(AfterLogin)/setting/DarkModeBtn';
import ResetBtn from './ResetBtn';
import LogoutBtn from './LogoutBtn';
import LowerBtn from './LowerBtn';
import NotificationBtn from './NotificationBtn';
import IncreaseBtn from './IncreaseBtn';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { getUserAndDb } from '@/app/_component/getUserAndDb';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Seoul');

export default async function Setting() {
  const { userInfo } = await getUserAndDb();

  const curDate = dayjs().tz().format('YYYY-MM-DD');

  return (
    <div className='flex justify-center'>
      <div className='h-[100dvh] w-[100dvw] max-w-screen-md'>
        <div className='mb-1 h-16'>
          <div className='flex h-full w-full items-center justify-center text-center text-xl'>
            <div>설정</div>
          </div>
        </div>
        <div className='flex h-[85%]'>
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
      </div>
    </div>
  );
}
