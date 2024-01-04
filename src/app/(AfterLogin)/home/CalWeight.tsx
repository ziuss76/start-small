'use client';

import Link from 'next/link';
import { useState } from 'react';
import Confetti from './Confetti';

export default function CalWeight(result: any) {
  let oneRM = result.result[0];

  let TM = [oneRM.press, oneRM.squat, oneRM.bench, oneRM.deadLift].map(
    (w) => w * 0.9
  );

  let training = ['프레스', '스쿼트', '벤치', '데드'];
  let trainingReps = ['5', '5', '5+', '최대'];
  let weekOnePer = [0.65, 0.75, 0.85, 0.65];
  let weekTwoPer = [0.7, 0.8, 0.9, 0.7];
  let weekThreePer = [0.75, 0.85, 0.95, 0.75];

  let weekOneWeights = TM.map((w) =>
    weekOnePer.map((per) => roundToTwoPointFive(w * per))
  );
  let weekTwoWeights = TM.map((w) =>
    weekTwoPer.map((per) => roundToTwoPointFive(w * per))
  );
  let weekThreeWeights = TM.map((w) =>
    weekThreePer.map((per) => roundToTwoPointFive(w * per))
  );

  function roundToTwoPointFive(x: number) {
    return Math.round(x / 2.5) * 2.5;
  }

  const [weekWeights, setWeekWeights] = useState([
    weekOneWeights,
    weekTwoWeights,
    weekThreeWeights,
  ]);
  const [currentWeek, setCurrentWeek] = useState(0);
  const [thisWeek, setThisWeek] = useState(['1주', '2주', '3주']);
  const [currentDay, setCurrentDay] = useState(0);
  const [trainingDay, setTrainingDay] = useState(['월', '화', '목', '금']);
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

  // 다시 일주일 운동 목록과 중량 보여주기
  // 완료한 운동은 색깔이 바뀌어야 함
  // 다음 운동 요일 전까지는 시작하기 disabled

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
                      className='h-16 w-16 rounded-full bg-slate-50 text-xl font-medium text-slate-900 shadow-md hover:bg-slate-200 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600'
                      disabled={i > 0 && doneReps[i - 1] === 0}
                    >
                      {trainingReps[i]}
                    </button>
                  ) : (
                    <button className='h-16 w-16 rounded-full bg-slate-700 text-xl font-medium text-white shadow-md hover:bg-slate-600 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-200'>
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
          <Link href='/home'>
            <button className='text-md mt-4 w-32 rounded-lg bg-slate-50 px-5 py-2 font-medium text-slate-900 shadow-md hover:bg-slate-200 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600'>
              빅토리!
            </button>
          </Link>
          <Confetti />
        </div>
      )}
    </div>
  );
}
