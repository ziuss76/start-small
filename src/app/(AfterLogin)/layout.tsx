import NavMenu from './home/NavMenu';
import '../globals.css';

export default function AfterLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex h-[100dvh] w-[100dvw] items-center justify-center'>
      <div>{children}</div>
      <NavMenu />
    </div>
  );
}
