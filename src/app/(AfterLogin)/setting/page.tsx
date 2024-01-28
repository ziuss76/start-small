import DarkModeBtn from '@/app/(AfterLogin)/setting/DarkModeBtn';
import ResetBtn from './ResetBtn';
import LogoutBtn from './LogoutBtn';
import { authOptions } from '../../../../pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import LowerBtn from './LowerBtn';
import NotificationBtn from './NotificationBtn';
import IncreaseBtn from './IncreaseBtn';

export default async function Setting() {
  const session = await getServerSession(authOptions);
  interface UserInfo {
    user: {
      name: string;
      email: string;
      image: string;
    };
  }

  let userInfo: UserInfo | null = null;

  if (session) {
    userInfo = JSON.parse(JSON.stringify(session));
  }

  return (
    <div className='flex justify-center'>
      <div className='h-[100dvh] w-[100dvw] max-w-screen-md'>
        <div className='mb-1 h-16'>
          <div className='flex h-full w-full items-center justify-center text-center text-xl'>
            <div>설정</div>
          </div>
        </div>
        <div className='flex h-5/6'>
          <div className='mx-3 flex h-full w-full flex-col justify-start text-center'>
            <div className='mb-3 flex h-16 w-full items-center justify-center rounded-lg bg-slate-300 text-center dark:bg-slate-500'>
              <DarkModeBtn />
            </div>
            <NotificationBtn userInfo={userInfo} />
            <IncreaseBtn />
            <LowerBtn />
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
