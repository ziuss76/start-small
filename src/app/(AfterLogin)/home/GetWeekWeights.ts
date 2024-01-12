export default function GetWeekWeights(result: any) {
  let oneRM = result[0];

  const TM = [oneRM.press, oneRM.squat, oneRM.bench, oneRM.deadLift].map(
    (w) => w * 0.9
  );
  const weekOneCoe = [0.65, 0.75, 0.85, 0.65]; // 1주차 중량 계수
  const weekTwoCoe = [0.7, 0.8, 0.9, 0.7]; // 2주차 중량 계수
  const weekThreeCoe = [0.75, 0.85, 0.95, 0.75]; // 3주차 중량 계수

  const weekOneWeights = TM.map((w) =>
    weekOneCoe.map((per) => roundToTwoPointFive(w * per))
  );
  const weekTwoWeights = TM.map((w) =>
    weekTwoCoe.map((per) => roundToTwoPointFive(w * per))
  );
  const weekThreeWeights = TM.map((w) =>
    weekThreeCoe.map((per) => roundToTwoPointFive(w * per))
  );

  function roundToTwoPointFive(x: number) {
    return Math.round(x / 2.5) * 2.5;
  }

  return [weekOneWeights, weekTwoWeights, weekThreeWeights];
}
