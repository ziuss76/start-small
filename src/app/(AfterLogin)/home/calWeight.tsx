export default function CalWeight(result: any) {
  let oneRM = result.result[0];
  let TM = [oneRM.press, oneRM.squat, oneRM.bench, oneRM.deadLift].map(
    (w) => w * 0.9
  );
  let trainingDay = ['월', '화', '목', '금'];
  let training = ['press', 'squat', 'bench', 'deadLift'];
  let trainingReps = ['5회', '5회', '5회+', '최대'];
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
  console.log(weekOneWeights);
  console.log(weekTwoWeights);
  console.log(weekThreeWeights);

  function roundToTwoPointFive(x: number) {
    return Math.round(x / 2.5) * 2.5;
  }

  // 오늘 날짜 기준으로 월요일이면 월 / press 가 bounce 애니메이션 동작
  // 운동 시작 누르면 해당 요일의 운동만 보이기
  return (
    <div className='flex flex-col'>
      <div>
        {trainingDay[0]} / {training[0]}
      </div>
      <div className='m-2 flex space-x-3'>
        {weekOneWeights[0].map((weight, i) => (
          <button key={i}>
            {weight} X {trainingReps[i]}
          </button>
        ))}
      </div>
      <div>
        {trainingDay[1]} / {training[1]}
      </div>
      <div className='m-2 flex space-x-3'>
        {weekOneWeights[1].map((weight, i) => (
          <button key={i}>
            {weight} X {trainingReps[i]}
          </button>
        ))}
      </div>
      <div>
        {trainingDay[2]} / {training[2]}
      </div>
      <div className='m-2 flex space-x-3'>
        {weekOneWeights[2].map((weight, i) => (
          <button key={i}>
            {weight} X {trainingReps[i]}
          </button>
        ))}
      </div>
      <div>
        {trainingDay[3]} / {training[3]}
      </div>
      <div className='m-2 flex space-x-3'>
        {weekOneWeights[3].map((weight, i) => (
          <button key={i}>
            {weight} X {trainingReps[i]}
          </button>
        ))}
      </div>
    </div>
  );
}
