import TodaySets from '../_component/TodaySets';
import InputWeight from '../_component/InputWeight';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import getThisWeekDates from '../_function/getThisWeekDates';
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
  const curDate = dayjs().tz();
  const today = week[curDate.day()];

  const doneDays = await db
    ?.collection('donedays')
    .find({ email: userEmail })
    .toArray();
  const doneDaysDates = doneDays.map((doc) => doc.today);

  let thisWeekDates = getThisWeekDates(curDate);

  return (
    <div className='mx-3 flex h-full w-full flex-col justify-start text-center'>
      <div className='mb-3 flex h-4/6 w-full items-center justify-center rounded-lg bg-slate-300 text-center dark:bg-slate-500'>
        {result ? (
          <TodaySets
            result={result}
            today={today}
            doneDaysDates={doneDaysDates}
            thisWeekDates={thisWeekDates}
          />
        ) : (
          <InputWeight
            curDate={curDate.format('YYYY-MM-DD')}
            email={userInfo!.user.email}
          />
        )}
      </div>
    </div>
  );
}
