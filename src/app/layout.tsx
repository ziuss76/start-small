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
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ko'>
      <body className='flex h-[100dvh] w-[100dvw] items-center justify-center bg-slate-100 text-lg dark:bg-slate-900'>
        <div className='text-slate-950 dark:text-slate-50'>{children}</div>
      </body>
    </html>
  );
}
