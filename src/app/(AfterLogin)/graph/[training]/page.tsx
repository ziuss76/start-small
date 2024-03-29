import GraphBtn from '../_component/GraphBtn';
import TMGraph from '../_component/TMGraph';
import { getUserAndDb } from '@/app/_function/getUserAndDb';

export default async function Graph({
  params,
}: {
  params: { training: string };
}) {
  const { userInfo, db } = await getUserAndDb();
  const userEmail: string | undefined = userInfo?.user.email;
  const training: string = params.training;

  const getWeightAndDate = async () => {
    let result = await db
      ?.collection('trainingmaxes')
      .find({ email: userEmail }, { sort: { date: 1 } })
      .toArray();

    let weightAndDate = result.map(({ _id, email, ...rest }: any) => ({
      ...rest,
    }));

    return weightAndDate;
  };

  const weightAndDate = await getWeightAndDate();

  return (
    <div className='flex h-full w-full justify-center'>
      <div className='mx-3 flex h-full w-full flex-col justify-start text-center'>
        <div className='mb-3 flex h-[75%] w-full items-center justify-center rounded-lg bg-slate-300 px-4 py-8 text-center dark:bg-slate-500'>
          <TMGraph weightAndDate={weightAndDate} training={training} />
        </div>
        <div className='flex h-1/5 w-full flex-col items-center justify-center rounded-lg bg-slate-300 text-center dark:bg-slate-500'>
          <GraphBtn />
        </div>
      </div>
    </div>
  );
}
