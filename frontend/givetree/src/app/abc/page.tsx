import { Suspense } from 'react';
import Main from './Main';

export default function Page() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Main />
      </Suspense>
    </div>
  );
}
