import { useEffect, useRef, useState } from 'react';
import { FaUser, FaHeart, FaShoppingBag } from 'react-icons/fa';
import { IoMdCall } from 'react-icons/io';
import { FiSearch } from "react-icons/fi";
import { MdArrowDropDown } from "react-icons/md";
import MegaMenu from './menu';
import logo1 from './logo1.png';

const NAV_ITEMS = [
  'Apparel',
  'Sarees',
  'Home',
  'New',
  'Accessories',
  'Artisans',
  'Gift and Toys',
  'Sale',
];

const HeaderVariantA = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpenMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="w-full font-sans text-gray-800 text-[13px] relative bg-white z-50">
      {/* Top Header */}
      <header className="flex justify-between items-start px-8 pt-2 pb-2 max-w-[1440px] mx-auto">
        {/* Logo */}
        <div className="flex items-center pt-3">
          <img src={logo1} alt="Logo" className="h-[52px] w-auto" />
        </div>

        {/* Contact and Icons */}
        <div className="flex flex-col items-end pt-0">
          <div className="flex items-center gap-[6px] text-[14px] text-gray-600 font-normal my-[8px]">
            <IoMdCall className="text-[15px] text-gray-600" />
            <div className="flex flex-wrap gap-x-2">
              <a href="tel:07966131721" className="hover:text-primary-600">099-66666666</a>
              <span>/</span>
              <a href="tel:+916359021222" className="hover:text-primary-600">+91 9999 021 333</a>
            </div>
          </div>
          <div className="flex items-center gap-[25px] pt-[15px] text-[17px] text-gray-700">
            <FiSearch className="cursor-pointer" />
            <FaUser className="cursor-pointer" />
            <FaHeart className="cursor-pointer" />
            <FaShoppingBag className="cursor-pointer" />
          </div>
        </div>
      </header>

      <nav>
        <div className="max-w-[1440px] mx-auto px-10 relative">
          <ul className="flex justify-between py-[10px] px-4 text-[16px] font-semibold text-gray-800">
            {NAV_ITEMS.map((label) => (
              <li
                key={label}
                className={`group relative cursor-pointer ${
                  label === 'Sale' ? 'text-red-600' : ''
                }`}
              >
                <button
                  onClick={() =>
                    setOpenMenu(openMenu === label ? null : label)
                  }
                  className="flex items-center space-x-3"
                >
                  <span>{label}</span>
                  <MdArrowDropDown className="w-[18px] h-[18px] group-hover:rotate-180 transition-transform" />
                </button>
              </li>
            ))}
          </ul>

          {/* Mega menu */}
          {openMenu && (
            <div ref={menuRef}>
              <MegaMenu section={openMenu} onClose={() => setOpenMenu(null)} />
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default HeaderVariantA;
