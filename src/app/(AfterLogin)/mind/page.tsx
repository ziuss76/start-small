import BreathAni from './BreathAni';

export default function Mind() {
  return (
    <div className='flex justify-center'>
      <div className='h-[100dvh] w-[100dvw] max-w-screen-md'>
        <div className='mb-1 h-16'>
          <div className='flex h-full w-full items-center justify-center text-xl'>
            <div>명상</div>
          </div>
        </div>
        <div className='flex h-[85%]'>
          <div className='mx-3 flex h-full w-full flex-col justify-start text-center'>
            <div className='mb-3 flex h-4/6 w-full items-center justify-center rounded-lg bg-slate-300 text-center dark:bg-slate-500'>
              <BreathAni />
            </div>
            <div className='flex h-1/5 w-full flex-col items-center justify-center rounded-lg bg-slate-300 text-center dark:bg-slate-500'>
              <p>4-6 숨쉬기에 익숙해지면 명상을 시작하세요</p>
              <button className='text-md mt-4 w-32 rounded-lg bg-slate-50 px-5 py-2 font-medium text-slate-900 shadow-md active:bg-slate-200 dark:bg-slate-700 dark:text-white dark:active:bg-slate-600'>
                시작
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
