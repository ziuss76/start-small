import ThisWeek from './_component/ThisWeek';
import Link from 'next/link';
import InputWeight from './_component/InputWeight';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import getThisWeekDates from './_function/getThisWeekDates';
import updateCurWeek from './_function/updateCurWeek';
import { getUserAndDb } from '@/app/_function/getUserAndDb';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Seoul');

export default async function Home() {
  const { userInfo, db } = await getUserAndDb();
  const userEmail = userInfo?.user.email;

  let result = await db
    ?.collection('trainingmaxes')
    .findOne(
      { email: userEmail },
      { projection: { _id: 0 }, sort: { date: -1 } }
    );

  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const thisWeek = ['1주', '2주', '3주', '4주'];
  const curDate = dayjs().tz();
  const today = week[curDate.day()]; // 요일

  const doneDays = await db
    ?.collection('donedays')
    .find({ email: userEmail })
    .toArray();
  const doneDaysDates = doneDays.map((doc) => doc.today);
  let thisWeekDates = getThisWeekDates(curDate);
  let currentWeek = updateCurWeek(doneDaysDates, thisWeekDates);

  return (
    <div className='mx-3 flex h-full w-full flex-col justify-start text-center'>
      <div className='mb-3 flex h-4/6 w-full items-center justify-center rounded-lg bg-slate-300 text-center dark:bg-slate-500'>
        {result ? (
          <ThisWeek
            result={result}
            today={today}
            doneDaysDates={doneDaysDates}
            thisWeekDates={thisWeekDates}
          />
        ) : (
          <InputWeight curDate={curDate.format('YYYY-MM-DD')} />
        )}
      </div>
      <div className='flex h-1/5 w-full flex-col items-center justify-center rounded-lg bg-slate-300 text-center dark:bg-slate-500'>
        {doneDaysDates.includes(curDate.format('YYYY-MM-DD')) ? (
          <p>🌱 오늘 운동을 완료했어요!</p>
        ) : !thisWeekDates.includes(curDate.format('YYYY-MM-DD')) ? (
          <p>😌 오늘은 쉬세요.. 회복해야 근성장합니다!</p>
        ) : (
          <>
            <p>🔥 가볍게 1~2 세트 웜업 후 시작하세요!</p>
            <Link href='/home/today'>
              <button className='text-md mt-4 w-32 rounded-lg bg-slate-50 px-3 py-2 font-medium text-slate-900 shadow-md active:bg-slate-200 dark:bg-slate-700 dark:text-white dark:active:bg-slate-600'>
                {thisWeek[currentWeek]} 차 시작
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
