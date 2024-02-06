import MyCalendar from './MyCalendar';
import clientPromise from '@/../util/db';

export default async function Calendar() {
  let db = (await clientPromise)?.db('StartSmall');

  const doneDays = await db?.collection('donedays').find().toArray();
  const doneDaysDates = doneDays.map((doc) => doc.today);
  return (
    <div className='flex justify-center'>
      <div className='h-[100dvh] w-[100dvw] max-w-screen-md'>
        <div className='mb-1 h-16'>
          <div className='flex h-full w-full items-center justify-center text-center text-xl'>
            <div>캘린더</div>
          </div>
        </div>
        <div className='flex h-[85%]'>
          <div className='mx-3 flex h-full w-full flex-col justify-start text-center'>
            <div className='mb-3 flex h-4/6 w-full items-center justify-center rounded-lg bg-slate-300 text-center dark:bg-slate-500'>
              <MyCalendar doneDaysDates={doneDaysDates} />
            </div>
            <div className='flex h-1/5 w-full items-center justify-center rounded-lg bg-slate-300 text-center dark:bg-slate-500'>
              <div>📒 이번 달의 운동 기록</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
