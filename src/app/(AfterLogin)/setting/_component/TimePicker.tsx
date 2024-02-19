import { useState, useEffect } from 'react';

interface TimePickerProps {
  onTimeChange: (newTime: {
    hours: string;
    minutes: string;
    ampm: string;
  }) => void;
  disabled?: boolean;
  time: {
    hours: string;
    minutes: string;
    ampm: string;
  };
}

export default function TimePicker({
  onTimeChange,
  disabled,
  time,
}: TimePickerProps) {
  const [selectedTime, setSelectedTime] = useState(time);

  useEffect(() => {
    setSelectedTime(time);
  }, [time]);

  // 아래 handleChange 때문에 selectedTime이 수시로 바뀔 수 있어서 time !== selectedTime 일 수 있음
  // if (time !== selectedTime) { setSelectedTime(time); }
  // 위 조건문으로 useEffect를 대체해보려 했지만 쓸 수 밖에 없는 듯 하다

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newTime = {
      ...selectedTime,
      [event.target.name]: event.target.value, // computed property name 으로 연결된 키 값을 동적으로 할당
    };
    setSelectedTime(newTime);
    onTimeChange(newTime);
  };

  return (
    <div className='w-[10rem] rounded-lg bg-slate-50 px-1 py-1.5 text-slate-900 shadow-md active:bg-slate-200 dark:bg-slate-700 dark:text-white dark:active:bg-slate-600'>
      <div className='flex'>
        <select
          name='hours'
          className='flex-[0.95] appearance-none bg-transparent pl-1.5 text-lg outline-none'
          onChange={handleChange}
          disabled={disabled}
          value={selectedTime.hours}
        >
          <option value='0'>0</option>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
          <option value='5'>5</option>
          <option value='6'>6</option>
          <option value='7'>7</option>
          <option value='8'>8</option>
          <option value='9'>9</option>
          <option value='10'>10</option>
          <option value='11'>11</option>
          <option value='12'>12</option>
        </select>

        <span
          className={`-translate-y-[0.1rem] transform text-lg ${
            disabled && 'text-green-500'
          }`}
        >
          :
        </span>

        <select
          name='minutes'
          className='flex-1 appearance-none bg-transparent pl-1 text-lg outline-none'
          onChange={handleChange}
          disabled={disabled}
          value={selectedTime.minutes}
        >
          <option value='0'>00</option>
          <option value='10'>10</option>
          <option value='20'>20</option>
          <option value='30'>30</option>
          <option value='40'>40</option>
          <option value='50'>50</option>
        </select>
        <select
          name='ampm'
          className='flex-1 appearance-none bg-transparent pr-2.5 text-lg outline-none'
          onChange={handleChange}
          disabled={disabled}
          value={selectedTime.ampm}
        >
          <option value='am'>AM</option>
          <option value='pm'>PM</option>
        </select>
      </div>
    </div>
  );
}
