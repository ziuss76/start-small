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
        <div className='flex h-1/5 w-full items-center justify-center rounded-lg bg-slate-300 text-center dark:bg-slate-500'>
          <div>📒 이번 달의 운동 기록</div>
        </div>
      </div>
    </div>
  );
}
