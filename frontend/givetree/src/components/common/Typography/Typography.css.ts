import { style } from '@vanilla-extract/css';

export const ellipsis = style({
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
});
