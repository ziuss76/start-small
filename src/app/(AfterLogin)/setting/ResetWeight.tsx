'use server';
import clientPromise from '../../../../util/db';
import { redirect } from 'next/navigation';

export default async function ResetWeight() {
  let db = (await clientPromise)?.db('StartSmall');
  await db?.collection('weights').deleteMany({});
  redirect('/home');
}
