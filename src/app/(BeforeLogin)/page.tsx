import LoginLoading from '../_component/LoginLoading';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/api/auth/[...nextauth]/authOptions';
import { redirect } from 'next/navigation';

export default async function Login() {
  let session = await getServerSession(authOptions);

  return (
    <>
      {session && session.user && redirect('/home')}
      <LoginLoading />
    </>
  );
}
