import { style } from '@vanilla-extract/css';
import colorPalette from '@/styles/tokens/colorPalette';

export const moneybox = style({
  justifyContent: 'space-between',
  backgroundColor: colorPalette.primary[50],
  padding: '20px 15px',
  borderRadius: '5px',
});

export const accountInfo = style({
  marginBottom: '10px',
});

export const infoBox = style({
  padding: '10px',
  backgroundColor: colorPalette.grey[100],
});

export const accountBox = style({
  borderRadius: '5px',
  textAlign: 'center',
});

export const money = style({
  color: colorPalette.primary[700],
  fontSize: '18px',
  fontWeight: '700',
});

export const marginBottom5 = style({
  marginBottom: '5px',
});

export const marginBottom20 = style({
  marginBottom: '20px',
});
