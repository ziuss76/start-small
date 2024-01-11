'use server';
import clientPromise from '@/../util/db';
import { revalidatePath } from 'next/cache';

export async function DoneToday() {
  const curDate = new Date();
  const offset = new Date().getTimezoneOffset() / 60; // -9
  curDate.setHours(curDate.getHours() - offset);
  const yyyymmdd = `${curDate.getUTCFullYear()}-${String(
    curDate.getUTCMonth() + 1
  ).padStart(2, '0')}-${String(curDate.getUTCDate()).padStart(2, '0')}`; // YYYY-MM-DD 형식으로

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
