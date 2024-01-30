'use client';
import { useState } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';
import IncreaseWeight from './IncreaseWeight';

export default function LowerDown() {
  const [dropDownActive, setDropDownActive] = useState(false);
  const trainings = ['프레스', '스쿼트', '벤치', '데드'];

  return dropDownActive ? (
    <div className='mb-3 flex h-[10rem] w-full flex-col items-center justify-center rounded-lg bg-slate-300 p-3 text-center dark:bg-slate-500'>
      <button
        onClick={() => setDropDownActive(!dropDownActive)}
        type='submit'
        className='w-[10rem] rounded-lg bg-slate-50 px-5 py-2.5 text-sm font-medium text-slate-900 shadow-md active:bg-slate-200 dark:bg-slate-700 dark:text-white dark:active:bg-slate-600'
      >
        <p>
          🔥 중량 올리기
          <FaAngleUp className='ml-1 inline-block h-4 w-4' />
        </p>
      </button>
      <div className='mt-2.5 grid grid-cols-2 gap-1.5'>
        {trainings.map((training, index) => (
          <form
            key={index}
            className='grid gap-1.5'
            action={async () => {
              let message;
              if (['프레스', '벤치'].includes(training)) {
                message = `${training} 중량을 2.5kg 올리시겠습니까?\n4주동안의 트레이닝 성공시 권장합니다.`;
              } else if (['스쿼트', '데드'].includes(training)) {
                message = `${training} 중량을 5kg 올리시겠습니까?\n4주동안의 트레이닝 성공시 권장합니다.`;
              }
              const confirmDelete = window.confirm(message);
              if (confirmDelete) await IncreaseWeight(training);
            }}
          >
            <button
              type='submit'
              className='w-[4.8rem] rounded-lg bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-900 shadow-md active:bg-slate-200 dark:bg-slate-700 dark:text-white dark:active:bg-slate-600'
            >
              <p>{training}</p>
            </button>
          </form>
        ))}
      </div>
    </div>
  ) : (
    <div className='mb-3 flex h-16 w-full items-center justify-center rounded-lg bg-slate-300 text-center dark:bg-slate-500 '>
      <button
        onClick={() => setDropDownActive(!dropDownActive)}
        type='submit'
        className='w-[10rem] rounded-lg bg-slate-50 px-5 py-2.5 text-sm font-medium text-slate-900 shadow-md active:bg-slate-200 dark:bg-slate-700 dark:text-white dark:active:bg-slate-600'
      >
        <p>
          🔥 중량 올리기
          <FaAngleDown className='ml-1 inline-block h-4 w-4' />
        </p>
      </button>
    </div>
  );
}
