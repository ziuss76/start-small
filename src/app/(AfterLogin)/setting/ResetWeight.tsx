'use server';
import { revalidatePath } from 'next/cache';
import clientPromise from '../../../../util/db';
import { redirect } from 'next/navigation';

export default async function ResetWeight() {
  let db = (await clientPromise)?.db('StartSmall');
  await db?.collection('weights').deleteMany({});
  revalidatePath('/home');
  redirect('/home');
}
