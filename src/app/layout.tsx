import type { Metadata } from 'next';
import { Viewport } from 'next';
import './globals.css';

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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <div className='flex justify-center'>
        <div>{children}</div>
        <div className='absolute bottom-0 flex h-20 w-full max-w-screen-md bg-blue-400 text-center'>
          <div className='flex h-full w-1/5 items-center justify-center'>
            <div>홈</div>
          </div>
          <div className='flex h-full w-1/5 items-center justify-center'>
            <div>캘린더</div>
          </div>
          <div className='flex h-full w-1/5 items-center justify-center'>
            <div>명상</div>
          </div>
          <div className='flex h-full w-1/5 items-center justify-center'>
            <div>그래프</div>
          </div>
          <div className='flex h-full w-1/5 items-center justify-center'>
            <div>설정</div>
          </div>
        </div>
      </div>
    </html>
  );
}
