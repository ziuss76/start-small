import clientPromise from '@/../util/db';

export default async function CalWeight(result: any) {
  const oneRM = result.result[0];

  const TM = [oneRM.press, oneRM.squat, oneRM.bench, oneRM.deadLift].map(
    (w) => w * 0.9
  ); // training max

  const training = ['프레스', '스쿼트', '벤치', '데드'];
  const weekOneCoe = [0.65, 0.75, 0.85]; // 1주차 중량 계수
  const weekTwoCoe = [0.7, 0.8, 0.9]; // 2주차 중량 계수
  const weekThreeCoe = [0.75, 0.85, 0.95]; // 3주차 중량 계수

  function roundToTwoPointFive(x: number) {
    return Math.round(x / 2.5) * 2.5;
  }

  const weekOneWeights = TM.map((w) =>
    weekOneCoe.map((per) => roundToTwoPointFive(w * per))
  );

  const weekTwoWeights = TM.map((w) =>
    weekTwoCoe.map((per) => roundToTwoPointFive(w * per))
  );
  const weekThreeWeights = TM.map((w) =>
    weekThreeCoe.map((per) => roundToTwoPointFive(w * per))
  );

  const weekWeights = [weekOneWeights, weekTwoWeights, weekThreeWeights];
  const currentWeek = 0;
  const thisWeek = ['1주', '2주', '3주'];
  const trainingDay = ['월', '화', '목', '금'];

  const db = (await clientPromise)?.db('StartSmall');
  const doneDays = await db?.collection('donedays').find().toArray();
  const doneDaysDates = doneDays.map(
    (doc) => doc.today.toISOString().split('T')[0]
  );

  console.log(doneDaysDates);

  function getThisWeekDates() {
    const week = ['일', '월', '화', '수', '목', '금', '토'];
    const trainingDays = ['월', '화', '목', '금'];
    const today = new Date();
    const thisWeekDates: string[] = [];

    trainingDays.forEach((day) => {
      const i = week.indexOf(day); // 0 ~ 6
      const tempDate = new Date();
      tempDate.setDate(today.getDate() - today.getDay() + i);
      const yyyymmdd = `${tempDate.getFullYear()}-${String(
        tempDate.getMonth() + 1
      ).padStart(2, '0')}-${String(tempDate.getDate()).padStart(2, '0')}`;
      thisWeekDates.push(yyyymmdd);
    });

    return thisWeekDates;
  }

  function getToday() {
    const week = ['일', '월', '화', '수', '목', '금', '토'];
    const today = new Date();
    const yyyymmdd = `${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}`;
    return week[new Date(yyyymmdd).getDay()];
  }

  const thisWeekDates = getThisWeekDates();
  console.log(thisWeekDates);
  const today = getToday();
  console.log(today);

  return (
    <div className='flex w-full flex-col items-center'>
      <div>{thisWeek[currentWeek]}</div>
      {trainingDay.map((day, index) => {
        return (
          <div key={index}>
            <div className='relative m-2 flex space-x-3'>
              {trainingDay.includes(day) ? (
                <>
                  {doneDaysDates.includes(thisWeekDates[index]) ? (
                    <div className='absolute bottom-[0.2rem] left-[-1rem]'>
                      ✅
                    </div>
                  ) : today === day ? (
                    <div className='absolute bottom-[0.2rem] left-[-1rem] animate-bounce-fast'>
                      🐢
                    </div>
                  ) : (
                    ''
                  )}
                  {today === day ? (
                    <p className='text-xl font-semibold'>
                      {day} : {training[index]}
                    </p>
                  ) : (
                    <p>
                      {day} : {training[index]}
                    </p>
                  )}
                </>
              ) : (
                <p>
                  {day} : {training[index]}
                </p>
              )}
              {weekWeights[currentWeek][index].map((weight, i) => (
                <div key={i} className='flex flex-col items-center'>
                  {today === day ? (
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
