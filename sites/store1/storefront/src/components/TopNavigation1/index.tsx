import { FaUser, FaShoppingCart } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';

export default function Navbar() {
  return (
    <header class="bg-[#faf7ef] border-b-[3px] border-orange-500">
      <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        
        {/* Navigation Links */}
        <nav class="flex-1 flex justify-center space-x-6 font-semibold text-sm text-gray-900">
          <a href="#" class="hover:text-orange-500">Home</a>
          <div class="relative group">
            <button class="hover:text-orange-500">View Collections ▾</button>
            <div class="absolute hidden group-hover:block bg-white border shadow-md mt-2 z-10">
              <a href="#" class="block px-4 py-2 hover:bg-gray-100">Collection 1</a>
              <a href="#" class="block px-4 py-2 hover:bg-gray-100">Collection 2</a>
            </div>
          </div>
          <a href="#" class="hover:text-orange-500">Shop All</a>
          <a href="#" class="hover:text-orange-500">FAQ</a>
          <a href="#" class="hover:text-orange-500">Track Your Order</a>
          <a href="#" class="hover:text-orange-500">Contact Us</a>
        </nav>

        {/* Icons */}
        <div class="flex items-center space-x-5 text-gray-900 text-lg">
          
          
            <span class="absolute -top-2 -right-2 bg-green-700 text-white text-xs rounded-full px-[6px] py-[1px] font-bold">1</span>
          </div>
        </div>

    </header>
  );
}
