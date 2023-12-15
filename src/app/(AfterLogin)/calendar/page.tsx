export default function Calendar() {
  return (
    <div className='flex justify-center'>
      <div className='h-[100dvh] w-[100dvw] max-w-screen-md'>
        <div className='mb-2 h-16'>
          <div className='flex h-full w-full items-center justify-center bg-slate-400 text-center dark:bg-slate-600'>
            <div>캘린더</div>
          </div>
        </div>
        <div className='flex h-5/6'>
          <div className='flex h-full w-full flex-col justify-start text-center'>
            <div className=' mb-2 flex h-4/6 w-full items-center justify-center bg-slate-300 text-center dark:bg-slate-500'></div>
            <div className='mb-2 flex h-1/5 w-full items-center justify-center bg-slate-300 text-center dark:bg-slate-500'>
              <div>이번 달 운동 기록</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
