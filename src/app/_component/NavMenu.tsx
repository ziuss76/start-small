'use client';
import { useSelectedLayoutSegment } from 'next/navigation';
import {
  IoHome,
  IoHomeOutline,
  IoCalendar,
  IoCalendarOutline,
  IoBarChart,
  IoBarChartOutline,
  IoSettings,
  IoSettingsOutline,
} from 'react-icons/io5';
import { RiFocusFill, RiFocusLine } from 'react-icons/ri';

import Link from 'next/link';

export default function NavMenu() {
  const segment = useSelectedLayoutSegment();

  return (
    <nav className='absolute bottom-0 flex h-20 w-full max-w-screen-md  text-center '>
      <Link
        className='flex h-full w-1/5 items-center justify-center'
        href='/calendar'
      >
        <div className='mb-2 flex flex-col items-center'>
          {segment === 'calendar' ? (
            <>
              <IoCalendar size={30} />
              <p className='text-sm'>캘린더</p>
            </>
          ) : (
            <>
              <IoCalendarOutline size={30} />
              <p className='text-sm'>캘린더</p>
            </>
          )}
        </div>
      </Link>
      <Link
        className='flex h-full w-1/5 items-center justify-center'
        href='/graph'
      >
        <div className='mb-2 flex flex-col items-center'>
          {segment === 'graph' ? (
            <>
              <IoBarChart size={30} />
              <p className='text-sm'>그래프</p>
            </>
          ) : (
            <>
              <IoBarChartOutline size={30} />
              <p className='text-sm'>그래프</p>
            </>
          )}
        </div>
      </Link>
      <Link
        className='flex h-full w-1/5 items-center justify-center'
        href='/home'
      >
        <div className='mb-2 flex flex-col items-center'>
          {segment === 'home' ? (
            <>
              <IoHome size={30} />
              <p className='text-sm'>홈</p>
            </>
          ) : (
            <>
              <IoHomeOutline size={30} />
              <p className='text-sm'>홈</p>
            </>
          )}
        </div>
      </Link>
      <Link
        className='flex h-full w-1/5 items-center justify-center'
        href='/mind'
      >
        <div className='mb-2 flex flex-col items-center'>
          {segment === 'mind' ? (
            <>
              <RiFocusFill size={30} />
              <p className='text-sm'>명상</p>
            </>
          ) : (
            <>
              <RiFocusLine size={30} />
              <p className='text-sm'>명상</p>
            </>
          )}
        </div>
      </Link>
      <Link
        className='flex h-full w-1/5 items-center justify-center'
        href='/setting'
      >
        <div className='mb-2 flex flex-col items-center'>
          {segment === 'setting' ? (
            <>
              <IoSettings size={30} />
              <p className='text-sm'>설정</p>
            </>
          ) : (
            <>
              <IoSettingsOutline size={30} />
              <p className='text-sm'>설정</p>
            </>
          )}
        </div>
      </Link>
    </nav>
  );
}
