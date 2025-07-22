import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const SortDropdown = ({ onSortChange }: { onSortChange: (value: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('Sort');

  const options = [
    'Featured',
    'New Arrivals',
    'Price: Low To High',
    'Price: High To Low',
    'Discount: High To Low',
    'Rating',
  ];

  return (
    <div className="relative inline-block text-left font-light text-sm w-[220px]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex justify-between w-full px-4 py-2 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none"
      >
        <span>{selected}</span>
        <FaChevronDown className="ml-2 mt-[4px] text-secondary-900 text-xs" />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full origin-top-right bg-white shadow-md border border-gray-100">
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  setSelected(option);
                  onSortChange(option);
                  setIsOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
