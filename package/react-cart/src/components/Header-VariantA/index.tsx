import { useEffect, useRef, useState } from 'react';
import { FaUser, FaHeart, FaShoppingBag } from 'react-icons/fa';
import { IoMdCall } from 'react-icons/io';
import { FiSearch, FiMenu } from 'react-icons/fi';
import MegaMenu from './mainMenu';
import MobileMenu from './MobileMenu';
import logo1 from './logo1.png';
import { MdArrowDropDown } from 'react-icons/md';
import CartDrawer from 'react-cart/src/components/Cart-VariantA';
import { Link } from 'react-router-dom';

const NAV_ITEMS = [
  'Apparel',
  'Sarees',
  'Home',
  'New',
  'Accessories',
  'Artisans',
  'Gift_and_Toys',
  'Sale',
];

const HeaderVariantA = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="w-full sticky top-0 bg-white z-[60]">
      {/* Top Header */}
      <header className="max-w-[1200px] mx-auto w-full px-0 md:px-0">
  {/* Mobile Header */}
  <div className="md:hidden w-full flex items-center justify-between pt-4 pb-2">
    <div className="flex items-center gap-4">
      <FiMenu
        onClick={() => setMobileMenuOpen(true)}
        className="text-gray-600 text-2xl cursor-pointer"
      />
      <Link to="/">
        <img src={logo1} alt="Logo" className="h-10 w-auto cursor-pointer" />
      </Link>
    </div>
    <div className="flex items-center gap-4">
      <FaUser className="cursor-pointer text-gray-700 text-lg" />
      {/* <FaShoppingBag className="cursor-pointer text-gray-700 text-lg" /> */}
      <FaShoppingBag
        className="cursor-pointer text-gray-700 text-lg"
        onClick={() => setIsCartOpen(true)}
      />
    </div>
  </div>

  {/* Mobile Search Bar */}
  <div className="md:hidden pb-2">
    <div className="w-full border border-gray-400 px-2 py-2 flex items-center">
      <FiSearch className="text-gray-500 text-sm" />
      <input
        type="text"
        placeholder="Search"
        className="ml-2 flex-1 text-sm outline-none text-gray-800 bg-transparent"
      />
    </div>
  </div>

  {/* Desktop Header */}
  <div className="hidden md:flex justify-between items-start pt-2 pb-2">
    <div className="flex items-center gap-4">
      <Link to="/">
        <img src={logo1} alt="Logo" className="h-[48px] w-auto mt-4 cursor-pointer" />
      </Link>
    </div>

    <div className="flex flex-col items-end">
      <div className="flex items-center gap-[6px] text-[14px] text-secondary-900 font-normal my-[8px]">
        <IoMdCall className="text-[15px] text-secondary-900" />
        <div className="flex flex-wrap gap-x-2">
          <a href="tel:09966666666" className="hover:text-primary-600">
            099-66666666
          </a>
          <span>/</span>
          <a href="tel:+919999021333" className="hover:text-primary-600">
            +91 9999 021 333
          </a>
        </div>
      </div>
      <div className="flex items-center gap-[25px] pt-[12px] text-[17px] text-[#606060]">
        <FiSearch className="cursor-pointer text-[24px]" />
        <FaUser className="cursor-pointer" />
        <FaHeart className="cursor-pointer" />
        {/* <FaShoppingBag className="cursor-pointer" /> */}
        <FaShoppingBag
          className="cursor-pointer"
          onClick={() => setIsCartOpen(true)}
        />
      </div>
    </div>
  </div>
</header>


      {/* Navigation Bar */}
      <nav className="hidden md:block">
        <div className="max-w-[1440px] mx-auto px-12 relative">
          <ul className="flex justify-between pt-[8px] pb-[16px] text-[18px]">
            {NAV_ITEMS.map((label) => (
              <li key={label} className="group relative cursor-pointer">
                <button
                  onClick={() => setOpenMenu(openMenu === label ? null : label)}
                  className={`flex items-center space-x-2 transition-colors duration-200 ${
                    label === 'Sale'
                      ? 'text-red-600'
                      : openMenu === label
                      ? 'text-primary-900'
                      : 'text-secondary-900'
                  }`}
                >
                  <span>{label.replace(/_/g, ' ')}</span>
                  <MdArrowDropDown
                    className={`text-[22px] transition-transform duration-200 ${
                      openMenu === label ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </li>
            ))}
          </ul>

          {openMenu && (
            <div ref={menuRef}>
              <MegaMenu section={openMenu} onClose={() => setOpenMenu(null)} />
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Full Screen Menu */}

      {isMobileMenuOpen && (
        <MobileMenu onClose={() => setMobileMenuOpen(false)} navItems={NAV_ITEMS} />
      )}
      {isCartOpen && <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />}
    </div>
  );
};

export default HeaderVariantA;
