import BreathAni from './BreathAni';
import PlayBtn from './PlayBtn';

export default function Mind() {
  return (
    <div className='flex h-full w-full justify-center'>
      <div className='mx-3 flex h-full w-full flex-col justify-start text-center'>
        <div className='mb-3 flex h-[75%] w-full items-center justify-center rounded-lg bg-slate-300 text-center dark:bg-slate-500'>
          <BreathAni />
        </div>
        <div className='flex h-1/5 w-full flex-col items-center justify-center rounded-lg bg-slate-300 text-center dark:bg-slate-500'>
          <PlayBtn />
        </div>
      </div>
    </div>
  );
}
