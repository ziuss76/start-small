'use client';

import { useState } from 'react';

export default function CalWeight(result: any) {
  let oneRM = result.result[0];

  let TM = [oneRM.press, oneRM.squat, oneRM.bench, oneRM.deadLift].map(
    (w) => w * 0.9
  );

  let training = ['프레스', '스쿼트', '벤치', '데드'];
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

  // 다시 일주일 운동 목록과 중량 보여주기
  // 완료한 운동은 색깔이 바뀌어야 함
  // 다음 운동 요일 전까지는 시작하기 disabled

  function getDayOfWeek() {
    const week = ['일', '월', '화', '수', '목', '금', '토'];
    const today = new Date();
    const yyyymmdd = `${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}`;
    return week[new Date(yyyymmdd).getDay()];
  }

  let today = getDayOfWeek();

  return (
    <div className='flex w-full flex-col items-center'>
      <div>{thisWeek[currentWeek]}</div>
      {trainingDay.map((day, index) => {
        return (
          <div key={index}>
            <div className='m-2 flex space-x-4'>
              {today === day ? (
                <div className='relative flex'>
                  <div className='absolute right-[4.6rem] animate-bounce-fast'>
                    🔥
                  </div>
                  <div>
                    {day} : {training[index]}
                  </div>
                </div>
              ) : (
                <div>
                  {day} : {training[index]}
                </div>
              )}
              {weekWeights[currentWeek][index].map((weight, i) => (
                <div key={i} className='flex flex-col items-center space-y-4'>
                  <div>{weight}kg</div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
