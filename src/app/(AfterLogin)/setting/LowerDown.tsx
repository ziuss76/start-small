'use client';
import { useState } from 'react';
import { FaAngleDown, FaAngleUp, FaArrowDown } from 'react-icons/fa6';
import LowerWeight from './LowerWeight';

export default function LowerDown() {
  const [dropDownActive, setDropDownActive] = useState(false);
  const trainings = ['프레스', '스쿼트', '벤치', '데드'];

  return dropDownActive ? (
    <div className='mb-3 flex h-[10.5rem] w-full flex-col items-center justify-center rounded-lg bg-slate-300 p-3 text-center dark:bg-slate-500'>
      <button
        onClick={() => setDropDownActive(!dropDownActive)}
        type='submit'
        className='rounded-lg bg-slate-700 px-5 py-2.5 text-sm font-medium text-white shadow-md hover:bg-slate-600'
      >
        <p>
          10% 낮출 종목 선택
          <FaAngleUp className='ml-1 inline-block h-4 w-4' />
        </p>
      </button>
      <div className='mt-3 grid grid-cols-2 gap-3'>
        {trainings.map((training, index) => (
          <form
            key={index}
            action={async () => {
              const confirmDelete = window.confirm(
                `${training} TM 중량을 10% 낮추시겠습니까?\n해당 종목을 2번 이상 실패했을 때 권장합니다.`
              );
              if (confirmDelete) await LowerWeight(training);
            }}
          >
            <button
              type='submit'
              className='rounded-lg bg-slate-700 px-5 py-2.5 text-sm font-medium text-white shadow-md hover:bg-slate-600'
            >
              <p>{training}</p>
            </button>
          </form>
        ))}
      </div>
    </div>
  ) : (
    <div className='mb-3 flex h-16 w-full items-center justify-center rounded-lg bg-slate-300 text-center dark:bg-slate-500'>
      <button
        onClick={() => setDropDownActive(!dropDownActive)}
        type='submit'
        className='rounded-lg bg-slate-700 px-5 py-2.5 text-sm font-medium text-white shadow-md hover:bg-slate-600'
      >
        <p>
          10% 중량 낮추기
          <FaAngleDown className='ml-1 inline-block h-4 w-4' />
        </p>
      </button>
    </div>
  );
}
