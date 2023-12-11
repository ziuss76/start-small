import Link from 'next/link';
import '../globals.css';

export default function AfterLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <nav className='flex h-[100dvh] w-[100dvw] items-center justify-center'>
      <div>{children}</div>
      <div className='absolute bottom-0 flex h-20 w-full max-w-screen-md bg-slate-400 text-center dark:bg-slate-600'>
        <div className='flex h-full w-1/5 items-center justify-center'>
          <Link href='/calendar'>캘린더</Link>
        </div>
        <div className='flex h-full w-1/5 items-center justify-center'>
          <Link href='/graph'>그래프</Link>
        </div>
        <div className='flex h-full w-1/5 items-center justify-center'>
          <Link href='/home'>
            <p>홈</p>
          </Link>
        </div>
        <div className='flex h-full w-1/5 items-center justify-center'>
          <Link href='/mind'>명상</Link>
        </div>
        <div className='flex h-full w-1/5 items-center justify-center'>
          <Link href='/setting'>설정</Link>
        </div>
      </div>
    </nav>
  );
}
