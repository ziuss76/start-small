'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Confetti from './Confetti';
import { DoneToday } from './DoneToday';
import WeekWeights from './WeekWeights';

export default function CalWeight(result: any) {
  const training = ['프레스', '스쿼트', '벤치', '데드'];
  const trainingReps = ['5', '5', '5+', '최대'];

  const weekWeights = WeekWeights(result);

  const [thisWeek, setThisWeek] = useState(['1주', '2주', '3주']);
  const [currentWeek, setCurrentWeek] = useState(0);
  const [trainingDay, setTrainingDay] = useState(['월', '화', '목', '금']);
  const [currentDay, setCurrentDay] = useState(0);
  const [doneReps, setDoneReps] = useState([0, 0, 0, 0]);

  function goNextDay() {
    if (currentDay === 3) {
      setCurrentWeek((currentWeek + 1) % 3);
      setCurrentDay(0);
      setDoneReps([0, 0, 0, 0]);
    } else {
      setCurrentDay(currentDay + 1);
      setDoneReps([0, 0, 0, 0]);
    }
  }

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
                      {trainingReps[i]}
                    </button>
                  ) : (
                    <button className='h-16 w-16 rounded-full bg-slate-700 text-xl font-medium text-white shadow-md active:bg-slate-600 dark:bg-slate-50 dark:text-slate-900 dark:active:bg-slate-200'>
                      {trainingReps[i]}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {doneReps.includes(0) ? null : (
        // <button
        //   onClick={goNextDay}
        //   className='text-md mt-4 w-24 rounded-lg bg-slate-50 px-5 py-2 font-medium text-slate-900 shadow-md hover:bg-slate-200 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600'
        // >
        //   다음
        // </button>
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
