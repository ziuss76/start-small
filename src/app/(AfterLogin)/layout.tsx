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
        <Link
          className='flex h-full w-1/5 items-center justify-center'
          href='/calendar'
        >
          캘린더
        </Link>
        <Link
          className='flex h-full w-1/5 items-center justify-center'
          href='/graph'
        >
          그래프
        </Link>
        <Link
          className='flex h-full w-1/5 items-center justify-center'
          href='/home'
        >
          홈
        </Link>
        <Link
          className='flex h-full w-1/5 items-center justify-center'
          href='/mind'
        >
          명상
        </Link>
        <Link
          className='flex h-full w-1/5 items-center justify-center'
          href='/setting'
        >
          설정
        </Link>
      </div>
    </nav>
  );
}
