import { style } from "@vanilla-extract/css";

export const introduction = style({
  backgroundColor: 'rgb(245, 245, 245)',
  padding: '0.75rem',
  lineHeight: 1.3,
  whiteSpace: 'pre-line',
  borderRadius: '5px',
  marginBottom: '10px',
  // textAlign: 'center',
  margin: '1rem auto',
});

export const introduceImage = style({
  display: 'flex',
  justifyContent: 'center',
});