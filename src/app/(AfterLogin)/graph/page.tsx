export default function Graph() {
  return (
    <div className='flex justify-center'>
      <div className='h-[100dvh] w-[100dvw] max-w-screen-md'>
        <div className='mb-1 h-16'>
          <div className='flex h-full w-full items-center justify-center text-center text-xl'>
            <div>그래프</div>
          </div>
        </div>
        <div className='flex h-5/6'>
          <div className='mx-3 flex h-full w-full flex-col justify-start text-center'>
            <div className=' mb-3 flex h-4/6 w-full items-center justify-center rounded-lg bg-slate-300 text-center dark:bg-slate-500'></div>
            <div className='flex h-1/5 w-full items-center justify-center rounded-lg bg-slate-300 text-center dark:bg-slate-500'>
              <div>4주 마다 TM 증량 그래프 / 1RM 계산 그래프</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
