import { style } from '@vanilla-extract/css';
import colorPalette from '@/styles/tokens/colorPalette';

export const campaignCard = style({
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  justifyContent: 'space-between',
  backgroundColor: colorPalette.primary[50],
  aspectRatio: '1',
  borderRadius: '16px',
  padding: '1rem 0.75rem',
  boxShadow: '3px 3px 6px rgba(0, 0, 0, 0.25)',
  scrollSnapAlign: 'start',
  flexShrink: '0',
  margin: '0 0.5rem 0.5rem 0',
  position: 'relative',
});

export const campaignTitle = style({
  marginLeft: '0.25rem',
  marginBottom: '0.25rem',
  color: colorPalette.grey[500],
  mixBlendMode: 'difference',
});

export const cardIndex = style({
  position: 'absolute',
  top: '10px',
  right: '10px',
  width: '50px',
  padding: '0.5rem',
  borderRadius: '20px',
  backgroundColor: '#E0E0E0',
  textAlign: 'center',
  opacity: '0.8',
});

export const campaignSubtitle = style({
  marginLeft: '0.25rem',
  color: 'grey',
  mixBlendMode: 'difference'
});

export const progressContainer = style({
  position: 'relative',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  borderRadius: '12px',
  padding: '0.75rem 0.5rem',
});

export const amountContainer = style({
  display: 'flex',
  justifyContent: 'space-between',
});

export const progressTextOutside = style({
  position: 'absolute',
  left: 'calc(100% + 5px)',
  fontSize: '0.75rem',
  fontWeight: 'bold',
  color: 'red',
});
