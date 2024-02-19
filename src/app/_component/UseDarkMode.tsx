'use client';
import { useEffect } from 'react';

export default function UseDarkMode() {
  useEffect(() => {
    let res = document.cookie.split('; ').filter((item) => {
      return item.includes('mode');
    });
    if (res.length > 0) {
      if (res[0].includes('dark')) {
        document.documentElement.classList.add('dark'); // html 태그에 dark 클래스 추가
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, []);
  return <></>;
}
