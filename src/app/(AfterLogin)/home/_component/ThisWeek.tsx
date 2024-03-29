import getWeekWeights from '../_function/getWeekWeights';
import updateCurWeek from '../_function/updateCurWeek';
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
  const trainingDays = ['월', '화', '목', '금'];
  const training = ['프레스', '스쿼트', '벤치', '데드'];
  const weekWeights = getWeekWeights(result); // 4주분의 운동중량
  let currentWeek = updateCurWeek(doneDaysDates, thisWeekDates); // 0 1 2 3

  return (
    <div className='flex w-full flex-col items-center'>
      {trainingDays.map((day, index) => {
        return (
          <div key={index}>
            <div className='m-2 flex flex-col items-center space-y-2'>
              <div className='relative'>
                {doneDaysDates.includes(thisWeekDates[index]) ? (
                  <div className='absolute bottom-[-0.02rem] left-[-1.6rem]'>
                    ✅
                  </div>
                ) : today === day ? (
                  <div className='absolute bottom-[-0.1rem] left-[-2.2rem] animate-bounce-fast'>
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
                  <div className='flex h-[1.8rem] w-[7.5rem] items-center justify-center rounded-xl bg-slate-50 text-lg font-semibold text-slate-900 shadow-md active:bg-slate-200 dark:bg-slate-700 dark:text-white dark:active:bg-slate-600'>
                    {day} - {training[index]}
                  </div>
                ) : (
                  <div className='flex h-[1.7rem] w-[6rem] items-center justify-center rounded-xl bg-slate-50 text-[1rem] font-medium text-slate-900 shadow-md active:bg-slate-200 dark:bg-slate-700 dark:text-white dark:active:bg-slate-600'>
                    {day} - {training[index]}
                  </div>
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
                        <div className='flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-full bg-slate-50 text-[0.85rem] font-medium text-slate-900 shadow-md active:bg-slate-200 dark:bg-slate-700 dark:text-white dark:active:bg-slate-600'>
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
