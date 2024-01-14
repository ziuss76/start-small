'use client';
import LowerWeight from './LowerWeight';

export default function LowerBtn() {
  return (
    <form
      action={async () => {
        const confirmDelete = window.confirm(
          'TM 중량을 10% 낮추시겠습니까? 해당 종목을 2번 이상 실패했을 때 권장합니다.'
        );
        if (confirmDelete) await LowerWeight();
      }}
    >
      <button
        type='submit'
        className='rounded-lg bg-slate-700 px-5 py-2.5 text-sm font-medium text-white shadow-md hover:bg-slate-600'
      >
        <p>❗️ 중량 낮추기</p>
      </button>
    </form>
  );
}
