import React from 'react';
import gheeImage from './ghee.png';

// Main App component
export default function App() {
	return <HeroBanner />;
}

// HeroBanner Component
function HeroBanner() {
	return (
		<div class="relative w-full overflow-hidden bg-secondary-400 h-[600px] flex flex-col md:flex-row items-center justify-center p-4 md:p-8">
			<div class="container h-[100%] mx-auto flex flex-col md:flex-row items-center justify-center">
				{/* Left Section - Text Content */}
				<div class="flex flex-col items-center md:items-start text-center md:text-left p-4 md:p-8 z-10">
					<p class="text-sm md:text-base text-neutral-dark mb-2 uppercase tracking-wide">
						Farm Market
					</p>
					<h1 class="text-3xl md:text-5xl font-extrabold text-neutral-light leading-tight mb-4">
						High Quality <br /> Fruits Nuts Products
					</h1>
					<p class="text-lg md:text-xl text-neutral-dark mb-6 font-semibold">SALE 30 % OFF</p>
					<button class="px-6 py-3 bg-neutral-light text-secondary-600 font-bold rounded-full shadow-md hover:bg-neutral-accent-light transition duration-300 ease-in-out transform hover:scale-105">
						Shop Now
					</button>
				</div>

				{/* Right Section - Image */}
				<div class="h-[100%] md:mt-0 md:ml-auto md:w-1/2 w-full flex justify-center items-center">
					<div class="relative w-full h-[100%] overflow-hidden">
						<img
							src={gheeImage}
							alt="Image 1"
							class="absolute inset-0 w-full h-full object-cover animate-slide-fade-1"
						/>
						4
						<img
							src={gheeImage}
							alt="Image 2"
							class="absolute inset-0 w-full h-full object-cover animate-slide-fade-2"
						/>
						<img
							src={gheeImage}
							alt="Image 3"
							class="absolute inset-0 w-full h-full object-cover animate-slide-fade-3"
						/>
						<img
							src={gheeImage}
							alt="Image 4"
							class="absolute inset-0 w-full h-full object-cover animate-slide-fade-4"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
