'use client';

import { useEffect } from 'react';

export default function DarkMode() {
  useEffect(() => {
    document.cookie = 'mode=light; max-age=' + 3600 * 24 * 400;
  }, []);

  return <span>다크모드</span>;
}
