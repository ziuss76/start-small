import clientPromise from '@/../util/db';

export default async function CalWeight(result: any) {
  let oneRM = result.result[0];

  let TM = [oneRM.press, oneRM.squat, oneRM.bench, oneRM.deadLift].map(
    (w) => w * 0.9
  );

  let training = ['프레스', '스쿼트', '벤치', '데드'];
  let weekOnePer = [0.65, 0.75, 0.85];
  let weekTwoPer = [0.7, 0.8, 0.9];
  let weekThreePer = [0.75, 0.85, 0.95];

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

  let weekWeights = [weekOneWeights, weekTwoWeights, weekThreeWeights];
  let currentWeek = 0;
  let thisWeek = ['1주', '2주', '3주'];
  let trainingDay = ['월', '화', '목', '금'];

  // 다시 일주일 운동 목록과 중량 보여주기
  // 완료한 운동은 색깔이 바뀌어야 함
  // 다음 운동 요일 전까지는 시작하기 disabled

  let db = (await clientPromise)?.db('StartSmall');
  let doneDays = await db?.collection('donedays').find().toArray();

  // doneDays = doneDays.map((a: any) => {
  //   a._id = a._id.toString();
  //   return a;
  // });

  console.log(doneDays);

  function getToday() {
    const week = ['일', '월', '화', '수', '목', '금', '토'];
    const today = new Date();
    const yyyymmdd = `${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}`;
    return [yyyymmdd, week[new Date(yyyymmdd).getDay()]];
  }

  let today = getToday();

  return (
    <div className='flex w-full flex-col items-center'>
      <div>{thisWeek[currentWeek]}</div>
      {trainingDay.map((day, index) => {
        return (
          <div key={index}>
            <div className='relative m-2 flex space-x-3'>
              {today[1] === day ? (
                <>
                  <div className='absolute bottom-[0.2rem] left-[-1rem] animate-bounce-fast'>
                    🐢
                  </div>
                  <p className='text-xl font-semibold'>
                    {day} : {training[index]}
                  </p>
                </>
              ) : (
                <div>
                  {day} : {training[index]}
                </div>
              )}
              {weekWeights[currentWeek][index].map((weight, i) => (
                <div key={i} className='flex flex-col items-center'>
                  {today[1] === day ? (
                    <p className='-translate-y-[0.05rem] text-xl font-semibold'>
                      {weight}
                    </p>
                  ) : (
                    <p className='-translate-y-[0.05rem]'>{weight}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
