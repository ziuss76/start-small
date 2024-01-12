import clientPromise from '@/../util/db';
import CalWeight from '../CalWeight';
import InputWeight from '../InputWeight';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import GetThisWeekDates from '../GetThisWeekDates';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Seoul');

export default async function Home() {
  let db = (await clientPromise)?.db('StartSmall');
  let result = await db?.collection('weights').find().toArray();

  result = result.map((a: any) => {
    a._id = a._id.toString();
    return a;
  });

  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const curDate = dayjs();
  const today = week[curDate.day()];

  const doneDays = await db?.collection('donedays').find().toArray();
  const doneDaysDates = doneDays.map(
    (doc) => doc.today.split('T')[0] // ISOString 형식 문자열에서 날짜만 추출
  );
  let thisWeekDates = GetThisWeekDates(curDate);

  return (
    <div className='mx-3 flex h-full w-full flex-col justify-start text-center'>
      <div className='mb-3 flex h-4/6 w-full items-center justify-center rounded-lg bg-slate-300 text-center dark:bg-slate-500'>
        {result.length ? (
          <CalWeight
            result={result}
            today={today}
            doneDaysDates={doneDaysDates}
            thisWeekDates={thisWeekDates}
          />
        ) : (
          <InputWeight />
        )}
      </div>
      {/* <div className='flex h-1/5 w-full flex-col items-center justify-center rounded-lg bg-slate-300 text-center dark:bg-slate-500'>
      </div> */}
    </div>
  );
}
