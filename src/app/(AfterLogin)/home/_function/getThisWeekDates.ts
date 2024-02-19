export default function getThisWeekDates(curDate: any) {
  const trainingDays = ['월', '화', '목', '금'];
  const week = ['일', '월', '화', '수', '목', '금', '토'];
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
