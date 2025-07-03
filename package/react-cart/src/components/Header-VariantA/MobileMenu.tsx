import { useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { IoMdCall } from 'react-icons/io';
import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaYoutube,
} from 'react-icons/fa';
import { MdClose, MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';

import { apparelCategories } from './menu/data/apparel';
import { sareesCategories } from './menu/data/sarees';
import { homeCategories } from './menu/data/home';
import { newCategories } from './menu/data/new';
import { accessoriesCategories } from './menu/data/accessories';
import { artisanGroups } from './menu/data/artisans';
import { toysCategories } from './menu/data/giftAndToys';

const categoryDataMap: Record<string, { heading: string; items: string[] }[]> = {
  Apparel: apparelCategories,
  Sarees: sareesCategories,
  Home: homeCategories,
  New: newCategories,
  Accessories: accessoriesCategories,
  Artisans: artisanGroups.flat(), // Flatten for uniform structure
  Gift_and_Toys: toysCategories,
};

interface MobileMenuProps {
  onClose: () => void;
  navItems: string[];
}

const MobileMenu = ({ onClose, navItems }: MobileMenuProps) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [openHeadings, setOpenHeadings] = useState<Record<string, boolean>>({});
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const handleCategoryClick = (category: string) => {
    setActiveCategory(prev => (prev === category ? null : category));
    setOpenHeadings({});
    setActiveItem(null);
  };

  const toggleHeading = (heading: string) => {
    setOpenHeadings(prev => ({ ...prev, [heading]: !prev[heading] }));
  };

  const renderCategoryContent = (category: string) => {
    const data = categoryDataMap[category];
    if (!data) return null;

    return data.map((group, idx) => (
      <div key={idx} >
        <button
          onClick={() => toggleHeading(group.heading)}
          className={`flex justify-between items-center w-full text-left text-[15px] font-medium py-1 pl-2 ${
            openHeadings[group.heading] ? 'text-primary-900' : 'text-secondary-900'
          }`}
        >
          <span>{group.heading}</span>
          {openHeadings[group.heading] ? (
            <MdArrowDropUp className="text-xl" />
          ) : (
            <MdArrowDropDown className="text-xl" />
          )}
        </button>
        {openHeadings[group.heading] && (
          <ul className="pl-5 text-[14px] space-y-2 py-2">
            {group.items.map((item, i) => (
              <li
                key={i}
                onClick={() => setActiveItem(item)}
                className={`py-1 cursor-pointer ${
                  activeItem === item ? 'text-primary-900 font-medium' : 'text-secondary-900'
                }`}
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    ));
  };

  return (
    <div className="fixed top-0 left-0 w-[400px] h-full bg-white shadow-lg z-[999] flex flex-col">
      {/* Close button */}
      <div className="flex justify-start px-4 py-6 border-b">
        <button onClick={onClose} className="text-gray-500 text-xl">
          <MdClose />
        </button>
      </div>

      {/* Navigation content */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <ul className="flex flex-col gap-4 text-[14px] font-medium">
          {navItems.map((item, idx) => (
            <li key={idx}>
              <button
                onClick={() => handleCategoryClick(item)}
                className={`flex justify-between items-center w-full py-3 ${
                  activeCategory === item ? 'text-primary-900' : 'text-secondary-900'
                }`}
              >
                <span className={item === 'Sale' ? 'text-red-600' : ''}>
                  {item.replace(/_/g, ' ')}
                </span>

                {/* Icon with left border */}
                <div className="pl-2 ml-2 border-l border-gray-300">
                  <MdArrowDropDown
                    className={`text-xl transition-transform ${
                      activeCategory === item ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </button>
              {activeCategory === item && (
                <div className="mt-2">{renderCategoryContent(item)}</div>
              )}

              {/* Always show line between nav items */}
              {idx < navItems.length - 1 && (
                <div className="border-b border-gray-300" />
              )}
            </li>
          ))}
          <li className="flex items-center gap-2 pt-4 cursor-pointer text-secondary-900">
            <FaHeart className="text-gray-600" />
            <span>Wishlist</span>
          </li>
        </ul>
      </div>

      {/* Fixed footer */}
      <div className="px-6 pb-6 pt-4 border-t border-gray-200 bg-white">
        <div className="flex items-center gap-2 mb-4 text-[14px] text-gray-700">
          <IoMdCall className="text-[16px]" />
          <span>079-66131721 / +91 6359 021 222</span>
        </div>
        <div className="flex items-center gap-6 text-xl text-gray-600">
          <FaFacebookF />
          <FaPinterestP />
          <FaInstagram />
          <FaYoutube />
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;