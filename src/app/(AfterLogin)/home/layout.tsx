export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex justify-center'>
      <div className='h-[100dvh] w-[100dvw] max-w-screen-md'>
        <div className='mb-1 h-16'>
          <div className='flex h-full w-full items-center justify-center text-center text-xl'>
            <div>홈</div>
          </div>
        </div>
        <div className='flex h-5/6'>{children}</div>
      </div>
    </div>
  );
}
