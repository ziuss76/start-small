'use client';
import { useState } from 'react';
import Calendar from 'react-calendar';
import './MyCalendar.css';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Seoul');

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function MyCalendar({
  doneDaysDates,
}: {
  doneDaysDates: string[];
}) {
  const [value, onChange] = useState<Value>(dayjs().tz().toDate());

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    const dateString = dayjs(date).format('YYYY-MM-DD');

    if (view === 'month' && doneDaysDates.includes(dateString)) {
      // 현재 달이 보이는 경우 && doneDaysDates에 해당 date가 포함되어 있으면
      return 'done-dates-highlight';
    }
  };

  return (
    <div>
      <Calendar
        onChange={onChange}
        value={value}
        locale='ko-KR'
        calendarType='US'
        next2Label={null}
        prev2Label={null}
        minDetail='month'
        tileClassName={tileClassName}
        formatDay={(locale, date) => dayjs(date).format('D')}
      />
    </div>
  );
}
