import { revalidatePath } from 'next/cache';
import { getUserAndDb } from '@/app/_function/getUserAndDb';

export default async function inputWeight({
  curDate,
  email,
}: {
  curDate: string;
  email: string;
}) {
  async function handleSubmit(
    email: string,
    curDate: string,
    formData: FormData // formData 를 마지막에 넣어야 타입에러 안 남
  ) {
    'use server';
    let shouldRedirect = false;
    const { db } = await getUserAndDb();
    try {
      await db?.collection('trainingmaxes').insertOne({
        press: Number(formData.get('press')) * 0.9,
        squat: Number(formData.get('squat')) * 0.9,
        bench: Number(formData.get('bench')) * 0.9,
        deadLift: Number(formData.get('deadLift')) * 0.9,
        email: email,
        date: curDate,
      });
      shouldRedirect = true;
    } catch (err) {
      console.error(err);
      return;
    }
    if (shouldRedirect) revalidatePath('/home');
  }
  const SubmitWithEmailAndDate = handleSubmit.bind(null, email, curDate);
  // Error: Functions cannot be passed directly to Client Components unless you explicitly expose it by marking it with "use server".
  // 그냥 받아온 props를 handleSubmit 에서 사용하면 위 에러가 나옴

  // 올바르게 formData 에 form 외부의 데이터(props) 추가하는 방법
  // <input type='hidden' name='date' value={curDate}></input>
  // 위 처럼도 가능하나 html 렌더링 시 값이 노출 될 수 있어 보안 상 위험
  // 따라서 handleSubmit 함수에 추가할 값을 인수로 넘겨주고 함수에 직접 바인딩해 주는 것이 공식문서 피셜 추천 방법

  return (
    <form action={SubmitWithEmailAndDate} className='w-4/5'>
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

        <p className='my-3'>
          자신의 1RM을 잘 모르셔도 괜찮습니다 😄
          <br />
          정확한 자세로 수행한 최대 중량을 입력해주세요!
        </p>
        <button
          type='submit'
          className='text-md w-32 rounded-lg bg-slate-50 px-5 py-2 font-medium text-slate-900 shadow-md active:bg-slate-200 dark:bg-slate-700 dark:text-white dark:active:bg-slate-600'
        >
          제출
        </button>
      </div>
    </form>
  );
}
