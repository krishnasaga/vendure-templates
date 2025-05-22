import React from 'react';

// Main App component
export default function App() {
  return (
    
      <HeroBanner />
  );
}

// HeroBanner Component
function HeroBanner() {
  return (
    <div class="relative w-full overflow-hidden bg-yellow-400 md:h-96 h-auto flex flex-col md:flex-row items-center justify-center p-4 md:p-8">
      {/* Left Section - Text Content */}
      <div class="flex flex-col items-center md:items-start text-center md:text-left p-4 md:p-8 z-10">
        <p class="text-sm md:text-base text-gray-800 mb-2 uppercase tracking-wide">
          Farm Market
        </p>
        <h1 class="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-4">
          High Quality <br /> Fruits Nuts Products
        </h1>
        <p class="text-lg md:text-xl text-gray-800 mb-6 font-semibold">
          SALE 30 % OFF
        </p>
        <button class="px-6 py-3 bg-white text-yellow-600 font-bold rounded-full shadow-md hover:bg-gray-100 transition duration-300 ease-in-out transform hover:scale-105">
          Shop Now
        </button>
      </div>

      {/* Right Section - Image */}
      <div class="flex-shrink-0 mt-8 md:mt-0 md:ml-auto md:w-1/2 w-full flex justify-center items-center">
        {/* Placeholder image for the woman holding greens */}
        
      </div>
    </div>
  );
}
