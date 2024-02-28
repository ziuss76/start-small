'use client';
import { useState, useEffect } from 'react';
import { useSelectedLayoutSegment } from 'next/navigation';

export default function Title() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const segment = useSelectedLayoutSegment();

  const titleMap: { [key: string]: string } = {
    calendar: '캘린더',
    graph: '그래프',
    home: '홈',
    mind: '명상',
    setting: '설정',
  };

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerHeight <= 735);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  if (isSmallScreen) {
    return <div className='h-3'></div>;
  }

  return (
    <div className='h-12'>
      <div className='flex h-full w-full items-center justify-center text-center text-lg'>
        <div>{titleMap[segment as string]}</div>
      </div>
    </div>
  );
}
