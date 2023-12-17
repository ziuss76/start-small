`use client`;

export default function BreathAni() {
  return (
    <div className='relative flex items-center justify-center'>
      <div className='absolute z-10 h-52 w-52 animate-breath-slow rounded-full bg-slate-100 dark:bg-slate-700'></div>
      <div className='absolute h-64 w-64 rounded-full bg-slate-700 dark:bg-slate-100'></div>
    </div>
  );
}
