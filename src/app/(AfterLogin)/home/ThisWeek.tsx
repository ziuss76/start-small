import clientPromise from '@/../util/db';
import WeekWeights from './WeekWeights';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Seoul');

export default async function CalWeight(result: any) {
  const training = ['프레스', '스쿼트', '벤치', '데드'];
  const weekWeights = WeekWeights(result);

  const thisWeek = ['1주', '2주', '3주'];
  let currentWeek = 0;
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const trainingDays = ['월', '화', '목', '금'];

  const curDate = dayjs();
  function getToday() {
    return week[curDate.day()]; // 요일 구하기
  }
  const today = getToday();

  const db = (await clientPromise)?.db('StartSmall');
  const doneDays = await db?.collection('donedays').find().toArray();
  const doneDaysDates = doneDays.map(
    (doc) => doc.today.split('T')[0] // ISOString 형식 문자열에서 날짜만 추출
  );

  function getThisWeekDates() {
    const thisWeekDates: string[] = [];

    trainingDays.forEach((day) => {
      // 월, 화, 목, 금
      const i = week.indexOf(day); // 1, 2, 4, 5
      const tempDate = curDate.subtract(curDate.day(), 'day').add(i, 'day');
      // subtract(dayjs(curDate).day(), 'day')는 현재 날짜에서 요일만큼 빼서 일요일로 만들고,
      // add(i, 'day')는 일요일에 i만큼 더하여 원하는 요일로 만듬
      const yyyymmdd = tempDate.format('YYYY-MM-DD');
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
