import clientPromise from '@/../util/db';
import { revalidatePath } from 'next/cache';

export default async function inputWeight() {
  const today = new Date();
  const yyyymmdd = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;

  async function handleSubmit(formData: FormData) {
    'use server';
    let shouldRedirect = false;
    try {
      let db = (await clientPromise)?.db('StartSmall');
      await db?.collection('calendar').insertOne({
        today: new Date(yyyymmdd),
      });
      shouldRedirect = true;
    } catch (err) {
      console.error(err);
      return;
    }
    if (shouldRedirect) revalidatePath('/home');
  }
  return (
    <form action={handleSubmit}>
      <button className='text-md mt-4 w-32 rounded-lg bg-slate-50 px-5 py-2 font-medium text-slate-900 shadow-md hover:bg-slate-200 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600'>
        빅토리!
      </button>
    </form>
  );
}
