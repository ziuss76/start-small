import { revalidatePath } from 'next/cache';
import { getUserAndDb } from '@/app/_component/getUserAndDb';

export default async function inputWeight({ curDate }: { curDate: string }) {
  const { userInfo, db } = await getUserAndDb();
  async function handleSubmit(formData: FormData) {
    'use server';
    let shouldRedirect = false;
    try {
      await db?.collection('trainingmaxes').insertOne({
        email: userInfo?.user.email,
        press: Number(formData.get('press')) * 0.9,
        squat: Number(formData.get('squat')) * 0.9,
        bench: Number(formData.get('bench')) * 0.9,
        deadLift: Number(formData.get('deadLift')) * 0.9,
        date: curDate,
      });
      shouldRedirect = true;
    } catch (err) {
      console.error(err);
      return;
    }
    if (shouldRedirect) revalidatePath('/home');
  }
  return (
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
          className='text-md mt-4 w-32 rounded-lg bg-slate-50 px-5 py-2 font-medium text-slate-900 shadow-md active:bg-slate-200 dark:bg-slate-700 dark:text-white dark:active:bg-slate-600'
        >
          제출
        </button>
      </div>
    </form>
  );
}
