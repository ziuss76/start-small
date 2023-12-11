import LoginButton from '../_component/LoginBtn';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../pages/api/auth/[...nextauth]';
import Redirect from '../_component/Redirect';
import { SessionProp } from '../_component/Redirect';

export default async function Login() {
  let session = await getServerSession(authOptions);

  return (
    <>
      {session && session.user && <Redirect session={session as SessionProp} />}
      <LoginButton
        session={null || { user: { name: '', email: '', image: '' } }}
      />
    </>
  );
}
