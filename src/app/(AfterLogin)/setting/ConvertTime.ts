function convertTo12HourFormat(time: string): {
  hours: string;
  minutes: string;
  ampm: string;
} {
  const [hours24, minutes] = time.split(':');
  let hours = parseInt(hours24);
  let ampm = 'am';

  if (hours === 12 && parseInt(minutes) === 0) {
    // 정오 = 12:00 AM
    ampm = 'am';
  } else if (hours === 12 && parseInt(minutes) > 0) {
    // 정오 이후 = 12:10 PM
    ampm = 'pm';
  } else if (hours > 12) {
    hours -= 12;
    ampm = 'pm';
  }

  return {
    hours: hours.toString(),
    minutes,
    ampm,
  };
}

function convertTo24HourFormat(
  hours: string,
  minutes: string,
  ampm: string
): string {
  let hoursIn24Format = parseInt(hours);
  if (ampm === 'pm' && hoursIn24Format < 12) {
    hoursIn24Format += 12;
  } else if (ampm === 'pm' && hoursIn24Format === 12 && minutes === '00') {
    hoursIn24Format = 0; // 12시 pm = 다음날 0시
  } else if (ampm === 'am' && hoursIn24Format === 12 && parseInt(minutes) > 0) {
    hoursIn24Format = 0; // 12시 10분 am (유저가 0시 대신 12시로 적음) = 0시 10분
  }
  return `${hoursIn24Format.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}`;
}

export { convertTo12HourFormat, convertTo24HourFormat };
