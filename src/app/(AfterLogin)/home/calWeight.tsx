export default function CalWeight(result: any) {
  let idWeight = result.result[0];
  let weight = [
    idWeight.press,
    idWeight.squat,
    idWeight.bench,
    idWeight.deadLift,
  ];
  let trainingDay = ['월요일', '화요일', '목요일', '금요일'];
  let training = ['press', 'squat', 'bench', 'deadLift'];
  let weekOnePer = [0.65, 0.75, 0.85, 0.65];
  let weekTwoPer = [0.7, 0.8, 0.9, 0.7];
  let weekThreePer = [0.75, 0.85, 0.95, 0.75];

  let weekOneWeights = weight.map((w) =>
    weekOnePer.map((per) => (w * per).toFixed(2))
  );
  let weekTwoWeights = weight.map((w) =>
    weekTwoPer.map((per) => (w * per).toFixed(2))
  );
  let weekThreeWeights = weight.map((w) =>
    weekThreePer.map((per) => (w * per).toFixed(2))
  );
  console.log(weekOneWeights);
  console.log(weekTwoWeights);
  console.log(weekThreeWeights);
  return (
    <div>
      <p>골드 4의 실력으로 알고리즘 짜고있으니 잠깐만 기달</p>
    </div>
  );
}
