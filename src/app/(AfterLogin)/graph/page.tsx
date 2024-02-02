import clientPromise from '@/../util/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/../pages/api/auth/[...nextauth]';
import TMGraph from './TMGraph';

export default async function Graph() {
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
    .find({ email: userEmail }, { sort: { date: -1 } })
    .toArray();

  console.log(result);

  const trainings = ['프레스', '스쿼트', '3대 1RM', '벤치', '데드'];

  return (
    <div className='flex justify-center'>
      <div className='h-[100dvh] w-[100dvw] max-w-screen-md'>
        <div className='mb-1 h-16'>
          <div className='flex h-full w-full items-center justify-center text-center text-xl'>
            <div>그래프</div>
          </div>
        </div>
        <div className='flex h-5/6'>
          <div className='mx-3 flex h-full w-full flex-col justify-start text-center'>
            <div className=' mb-3 flex h-4/6 w-full items-center justify-center rounded-lg bg-slate-300 text-center dark:bg-slate-500'>
              <TMGraph />
            </div>
            <div className='flex h-1/5 w-full items-center justify-center rounded-lg bg-slate-300 text-center dark:bg-slate-500'>
              <div className='mt-2.5 grid grid-cols-3 gap-1.5'>
                {trainings.map((training, i) => (
                  <button
                    type='submit'
                    key={i}
                    className={`w-[4.8rem] rounded-lg bg-slate-50 px-2 py-2.5 text-sm font-medium text-slate-900 shadow-md active:bg-slate-200 dark:bg-slate-700 dark:text-white dark:active:bg-slate-600 ${
                      training === '3대 1RM' ? 'row-span-2' : ''
                    }`}
                  >
                    <p>{training}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
