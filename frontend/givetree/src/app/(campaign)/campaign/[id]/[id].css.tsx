import colorPalette from '@/styles/tokens/colorPalette';
import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
});

export const coverImgContainer = style({
  display: 'flex',
  justifyContent: 'center',
  padding: '30px',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  position: 'relative',
  borderBottomLeftRadius: '20px',
  borderBottomRightRadius: '20px',

  '::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderBottomLeftRadius: '20px',
    borderBottomRightRadius: '20px',
    zIndex: 0,
  },
});

export const coverImg = style({
  zIndex: 1,
  maxHeight: '350px',
  height: '100%',
  borderRadius: '12px',
});

export const title = style({
  marginBottom: '8px',
});

export const subTitle = style({
  marginBottom: '10px',
});

export const periodWrapper = style({
  display: 'flex',
  justifyContent: 'center',
  border: `1px solid ${colorPalette.primary[300]}`,
  borderRadius: '12px',
  padding: '0.75rem 0.5rem',
  marginBottom: '10px',
});

export const introduction = style({
  backgroundColor: 'rgb(245, 245, 245)',
  padding: '0.75rem 0.5rem',
  lineHeight: 1.3,
  whiteSpace: 'pre-line',
  borderRadius: '5px',
  marginBottom: '10px',
  textAlign: 'center',
});
