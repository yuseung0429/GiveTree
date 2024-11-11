import { style } from '@vanilla-extract/css';

export const monthDropdown = style({
  position: 'relative',
  width: '90px',
});

export const dropdownButton = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: '8px 12px',
  fontSize: '14px',
  textAlign: 'center',
  cursor: 'pointer',
  border: '1px solid #ccc',
  borderRadius: '8px',
  background: 'white',
});

export const dropdownContent = style({
  position: 'absolute',
  top: '100%',
  left: 0,
  width: '100%',
  border: '1px solid #ccc',
  borderRadius: '4px',
  background: 'white',
  zIndex: 1,
  maxHeight: '150px',
  overflowY: 'auto',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
});

export const dropdownItem = style({
  padding: '8px 12px',
  fontSize: '14px',
  cursor: 'pointer',
  ':hover': {
    backgroundColor: '#f0f0f0',
  },
});
