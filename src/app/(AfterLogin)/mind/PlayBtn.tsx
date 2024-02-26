'use client';

import { useState } from 'react';
const twoMinsMed = '/sounds/twoMinsMed.mp3';
// import twoMinsMed from 'public/sounds/twoMinsMed.mp3';
// 모듈로 변환할 수 없어 정적 파일로 제공하기

export default function PlayBtn() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlaySound = () => {
    setIsPlaying(true);
  };

  return !isPlaying ? (
    <>
      <p>4-6 숨쉬기에 익숙해지면 명상을 시작하세요!</p>
      <button
        onClick={handlePlaySound}
        className='text-md mt-4 w-32 rounded-lg bg-slate-50 px-5 py-2 font-medium text-slate-900 shadow-md active:bg-slate-200 dark:bg-slate-700 dark:text-white dark:active:bg-slate-600'
      >
        시작
      </button>
    </>
  ) : (
    <>
      <audio src={twoMinsMed} controls autoPlay></audio>
    </>
  );
}
