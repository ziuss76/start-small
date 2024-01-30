'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Confetti from './Confetti';
import { DoneToday } from './DoneToday';
import GetWeekWeights from './GetWeekWeights';
import UpdateCurWeek from './UpdateCurWeek';

export default function TodaySets({
  result,
  today,
  doneDaysDates,
  thisWeekDates,
}: {
  result: any;
  today: string;
  doneDaysDates: string[];
  thisWeekDates: string[];
}) {
  const training = ['프레스', '스쿼트', '벤치', '데드'];
  const trainingReps = [
    ['5', '5', '5+', '최대'],
    ['3', '3', '3+', '최대'],
    ['5', '3', '1+', '최대'],
    ['5', '5', '5'],
  ];
  const thisWeek = ['1주', '2주', '3주', '4주'];
  const trainingDay = ['월', '화', '목', '금'];
  const currentDay = trainingDay.indexOf(today);
  const weekWeights = GetWeekWeights(result);

  let currentWeek = UpdateCurWeek(doneDaysDates, thisWeekDates);

  const [doneReps, setDoneReps] = useState(
    Array(trainingReps[currentWeek].length).fill(0)
  );

  function doneRepsHandler(index: number) {
    setDoneReps(
      doneReps.map((done, i) => {
        if (i === index) return done + 1;
        else return done;
      })
    );
  }

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await DoneToday();
      router.push('/home');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='relative flex w-full flex-col items-center'>
      <div>{thisWeek[currentWeek]}</div>
      {trainingDay.map((day, index) => {
        if (index !== currentDay) return null;

        return (
          <div key={index}>
            <div>
              {day} : {training[index]}
            </div>
            <div className='m-2 flex space-x-4'>
              {weekWeights[currentWeek][index].map((weight, i) => (
                <div key={i} className='flex flex-col items-center space-y-4'>
                  <div>{weight}kg</div>
                  {doneReps[i] === 0 ? (
                    <button
                      onClick={() => doneRepsHandler(i)}
                      className='h-16 w-16 rounded-full bg-slate-50 text-xl font-medium text-slate-900 shadow-md active:bg-slate-200 dark:bg-slate-700 dark:text-white dark:active:bg-slate-600'
                      disabled={i > 0 && doneReps[i - 1] === 0}
                    >
                      {trainingReps[currentWeek][i]}
                    </button>
                  ) : (
                    <button className='h-16 w-16 rounded-full bg-slate-700 text-xl font-medium text-white shadow-md active:bg-slate-600 dark:bg-slate-50 dark:text-slate-900 dark:active:bg-slate-200'>
                      {trainingReps[currentWeek][i]}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {doneReps.includes(0) ? null : (
        <div className='absolute top-full'>
          <form onSubmit={handleSubmit}>
            <button
              type='submit'
              className='text-md mt-4 w-32 rounded-lg bg-slate-50 px-5 py-2 font-medium text-slate-900 shadow-md active:bg-slate-200 dark:bg-slate-700 dark:text-white dark:active:bg-slate-600'
            >
              빅토리!
            </button>
          </form>

          <Confetti />
        </div>
      )}
    </div>
  );
}
