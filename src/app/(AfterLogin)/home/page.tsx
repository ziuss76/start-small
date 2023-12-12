import '@/app/globals.css';

import clientPromise from '@/../util/db';
import UseDarkMode from '@/app/_component/useDarkMode';

export default async function Home() {
  let db = (await clientPromise)?.db('StartSmall');
  let result = await db?.collection('weight').find().toArray();

  // db 안 weight collection 에 자신의 이름(name: 구글 아이디)과 일치하는 객체가 비어있으면
  // input 창을 띄워서 필수 값(squat, bench, deadLift, press, chinUp)을 각각 입력받고
  // 필수가 아닌 값(curl, dip, row, rdl)을 입력받는다. 건너뛰기 버튼을 누르면 그 값은 0으로 저장된다.
  // 그 값과 자신의 이름(name: 구글 아이디)을 객체에 넣어서 db에 저장한다.

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
              <div>input</div>
            </div>
            <div className=' mb-2 flex h-1/5 w-full items-center justify-center bg-slate-300 text-center dark:bg-slate-500'>
              <div>수: {result && result[0].squat}</div>
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
