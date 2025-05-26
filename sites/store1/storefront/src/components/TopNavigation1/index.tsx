import { component$, useSignal } from '@qwik.dev/core';

export default component$(() => {
  const isMenuOpen = useSignal(false);

  return (
    <header class="bg-[#faf7ef] border-b-[3px] border-orange-500 relative z-20">
      <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Mobile menu button */}
        <button 
          onClick$={() => isMenuOpen.value = true}
          class="md:hidden text-gray-900"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Desktop nav */}
        <nav class="hidden md:flex flex-1 justify-center space-x-6 font-semibold text-sm text-gray-900">
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

        {/* Icons (always right) */}
        <div class="flex items-center space-x-5 text-gray-900 text-lg">
          <a href="#" class="hover:text-orange-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width={2} stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </a>
          <a href="#" class="hover:text-orange-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="w-5 h-5">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.93 0 3.5 1.57 3.5 3.5S13.93 12 12 12 8.5 10.43 8.5 8.5 10.07 5 12 5zm0 14.5c-2.73 0-5.32-1.39-6.84-3.81C6.67 13.93 9.21 13 12 13s5.33.93 6.84 2.69c-1.52 2.42-4.11 3.81-6.84 3.81z" />
            </svg>
          </a>
          <div class="relative">
            <a href="#" class="hover:text-orange-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="w-5 h-5">
                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-8.7-4.5h7.4c.73 0 1.34-.49 1.52-1.21L22 6.5h-4.3l-2.45-5.26c-.44-.94-1.56-1.3-2.5-.87-.94.44-1.3 1.56-.87 2.5L14.7 6.5H5.2L4.5 3.13c-.15-.65-.75-1.13-1.42-1.13H1.9c-.55 0-1 .45-1 1s.45 1 1 1h.7l1.7 8.5c-.32 1.07-.63 2.13-.7 3.2C2.7 18.23 3.94 19 5 19h12c.55 0 1-.45 1-1s-.45-1-1-1H5c-.17 0-.34-.02-.5-.07-.27-.08-.43-.3-.43-.59l-.02-.12c-.08-.3-.06-.52-.01-.73L4.7 12.5h8.9c1.61 0 2.91-1.39 2.76-3.05l-.04-.2-.5-2.22c-.15-.65-.75-1.13-1.42-1.13H7z" />
              </svg>
            </a>
            <span class="absolute -top-2 -right-2 bg-green-700 text-white text-xs rounded-full px-[6px] py-[1px] font-bold">1</span>
          </div>
        </div>
      </div>

      {/* Full-screen mobile overlay menu */}
      {isMenuOpen.value && (
        <div class="fixed inset-0 bg-[#faf7ef] text-gray-900 z-50 p-6 flex flex-col">
          <div class="flex justify-between items-center mb-8">
            <span class="text-xl font-bold">Menu</span>
            <button 
              onClick$={() => isMenuOpen.value = false}
              class="text-gray-900"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav class="space-y-4 text-lg font-semibold">
            <a href="#" class="block hover:text-orange-500">Home</a>
            <a href="#" class="block hover:text-orange-500">View Collections</a>
            <a href="#" class="block hover:text-orange-500">Shop All</a>
            <a href="#" class="block hover:text-orange-500">FAQ</a>
            <a href="#" class="block hover:text-orange-500">Track Your Order</a>
            <a href="#" class="block hover:text-orange-500">Contact Us</a>
          </nav>
        </div>
      )}
    </header>
  );
});
