'use client';
import ResetWeight from './ResetWeight';

export default function ResetBtn() {
  return (
    <form
      action={async () => {
        const confirmDelete = window.confirm(
          '중량 데이터를 모두 삭제하시겠습니까?'
        );
        if (confirmDelete) await ResetWeight();
      }}
    >
      <button
        type='submit'
        className='rounded-lg bg-slate-50 px-5 py-2.5 text-sm font-medium text-slate-900 shadow-md active:bg-slate-200 dark:bg-slate-700 dark:text-white dark:active:bg-slate-600'
      >
        <p>❗️ 중량 초기화</p>
      </button>
    </form>
  );
}
