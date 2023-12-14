'use client';
import DarkMode from '@/app/_component/DarkMode';
import reset from './ResetWeight';

export default function Setting() {
  return (
    <div className='flex justify-center'>
      <div className='h-[100dvh] w-[100dvw] max-w-screen-md'>
        <div className='mb-2 h-20'>
          <div className='flex h-full w-full items-center justify-center bg-slate-400 text-center dark:bg-slate-600'>
            <div>설정</div>
          </div>
        </div>
        <div className='flex h-5/6'>
          <div className='flex h-full w-full flex-col justify-start text-center'>
            <div className=' mb-2 flex h-16 w-full items-center justify-center bg-slate-300 text-center dark:bg-slate-500'>
              <DarkMode />
            </div>
            <div className=' mb-2 flex h-16 w-full items-center justify-center bg-slate-300 text-center dark:bg-slate-500'>
              <div>운동 시작 시간 설정 (30분 전 pwa 알림)</div>
            </div>
            <div className=' mb-2 flex h-16 w-full items-center justify-center bg-slate-300 text-center dark:bg-slate-500'>
              <div>중량 낮추기 (2번 실패 시 권장)</div>
            </div>
            <div className=' mb-2 flex h-16 w-full items-center justify-center bg-slate-300 text-center dark:bg-slate-500'>
              <div>로그아웃 (유저 데이터 서버에 저장)</div>
            </div>
            <div className=' mb-2 flex h-16 w-full items-center justify-center bg-slate-300 text-center dark:bg-slate-500'>
              <form
                action={async () => {
                  const confirmDelete = window.confirm(
                    '중량 데이터를 모두 삭제하시겠습니까?'
                  );
                  if (confirmDelete) await reset();
                }}
              >
                <button
                  type='submit'
                  className='rounded-lg bg-slate-700 px-5 py-2.5 text-sm font-medium text-white shadow-md hover:bg-slate-600'
                >
                  데이터 리셋 (주의)
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
