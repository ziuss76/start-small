import MyCalendar from './MyCalendar';
import clientPromise from '@/../util/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/../pages/api/auth/[...nextauth]';

export default async function Calendar() {
  const session = await getServerSession(authOptions);
  interface UserInfo {
    user: {
      name: string;
      email: string;
      image: string;
    };
  }

  let userInfo: UserInfo | null = null;

  if (session) {
    userInfo = JSON.parse(JSON.stringify(session));
  }
  const userEmail = userInfo?.user.email;

  let db = (await clientPromise)?.db('StartSmall');
  let result = await db
    ?.collection('trainingmaxes')
    .find({ email: userEmail })
    .toArray();

  result = result.map((a: any) => {
    a._id = a._id.toString();
    return a;
  });

  const doneDays = await db?.collection('donedays').find().toArray();
  const doneDaysDates = doneDays.map((doc) => doc.today);
  return (
    <div className='flex justify-center'>
      <div className='h-[100dvh] w-[100dvw] max-w-screen-md'>
        <div className='mb-1 h-16'>
          <div className='flex h-full w-full items-center justify-center text-center text-xl'>
            <div>캘린더</div>
          </div>
        </div>
        <div className='flex h-5/6'>
          <div className='mx-3 flex h-full w-full flex-col justify-start text-center'>
            <div className=' mb-3 flex h-4/6 w-full items-center justify-center rounded-lg bg-slate-300 text-center dark:bg-slate-500'>
              <MyCalendar doneDaysDates={doneDaysDates} />
            </div>
            <div className='flex h-1/5 w-full items-center justify-center rounded-lg bg-slate-300 text-center dark:bg-slate-500'>
              <div>이번 달의 운동 기록</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
