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
  const thisWeek = ['1주', '2주', '3주', '4주'];
  const trainingDays = ['월', '화', '목', '금'];

  let currentWeek = UpdateCurWeek(doneDaysDates, thisWeekDates);

  return (
    <div className='flex w-full flex-col items-center'>
      <div>{thisWeek[currentWeek]}</div>
      {trainingDays.map((day, index) => {
        return (
          <div key={index}>
            <div className='m-1 flex flex-col space-x-3 space-y-2'>
              <div className='relative'>
                {doneDaysDates.includes(thisWeekDates[index]) ? (
                  <div className='absolute bottom-[-0.01rem] left-[4.45rem]'>
                    ✅
                  </div>
                ) : today === day ? (
                  <div className='absolute bottom-[-0.12rem] left-[3.6rem] animate-bounce-fast'>
                    <Image
                      src={favicon}
                      className='inline-block'
                      alt='거북이'
                      width={32}
                      height={32}
                    />
                  </div>
                ) : (
                  ''
                )}
                {today === day ? (
                  <p className='ml-3 text-xl font-semibold'>
                    {day} - {training[index]}
                  </p>
                ) : (
                  <p className='ml-3'>
                    {day} - {training[index]}
                  </p>
                )}
              </div>
              <div className='flex space-x-2'>
                {weekWeights[currentWeek][index].map(
                  (weight: number, i: number) => (
                    <div key={i} className='flex flex-col items-center'>
                      {today === day ? (
                        <div className='flex h-[3.5rem] w-[3.5rem] items-center justify-center rounded-full bg-slate-50 text-xl font-medium text-slate-900 shadow-md active:bg-slate-200 dark:bg-slate-700 dark:text-white dark:active:bg-slate-600'>
                          {weight}
                        </div>
                      ) : (
                        <div className='text-md flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 font-medium text-slate-900 shadow-md active:bg-slate-200 dark:bg-slate-700 dark:text-white dark:active:bg-slate-600'>
                          {weight}
                        </div>
                      )}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
