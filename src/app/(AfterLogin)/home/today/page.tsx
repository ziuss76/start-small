import clientPromise from '@/../util/db';
import TodaySets from '../TodaySets';
import InputWeight from '../InputWeight';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import GetThisWeekDates from '../GetThisWeekDates';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../../pages/api/auth/[...nextauth]';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Seoul');

export default async function Home() {
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
  const userEmail = userInfo?.user.email;
  let db = (await clientPromise)?.db('StartSmall');
  let result = await db
    ?.collection('trainingmaxes')
    .find({ email: userEmail })
    .toArray();

  result = result.map((a: any) => {
    a._id = a._id.toString();
    return a;
  });

  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const curDate = dayjs().tz();
  const today = week[curDate.day()];

  const doneDays = await db?.collection('donedays').find().toArray();
  const doneDaysDates = doneDays.map((doc) => doc.today);

  let thisWeekDates = GetThisWeekDates(curDate);

  return (
    <div className='mx-3 flex h-full w-full flex-col justify-start text-center'>
      <div className='mb-3 flex h-4/6 w-full items-center justify-center rounded-lg bg-slate-300 text-center dark:bg-slate-500'>
        {result.length ? (
          <TodaySets
            result={result}
            today={today}
            doneDaysDates={doneDaysDates}
            thisWeekDates={thisWeekDates}
          />
        ) : (
          <InputWeight />
        )}
      </div>
    </div>
  );
}
