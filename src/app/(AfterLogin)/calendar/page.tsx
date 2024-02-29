import MyCalendar from './MyCalendar';
import { getUserAndDb } from '@/app/_function/getUserAndDb';

export default async function Calendar() {
  const { db, userInfo } = await getUserAndDb();
  const userEmail = userInfo?.user.email;

  const doneDays = await db
    ?.collection('donedays')
    .find({ email: userEmail })
    .toArray();

  const doneDaysDates = doneDays.map((doc) => doc.today);

  return (
    <div className='flex h-full w-full justify-center'>
      <div className='mx-3 flex h-full w-full flex-col justify-start text-center'>
        <div className='mb-3 flex h-4/6 w-full items-center justify-center rounded-lg bg-slate-300 text-center dark:bg-slate-500'>
          <MyCalendar doneDaysDates={doneDaysDates} />
        </div>
        <div className='flex h-1/5 w-full flex-col items-center justify-center space-y-1.5 rounded-lg bg-slate-300 text-center dark:bg-slate-500'>
          <p>📒 이번 달의 운동 기록</p>
          <div className='flex space-x-1.5'>
            <div className='flex h-[3.1rem] w-[3.1rem] items-center justify-center rounded-full bg-green-600 text-center text-sm'>
              <p>완료</p>
            </div>
            <div className='flex h-12 w-12 items-center justify-center rounded-full border-2 border-cyan-500 text-sm'>
              <p>휴식</p>
            </div>
            <div className='flex h-12 w-12 items-center justify-center rounded-full border-2 border-slate-950 text-sm dark:border-slate-50'>
              <p>오늘</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
