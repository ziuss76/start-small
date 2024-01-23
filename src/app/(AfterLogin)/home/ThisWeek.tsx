import GetWeekWeights from './GetWeekWeights';
import UpdateCurWeek from './UpdateCurWeek';
import Image from 'next/image';
import favicon from '@/../public/icons/android-chrome-192x192.png';

export default async function ThisWeek({
  result,
  today,
  doneDaysDates,
  thisWeekDates,
}: {
  result: any;
  today: string;
  doneDaysDates: string[];
  thisWeekDates: string[];
}) {
  const training = ['프레스', '스쿼트', '벤치', '데드'];
  const weekWeights = GetWeekWeights(result);
  const thisWeek = ['1주', '2주', '3주'];
  const trainingDays = ['월', '화', '목', '금'];

  let currentWeek = UpdateCurWeek(doneDaysDates, thisWeekDates);

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
                  <div className='absolute bottom-[0.1rem] left-[-1.2rem] animate-bounce-fast'>
                    <Image
                      src={favicon}
                      className='inline-block'
                      alt='거북이'
                      width={26}
                      height={26}
                    />
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
              {weekWeights[currentWeek][index].map(
                (
                  weight: number,
                  i: number // Add type annotations to 'weight' and 'i'
                ) => (
                  <div key={i} className='flex flex-col items-center'>
                    {today === day ? (
                      <p className='text-xl font-semibold'>{weight}</p>
                    ) : (
                      <p>{weight}</p>
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
