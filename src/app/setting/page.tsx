import DarkMode from '../_component/DarkMode';
import { cookies } from 'next/headers';

export default function Setting() {
  let res = cookies().get('mode');
  console.log(res);
  return (
    <div>
      <p>설정</p>
      <DarkMode />
    </div>
  );
}
