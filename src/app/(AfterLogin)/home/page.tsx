import '@/app/globals.css';

import { connectDB } from '@/../util/db';
import UseDarkMode from '@/app/_component/useDarkMode';

export default async function Home() {
  let db = (await connectDB)?.db('StartSmall');
  let result = await db?.collection('weight').find().toArray();

  return (
    <div className='flex justify-center'>
      <UseDarkMode />
      <div className='h-[100dvh] w-[100dvw] max-w-screen-md'>
        <div className='mb-2 h-20'>
          <div className='flex h-full w-full items-center justify-center bg-slate-400 text-center dark:bg-slate-600'>
            <div>홈</div>
          </div>
        </div>
        <div className='flex h-5/6'>
          <div className='flex h-full w-full flex-col justify-start text-center'>
            <div className=' mb-2 flex h-1/5 w-full items-center justify-center bg-slate-300 text-center dark:bg-slate-500'>
              <div>월요일: {result && result[0].squat}</div>
            </div>
            <div className=' mb-2 flex h-1/5 w-full items-center justify-center bg-slate-300 text-center dark:bg-slate-500'>
              <div>수</div>
            </div>
            <div className=' mb-2 flex h-1/5 w-full items-center justify-center bg-slate-300 text-center dark:bg-slate-500'>
              <div>금</div>
            </div>
            <div className=' mb-2 flex h-1/5 w-full items-center justify-center bg-slate-300 text-center dark:bg-slate-500'>
              <div>운동 시작 / 현재 진행 중 운동</div>
            </div>
          </div>
        </div>
        U
      </div>
    </div>
  );
}
