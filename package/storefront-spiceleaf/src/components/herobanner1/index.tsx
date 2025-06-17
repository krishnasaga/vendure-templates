import React from 'react';
import image from './5.png';

// Main App component
export default function App() {
	return <HeroBanner />;
}

// HeroBanner Component
function HeroBanner() {
	return (
		<div class="relative w-full overflow-hidden md:h-[600px] h-auto flex flex-col md:flex-row items-center justify-center py-4 md:py-8 bg-secondary-800">
			{/* Left Section - Text Content */}
			<div class="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 md:px-8 relative z-10">
				<div class="flex flex-col items-center md:items-start text-center md:text-left py-4 md:py-8 z-10">
					<p class="text-sm md:text-base text-primary-500 mb-2 uppercase tracking-wide">
						Farm SpiceLeaf
					</p>
					<h1 class="text-3xl md:text-5xl font-extrabold text-neutral-light leading-tight mb-4">
						Unlock the Authentic Taste of Tradition!
					</h1>
					<p class="text-base md:text-lg text-neutral-light mb-6">
						From farm to kitchen, we bring you the purest flavours to elevate every dish. No
						fillers. No compromises. Just 100% natural taste.
					</p>
					<p class="text-lg md:text-xl text-secondary-200 mb-6 font-semibold">SALE 30 % OFF</p>
					<button class="px-6 py-3 bg-primary-500 text-primary-100 font-bold rounded-md shadow-md hover:bg-secondary-500 transition duration-300 ease-in-out transform hover:scale-105">
						<a href="/collections/spices-and-masalas/"> Shop Now</a>
					</button>
				</div>

				{/* Right Section - Image */}
				<div class="flex-shrink-0 mt-8 md:mt-0 md:ml-auto md:w-1/2 w-full flex justify-center items-center overflow-hidden">
					<img src={image} width={'500'} height={'600'} object-fit={'cover'} />
				</div>
			</div>
		</div>
	);
}
