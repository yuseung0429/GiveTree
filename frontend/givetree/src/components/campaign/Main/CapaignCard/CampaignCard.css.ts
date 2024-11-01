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
  margin: '0 0.5rem 0.5rem 0'

});

export const campaignTitle = style({
  marginLeft: '0.25rem',
  marginBottom: '0.25rem',
  color: colorPalette.text[600]
});

export const campaignSubtitle = style({
  marginLeft: '0.25rem',
  color: colorPalette.text[400],
});

export const progressContainer = style({
  position: 'relative',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  borderRadius: '12px',
  padding: '0.75rem 0.5rem',
  // overflow: 'hidden',
});

export const amountContainer = style({
  display: 'flex',
  justifyContent: 'space-between',
});

export const currentAmount = style({
  fontSize: '14px',
  fontWeight: 'bold',
  color: colorPalette.text[900],
});

export const goalAmount = style({
  fontSize: '14px',
  fontWeight: 'inherit',
  color: colorPalette.text[800],
});
