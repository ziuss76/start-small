import type { Metadata } from 'next';
import { Viewport } from 'next';
import './globals.css';
import Link from 'next/link';

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
};

export const metadata: Metadata = {
  title: 'Start Small',
  description: 'Start Small',
  icons: {
    icon: [
      { url: '/icons/android-chrome-192x192.png' },
      { url: '/icons/android-chrome-512x512.png' },
    ],
    apple: '/icons/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ko'>
      <body className='flex h-[100dvh] w-[100dvw] items-center justify-center'>
        <div>{children}</div>
        <div className='absolute bottom-0 flex h-20 w-full max-w-screen-md bg-blue-400 text-center'>
          <div className='flex h-full w-1/5 items-center justify-center'>
            <Link href='/home'>홈</Link>
          </div>
          <div className='flex h-full w-1/5 items-center justify-center'>
            <Link href='/calendar'>캘린더</Link>
          </div>
          <div className='flex h-full w-1/5 items-center justify-center'>
            <Link href='/mind'>명상</Link>
          </div>
          <div className='flex h-full w-1/5 items-center justify-center'>
            <Link href='/graph'>그래프</Link>
          </div>
          <div className='flex h-full w-1/5 items-center justify-center'>
            <Link href='/setting'>설정</Link>
          </div>
        </div>
      </body>
    </html>
  );
}
