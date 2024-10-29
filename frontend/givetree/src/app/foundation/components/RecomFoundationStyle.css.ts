import { style } from '@vanilla-extract/css';
import colorPalette from '@/styles/tokens/colorPalette';

export const container = style({
  width: '100%',
  height: '140px',
  position:'relative',
  borderRadius: '10px',
  overflow: 'hidden',
  backgroundColor: colorPalette.primary[50]
});

export const imageBox = style({
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: '0',
  left:'0'

});

export const overlayBox = style({
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.65)',
  position: 'absolute',
  top: '0',
  left:'0',

});

export const imgTitle = style({
  position: 'absolute',
  top: '15%',
  left:'5%',
  color: colorPalette.text[50]
});