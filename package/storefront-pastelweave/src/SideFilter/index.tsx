import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const filtersData = [
  {
    title: 'Category',
    options: ['Sarees', 'Kurtas', 'Dresses', 'Jackets'],
  },
  {
    title: 'Size',
    options: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    title: 'Color',
    options: ['Red', 'Blue', 'Green', 'Yellow', 'White', 'Black'],
  },
  {
    title: 'Fabric',
    options: ['Cotton', 'Silk', 'Linen', 'Khadi'],
  },
  {
    title: 'Occasion',
    options: ['Festive', 'Casual', 'Formal', 'Workwear'],
  },
  {
    title: 'Technique',
    options: ['Handwoven', 'Block Print', 'Batik', 'Embroidery'],
  },
  {
    title: 'Art Form',
    options: ['Madhubani', 'Ajrakh', 'Warli', 'Kalamkari'],
  },
  {
    title: 'Price',
    options: ['Below ₹1000', '₹1000 - ₹2500', '₹2500 - ₹5000', 'Above ₹5000'],
  },
];

const SideFilters = () => {
  const [openFilter, setOpenFilter] = useState<string | null>(null);

  const toggleFilter = (title: string) => {
    setOpenFilter(openFilter === title ? null : title);
  };

  return (
    <div className="w-full md:w-[250px] px pr-2 text-secondary-900">
      {/* Top Heading */}
      <h2 className="text-md font-semibold mb-4 tracking-wide">Filters</h2>

      {filtersData.map((filter) => (
        <div key={filter.title} className="border-b border-gray-300 pb-2 mb-2">
          <button
            onClick={() => toggleFilter(filter.title)}
            className="w-full flex justify-between items-center py-3 font-medium text-left text-md"
          >
            <span>{filter.title}</span>
            <span className="text-[18px]">
              {openFilter === filter.title ? <FiChevronUp /> : <FiChevronDown />}
            </span>
          </button>

          {openFilter === filter.title && (
            <div className="pl-2 mt-2">
              {filter.options.map((option) => (
                <label
                  key={option}
                  className="flex items-center space-x-2 text-sm text-secondary-700 py-1"
                >
                  <input type="checkbox" className="accent-primary-500" />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SideFilters;
