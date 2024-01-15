import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Seoul');

export default function UpdateCurWeek(
  doneDaysDates: string[],
  thisWeekDates: string[]
) {
  let currentWeek = 0;
  if (doneDaysDates.length === 0) {
    return currentWeek; // 운동 기록이 없으면 1주차 (0 반환)
  }
  // doneDaysDates의 첫 번째 날짜
  const firstDoneDate = dayjs(doneDaysDates[0]).tz();
  // thisWeekDates의 첫 번째 날짜
  const firstThisWeekDate = dayjs(thisWeekDates[0]).tz();
  // 두 날짜 사이의 차이 계산
  const diffInTime = firstThisWeekDate.diff(firstDoneDate);
  // 차이를 주 단위로 변환
  let diffInWeeks = Math.ceil(diffInTime / (1000 * 3600 * 24 * 7));
  // 주차 계산 (0,1,2 반복)
  currentWeek = Math.abs(diffInWeeks % 3); // 위 나눗셈에서 -0 방지
  return currentWeek;
}
