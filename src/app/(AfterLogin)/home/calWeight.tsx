export default function CalWeight(result: any) {
  let oneRM = result.result[0];
  let TM = [oneRM.press, oneRM.squat, oneRM.bench, oneRM.deadLift].map(
    (w) => w * 0.9
  );
  let trainingDay = ['월', '화', '목', '금'];
  let training = ['press', 'squat', 'bench', 'deadLift'];
  let trainingReps = ['5회', '5회', '5회 이상', '최대 반복'];
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

  return (
    <div>
      <p>
        {trainingDay[0]} / {training[0]}
      </p>
      <p>
        {weekOneWeights[0][0]} X {trainingReps[0]}
      </p>
      <p>
        {weekOneWeights[0][1]} X {trainingReps[1]}
      </p>
      <p>
        {weekOneWeights[0][2]} X {trainingReps[2]}
      </p>
      <p>
        {weekOneWeights[0][3]} X {trainingReps[3]}
      </p>
    </div>
  );
}
