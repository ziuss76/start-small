'use client';

import { useEffect, useState } from 'react';

export default function DarkModeBtn() {
  let [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    let res = document.cookie.split('; ').filter((item) => {
      return item.includes('mode');
    });
    if (res.length > 0) {
      if (res[0].includes('dark')) {
        document.documentElement.classList.add('dark'); // html 태그에 dark 클래스 추가
        setDarkMode(true);
      } else {
        document.documentElement.classList.remove('dark');
        setDarkMode(false);
      }
    }
  }, []);

  const darkModeToggle = () => {
    let aYear = 365 * 24 * 3600;
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      document.cookie = 'mode=light; max-age=' + aYear;
      setDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      document.cookie = 'mode=dark; max-age=' + aYear;
      setDarkMode(true);
    }
  };

  return darkMode ? (
    <button
      type='button'
      className='rounded-lg bg-slate-50 px-5 py-2.5 text-sm font-medium text-slate-900 shadow-md active:bg-slate-200'
      onClick={darkModeToggle}
    >
      ☀️ 밝은 모드로
    </button>
  ) : (
    <button
      type='button'
      className='rounded-lg bg-slate-700 px-5 py-2.5 text-sm font-medium text-white shadow-md active:bg-slate-600'
      onClick={darkModeToggle}
    >
      🌙 어두운 모드로
    </button>
  );
}
