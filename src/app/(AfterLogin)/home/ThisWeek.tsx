import clientPromise from '@/../util/db';
import WeekWeights from './WeekWeights';

export default async function CalWeight(result: any) {
  const training = ['프레스', '스쿼트', '벤치', '데드'];
  const weekWeights = WeekWeights(result);

  const thisWeek = ['1주', '2주', '3주'];
  let currentWeek = 0;
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const trainingDays = ['월', '화', '목', '금'];

  const curDate = new Date();
  const offset = new Date().getTimezoneOffset() / 60; // -9
  curDate.setHours(curDate.getHours() - offset);
  console.log(curDate.getUTCDay());
  // UTC 시간으로 설정

  const db = (await clientPromise)?.db('StartSmall');
  const doneDays = await db?.collection('donedays').find().toArray();
  let doneDaysDates = doneDays.map(
    (doc) => doc.today.toISOString().split('T')[0] // Date 객체를 ISOString 형식 문자열로 변환후 날짜만 추출
  );

  function getThisWeekDates() {
    const thisWeekDates: string[] = [];

    trainingDays.forEach((day) => {
      // 월, 화, 목, 금
      const i = week.indexOf(day); // 1, 2, 4, 5
      const tempDate = new Date(); // 현재 날짜 로컬 시간

      tempDate.setDate(curDate.getDate() - curDate.getDay() + i);
      // 현재 날을 빼줘서 일요일로 만든 다음 i만큼 더해주면 월, 화, 목, 금의 날짜로 설정됨

      const yyyymmdd = `${tempDate.getFullYear()}-${String(
        tempDate.getMonth() + 1
      ).padStart(2, '0')}-${String(tempDate.getDate()).padStart(2, '0')}`; // YYYY-MM-DD 형식으로
      thisWeekDates.push(yyyymmdd);
    });

    return thisWeekDates;
  }
  let thisWeekDates = getThisWeekDates();

  function updateCurrentWeek() {
    if (doneDaysDates.length === 0) {
      currentWeek = 0;
      return; // 운동 기록이 없으면 1주차
    }
    // doneDaysDates의 마지막 날짜
    const lastDoneDate = new Date(doneDaysDates[doneDaysDates.length - 1]);
    // thisWeekDates의 첫 번째 날짜
    const firstThisWeekDate = new Date(thisWeekDates[0]);
    // 두 날짜 사이의 차이 계산
    const diffInTime = firstThisWeekDate.getTime() - lastDoneDate.getTime();
    // 차이를 일 단위로 변환
    let diffInDays = diffInTime / (1000 * 3600 * 24);
    // diffInDays가 음수면 0으로 설정
    if (diffInDays < 0) {
      diffInDays = 0;
    }
    // 주차 계산
    currentWeek = Math.ceil(diffInDays / 7) % 3;
  }

  console.log(doneDaysDates);
  console.log(thisWeekDates);
  updateCurrentWeek();

  function getToday() {
    return week[curDate.getDay()]; // 요일 구하기
  }
  const today = getToday();
  console.log(today);

  return (
    <div className='flex w-full flex-col items-center'>
      <div>{thisWeek[currentWeek]}</div>
      {trainingDays.map((day, index) => {
        return (
          <div key={index}>
            <div className='relative m-2 flex space-x-3'>
              <>
                {doneDaysDates.includes(thisWeekDates[index]) ? (
                  <div className='absolute left-[-1rem]'>✅</div>
                ) : today === day ? (
                  <div className='absolute left-[-1rem] animate-bounce-fast'>
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
              {weekWeights[currentWeek][index].map((weight, i) => (
                <div key={i} className='flex flex-col items-center'>
                  {today === day ? (
                    <p className='text-xl font-semibold'>{weight}</p>
                  ) : (
                    <p>{weight}</p>
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
