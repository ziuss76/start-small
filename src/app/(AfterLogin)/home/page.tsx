import clientPromise from '@/../util/db';
import UseDarkMode from '@/app/_component/useDarkMode';
import { revalidatePath } from 'next/cache';
import CalWeight from './calWeight';
import { IoFlame } from 'react-icons/io5';
import { ObjectId } from 'mongodb';

export default async function Home() {
  let db = (await clientPromise)?.db('StartSmall');
  let result = await db?.collection('weights').find().toArray();

  result = result.map((a: any) => {
    a._id = a._id.toString();
    return a;
  });

  async function handleSubmit(formData: FormData) {
    'use server';
    let shouldRedirect = false;
    try {
      let db = (await clientPromise)?.db('StartSmall');
      await db?.collection('weights').insertOne({
        press: Number(formData.get('press')),
        squat: Number(formData.get('squat')),
        bench: Number(formData.get('bench')),
        deadLift: Number(formData.get('deadLift')),
      });
      shouldRedirect = true;
    } catch (err) {
      console.error(err);
      return;
    }
    if (shouldRedirect) revalidatePath('/home');
  }

  return (
    <div className='flex justify-center'>
      <UseDarkMode />
      <div className='h-[100dvh] w-[100dvw] max-w-screen-md'>
        <div className='mb-1 h-16'>
          <div className='flex h-full w-full items-center justify-center text-center text-xl'>
            <div>홈</div>
          </div>
        </div>
        <div className='flex h-5/6'>
          <div className='mx-3 flex h-full w-full flex-col justify-start text-center'>
            <div className='mb-3 flex h-4/6 w-full items-center justify-center rounded-lg bg-slate-300 text-center dark:bg-slate-500'>
              {result.length ? (
                <CalWeight result={result} />
              ) : (
                <form action={handleSubmit} className='w-4/5'>
                  <div className='flex w-full flex-col items-center'>
                    <input
                      type='number'
                      min='20'
                      name='press'
                      required
                      placeholder='OHP 1RM의 숫자만 입력해주세요.'
                      className=' m-1.5 w-full rounded-lg p-2 text-slate-900 shadow-md focus:outline-slate-400'
                    />
                    <input
                      type='number'
                      min='20'
                      name='squat'
                      required
                      placeholder='스쿼트 1RM의 숫자만 입력해주세요.'
                      className='m-1.5 w-full rounded-lg p-2 text-slate-900 shadow-md focus:outline-slate-400'
                    />
                    <input
                      type='number'
                      min='20'
                      name='bench'
                      required
                      placeholder='벤치 1RM의 숫자만 입력해주세요.'
                      className='m-1.5 w-full rounded-lg p-2 text-slate-900 shadow-md focus:outline-slate-400'
                    />
                    <input
                      type='number'
                      min='20'
                      name='deadLift'
                      required
                      placeholder='데드 1RM의 숫자만 입력해주세요.'
                      className='m-1.5 w-full rounded-lg p-2 text-slate-900 shadow-md focus:outline-slate-400'
                    />
                    <button
                      type='submit'
                      className='text-md my-3 w-3/5 rounded-lg bg-slate-50 px-5 py-2.5 font-medium text-slate-900 shadow-md hover:bg-slate-200 focus:outline-slate-400 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-700'
                    >
                      제출
                    </button>
                  </div>
                </form>
              )}
            </div>
            <div className='mb-2 flex h-1/5 w-full items-center justify-center rounded-lg bg-slate-300 text-center dark:bg-slate-500'>
              <IoFlame size={30} />
              <div>운동 시작 / 현재 진행 중 운동</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
