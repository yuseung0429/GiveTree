import { style } from '@vanilla-extract/css';
import colorPalette from '@/styles/tokens/colorPalette';

export const container = style({
  width: '100%',
  aspectRatio: '16 / 9',
  maxHeight: '300px',
  position: 'relative',
  borderRadius: '10px',
  overflow: 'hidden',
});

export const imageBox = style({
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: '0',
  left: '0',
  backgroundImage: 'url("/temporary/campaignBg.png")', // 임시 이미지
  backgroundSize: 'cover',
  backgroundPosition: 'center',
});

export const overlayBox = style({
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.65)',
  position: 'absolute',
  top: '0',
  left: '0',
});

export const imgTitle = style({
  position: 'absolute',
  top: '15%',
  left: '5%',
  color: colorPalette.text[50],
});
