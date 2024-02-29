import CheckDarkMode from '@/app/_component/CheckDarkMode';
import NavMenu from '../_component/NavMenu';
import '../globals.css';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/api/auth/[...nextauth]/authOptions';
import { redirect } from 'next/navigation';
import Title from '../_component/Title';

export default async function AfterLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let session = await getServerSession(authOptions);
  return (
    <div className='flex h-[100dvh] w-[100dvw] max-w-screen-md flex-col'>
      <CheckDarkMode />
      {!session && redirect('/')}
      <Title />
      <div className='h-[92%] w-full overflow-auto pb-20'>{children}</div>
      <NavMenu />
    </div>
  );
}
