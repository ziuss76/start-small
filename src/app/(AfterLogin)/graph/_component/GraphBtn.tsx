import Link from 'next/link';

export default function GraphBtn() {
  const trainings = ['프레스', '스쿼트', '벤치', '데드'];
  const trainingMap = {
    프레스: 'press',
    스쿼트: 'squat',
    벤치: 'bench',
    데드: 'deadLift',
  };
  return (
    <div className='grid grid-cols-2 gap-1.5'>
      {trainings.map((training, i) => (
        <Link
          href={`/graph/${trainingMap[training as keyof typeof trainingMap]}`}
          key={i}
        >
          <div
            key={i}
            className='flex w-[4.8rem] items-center justify-center rounded-lg bg-slate-50 px-2 py-2.5 text-sm font-medium text-slate-900 shadow-md active:bg-slate-200 dark:bg-slate-700 dark:text-white
            dark:active:bg-slate-600'
          >
            {training}
          </div>
        </Link>
      ))}
    </div>
  );
}
