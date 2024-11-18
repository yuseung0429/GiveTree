'use client';

import { useState } from 'react';
import * as s from './MonthDropdown.css';
import { HiChevronDown } from 'react-icons/hi2';

interface MonthDropdownProps {
  selectedMonth: number;
  handleMonthAction: (monthIndex: number) => void;
}

export default function MonthDropdown({
  selectedMonth,
  handleMonthAction,
}: MonthDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const months = [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleMonthSelect = (index: number) => {
    handleMonthAction(index); // 상위 컴포넌트에 선택된 월을 전달
    setIsOpen(false);
  };

  return (
    <div className={s.monthDropdown}>
      <div className={s.dropdownButton}>
        {months[selectedMonth]}
        <HiChevronDown size={18} onClick={toggleDropdown} />
      </div>
      {isOpen && (
        <div className={s.dropdownContent}>
          {months.map((month, index) => (
            <div
              key={index}
              className={s.dropdownItem}
              onClick={() => handleMonthSelect(index)}
            >
              {month}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
