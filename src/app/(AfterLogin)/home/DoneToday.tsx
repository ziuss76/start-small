'use server';
import clientPromise from '@/../util/db';
import { revalidatePath } from 'next/cache';

export async function DoneToday() {
  const today = new Date();
  today.setHours(today.getHours() + 9);
  const yyyymmdd = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;
  let shouldRedirect = false;
  try {
    let db = (await clientPromise)?.db('StartSmall');
    const collection = db?.collection('donedays');
    const existingDocument = await collection?.findOne({
      today: new Date(yyyymmdd),
    });
    if (!existingDocument) {
      await collection?.insertOne({
        today: new Date(yyyymmdd),
      });
      shouldRedirect = true;
    }
  } catch (err) {
    console.error(err);
    return;
  }
  if (shouldRedirect) revalidatePath('/home');
}
