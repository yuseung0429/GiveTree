'use client';

import * as style from '@/components/common/Tab/Tab.css';
import colorPalette from '@/styles/tokens/colorPalette';

type TabButtonProps = {
  width?: string;
  height?: string;
  label: string;
  isSelected: boolean;
  onClick: () => void;
};

export default function TabButton({
  width = '120px',
  height = '55px',
  label,
  isSelected,
  onClick,
}: TabButtonProps) {
  return (
    <button
      className={style.tabButton}
      onClick={onClick}
      style={{
        width,
        height,
        color: isSelected ? colorPalette.primary[600] : colorPalette.grey[600],
        fontWeight: isSelected ? '600' : '500',
        borderBottom: `2px solid ${
          isSelected ? colorPalette.primary[600] : colorPalette.grey[400]
        }`,
      }}
    >
      {label}
    </button>
  );
}
