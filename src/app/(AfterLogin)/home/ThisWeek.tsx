import clientPromise from '@/../util/db';
import WeekWeights from './WeekWeights';

export default async function CalWeight(result: any) {
  const training = ['프레스', '스쿼트', '벤치', '데드'];
  const weekWeights = WeekWeights(result);

  const thisWeek = ['1주', '2주', '3주'];
  const currentWeek = 0;
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const trainingDays = ['월', '화', '목', '금'];
  const curDate = new Date();

  const db = (await clientPromise)?.db('StartSmall');
  const doneDays = await db?.collection('donedays').find().toArray();
  const doneDaysDates = doneDays.map(
    (doc) => doc.today.toISOString().split('T')[0]
  );

  console.log(doneDaysDates);

  function getThisWeekDates() {
    const thisWeekDates: string[] = [];

    trainingDays.forEach((day) => {
      const i = week.indexOf(day); // 0 ~ 6
      const tempDate = new Date();

      tempDate.setDate(curDate.getDate() - curDate.getDay() + i);

      const yyyymmdd = `${tempDate.getFullYear()}-${String(
        tempDate.getMonth() + 1
      ).padStart(2, '0')}-${String(tempDate.getDate()).padStart(2, '0')}`;

      thisWeekDates.push(yyyymmdd);
    });

    return thisWeekDates;
  }

  function getToday() {
    const yyyymmdd = `${curDate.getFullYear()}-${
      curDate.getMonth() + 1
    }-${curDate.getDate()}`;

    return week[new Date(yyyymmdd).getDay()];
  }

  const thisWeekDates = getThisWeekDates();
  console.log(thisWeekDates);
  const today = getToday();
  console.log(today);

  return (
    <div className='flex w-full flex-col items-center'>
      <div>{thisWeek[currentWeek]}</div>
      {trainingDays.map((day, index) => {
        return (
          <div key={index}>
            <div className='relative m-2 flex space-x-3'>
              {trainingDays.includes(day) ? (
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
