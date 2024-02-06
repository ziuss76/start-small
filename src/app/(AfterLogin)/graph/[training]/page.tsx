import GraphBtn from '../GraphBtn';
import TMGraph from '../TMGraph';
import { getUserAndDb } from '@/app/_component/getUserAndDb';

export default async function Graph({
  params,
}: {
  params: { training: string };
}) {
  const { userInfo, db } = await getUserAndDb();
  const userEmail = userInfo?.user.email;
  const training = params.training;

  let result = await db
    ?.collection('trainingmaxes')
    .find({ email: userEmail }, { sort: { date: 1 } })
    .toArray();

  let weightAndDate = result.map(({ _id, email, ...rest }) => ({
    ...rest,
  }));

  return (
    <div className='mx-3 flex h-full w-full flex-col justify-start text-center'>
      <div className='mb-3 flex h-4/6 w-full items-center justify-center rounded-lg bg-slate-300 px-4 py-8 text-center dark:bg-slate-500'>
        <TMGraph weightAndDate={weightAndDate} training={training} />
      </div>
      <div className='flex h-1/5 w-full items-center justify-center rounded-lg bg-slate-300 text-center dark:bg-slate-500'>
        <GraphBtn />
      </div>
    </div>
  );
}
