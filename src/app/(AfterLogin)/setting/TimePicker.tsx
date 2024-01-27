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

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newTime = {
      ...selectedTime,
      [event.target.name]: event.target.value,
    };
    setSelectedTime(newTime);
    onTimeChange(newTime);
  };

  return (
    <div className='w-[10rem] rounded-lg bg-slate-50 px-1 py-1.5 text-slate-900 shadow-md active:bg-slate-200 dark:bg-slate-700 dark:text-white dark:active:bg-slate-600'>
      <div className='flex'>
        <select
          name='hours'
          className='text-align-last flex-1 appearance-none bg-transparent text-center text-lg outline-none'
          onChange={handleChange}
          disabled={disabled}
          value={selectedTime.hours}
        >
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
          className='text-align-last ml-1 flex-1 appearance-none bg-transparent text-center text-lg outline-none'
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
          className='text-align-last mr-2 flex-1 appearance-none bg-transparent text-center text-lg outline-none'
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
