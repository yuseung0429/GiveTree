import { style } from '@vanilla-extract/css';

// import colorPalette from '@/styles/tokens/colorPalette';

export const mainBg = style({
  backgroundColor: '#F5F5F5',
  minHeight:'100%',
});

export const section = style({
  padding: '20px 10px',
});

export const title = style({
  marginBottom: '15px'
});

export const flextitle = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
});

export const link = style({
  textDecoration: 'none',
  color: '#000',
});
