import LoginLoading from '../_component/LoginLoading';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../pages/api/auth/[...nextauth]';
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
