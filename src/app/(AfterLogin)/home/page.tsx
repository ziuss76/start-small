import clientPromise from '@/../util/db';
import ThisWeek from './ThisWeek';
import Link from 'next/link';
import InputWeight from './InputWeight';

export default async function Home() {
  let db = (await clientPromise)?.db('StartSmall');
  let result = await db?.collection('weights').find().toArray();

  result = result.map((a: any) => {
    a._id = a._id.toString();
    return a;
  });

  return (
    <div className='mx-3 flex h-full w-full flex-col justify-start text-center'>
      <div className='mb-3 flex h-4/6 w-full items-center justify-center rounded-lg bg-slate-300 text-center dark:bg-slate-500'>
        {result.length ? <ThisWeek result={result} /> : <InputWeight />}
      </div>
      <div className='flex h-1/5 w-full flex-col items-center justify-center rounded-lg bg-slate-300 text-center dark:bg-slate-500'>
        <p>가볍게 1~2 세트 웜업 후 시작하세요</p>
        <Link href='/home/today'>
          <button className='text-md mt-4 w-32 rounded-lg bg-slate-50 px-5 py-2 font-medium text-slate-900 shadow-md active:bg-slate-200 dark:bg-slate-700 dark:text-white dark:active:bg-slate-600'>
            시작
          </button>
        </Link>
      </div>
    </div>
  );
}
