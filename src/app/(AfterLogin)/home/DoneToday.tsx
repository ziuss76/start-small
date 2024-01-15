'use server';
import clientPromise from '@/../util/db';
import { revalidatePath } from 'next/cache';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Seoul');

export async function DoneToday() {
  const curDate = dayjs().tz().format('YYYY-MM-DD'); // ISOString 형식 문자열로 변환

  let shouldRedirect = false;
  try {
    let db = (await clientPromise)?.db('StartSmall');
    const collection = db?.collection('donedays');
    const existingDocument = await collection?.findOne({
      today: curDate, // 여기서 curDate를 new Date 로 감싸서 넣으면 다시 UTC로 변환되니 조심
    });
    if (!existingDocument) {
      await collection?.insertOne({
        today: curDate,
      });
      shouldRedirect = true;
    }
  } catch (err) {
    console.error(err);
    return;
  }
  if (shouldRedirect) revalidatePath('/home');
}
