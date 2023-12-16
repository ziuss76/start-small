`use client`;

export default function BreathAni() {
  return (
    <div className='relative flex items-center justify-center'>
      <div className='animate-breath-slow absolute z-10 h-52 w-52 rounded-full bg-slate-100 dark:bg-slate-800'></div>
      <div className='absolute h-64 w-64 rounded-full bg-slate-800 dark:bg-slate-100'></div>
    </div>
  );
}
