import { Suspense } from 'react';
import Tree from '@/components/tree/Tree';
import * as style from './page.css';
import Typography from '@/components/common/Typography';
import colorPalette from '@/styles/tokens/colorPalette';
import typography from '@/styles/tokens/typography';

export default function Page() {
  return (
    <div className={style.background}>
      <Typography color={colorPalette.text[50]} size={typography.size.xl}>안녕</Typography>
      <Suspense fallback={<div>Loading...</div>}>
        <Tree />
      </Suspense>
    </div>
  );
}
