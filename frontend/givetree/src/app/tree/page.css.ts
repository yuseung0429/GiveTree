import { style } from '@vanilla-extract/css';

import treeBackground from '@/assets/images/tree/treeBackground.png';

export const background = style({
  display: 'flex',
  flexDirection:'column',
  paddingBottom: '50px',
  backgroundImage: `url('${treeBackground.src}')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed',
  objectFit: 'cover',
  width: '100%',
  height: '100vh',
  overflow: 'hidden',
});
