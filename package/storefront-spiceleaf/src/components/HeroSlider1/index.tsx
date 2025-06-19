import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import slide1 from './slide1.png';
import slide2 from './slide2.png';
import slide3 from './slide3.png';
import slide4 from './slide4.png';
import slide5 from './slide5.png';
import slide2_2 from './slide2.2.png';

const Slide1 = component$(() => (
	<div class="relative w-full overflow-hidden md:h-[600px] h-auto flex flex-col md:flex-row items-center justify-center py-4 md:py-8 bg-primary-100">
		<div class="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 md:px-8 relative z-10">
			<div class="flex flex-col items-center md:items-start text-center md:text-left py-4 md:py-8 z-10">
				<p class="text-sm md:text-base text-primary-500 mb-2 uppercase tracking-wide">Farm SpiceLeaf</p>
				<h1 class="text-5xl md:text-7xl font-extrabold text-neutral-dark leading-tight mb-4 animate-slide-up-fade">All Spices at Flat 25% OFF!</h1>
				<p class="text-xl md:text-2xl text-neutral-dark mb-6 animate-slide-up-fade">Bring home the taste of authentic Indian masalas.</p>
				<button class="px-5 py-4 animation-scale-in md:text-2xl bg-primary-500 text-primary-100 font-bold rounded-md shadow-md hover:bg-secondary-500 transition duration-300 ease-in-out transform hover:scale-105">
					<a href="/collections/spices-and-masalas/">Shop Now</a>
				</button>
			</div>
			<div class="flex-shrink-0 mt-8 md:mt-0 md:ml-auto md:w-1/2 w-full flex justify-center items-center overflow-hidden">
				<img src={slide1} width={'500'} height={'600'} object-fit={'cover'} class="animate-slide-left-fade" />
			</div>
		</div>
	</div>
));


const Slide2 = component$(() => (
	<div class="relative w-full overflow-hidden md:h-[600px] h-auto flex flex-col md:flex-row items-center justify-center py-4 md:py-0 bg-primary-100">
		<div class="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 md:px-8 relative z-10 h-full mt-0">
			<div class="flex flex-col items-center md:items-start text-center md:text-left py-4 md:py-8 z-10">
				<p class="text-sm md:text-base text-primary-500 mb-2 uppercase tracking-wide">Farm SpiceLeaf</p>
				<h1 class="text-5xl md:text-7xl font-extrabold text-neutral-dark leading-tight mb-4 animate-slide-up-fade">What makes a perfect curry?</h1>
				<p class="text-xl md:text-2xl text-neutral-dark mb-2 animate-slide-up-fade">It's the right mix of masalas!</p>
				<button class="px-5 py-4 animation-scale-in md:text-2xl bg-primary-500 text-primary-100 font-bold rounded-md shadow-md hover:bg-secondary-500 transition duration-300 ease-in-out transform hover:scale-105">
					<a href="/collections/spices-and-masalas/">Shop Now</a>
				</button>
			</div>
			<div class="flex-shrink-0 mt-8 md:mt-0 md:ml-auto md:w-1/2 w-full h-full flex flex-col justify-start items-center overflow-hidden">
				<img src={slide2} width={'500'} height={'300'} object-fit={'cover'} class="animate-slide-down-fade"/>
				<img src={slide2_2} width={'500'} height={'300'} object-fit={'cover'} class="animate-slide-up-fade"/>
			</div>
		</div>
	</div>
));


const Slide3 = component$(() => (
	<div class="relative w-full overflow-hidden md:h-[600px] h-auto flex flex-col md:flex-row items-center justify-center py-4 md:py-8 bg-primary-100">
		<div class="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 md:px-8 relative z-10">
			<div class="flex flex-col items-center md:items-start text-center md:text-left py-4 md:py-8 z-10">
				<p class="text-sm md:text-base text-primary-500 mb-2 uppercase tracking-wide">Farm SpiceLeaf</p>
				<h1 class="text-5xl md:text-7xl font-extrabold text-neutral-dark leading-tight mb-4 animate-slide-up-fade">Choose only the best - no compromise!</h1>
				<p class="text-xl md:text-2xl text-neutral-dark mb-2 animate-slide-up-fade">From daily tadka to festive feasts - good masala makes all the difference.</p>
				<button class="px-9 py-7 animation-scale-in md:text-5xl bg-primary-500 text-primary-100 font-bold rounded-md shadow-md hover:bg-secondary-500 transition duration-300 ease-in-out transform hover:scale-105">
					<a href="/collections/spices-and-masalas/">Shop Now</a>
				</button>
			</div>
			<div class="flex-shrink-0 mt-8 md:mt-0 md:ml-auto md:w-1/2 w-full flex justify-center items-center overflow-hidden">
				<img src={slide3} width={'500'} height={'600'} object-fit={'cover'} class="animate-slide-left-fade"/>
			</div>
		</div>
	</div>
));

const Slide4 = component$(() => (
	<div class="relative w-full overflow-hidden md:h-[600px] h-auto flex flex-col md:flex-row items-center justify-center py-4 md:py-8 bg-primary-100">
		<div class="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 md:px-8 relative z-10">
			<div class="flex flex-col items-center md:items-start text-center md:text-left py-4 md:py-8 z-10">
				<p class="text-sm md:text-base text-primary-500 mb-2 uppercase tracking-wide">Farm SpiceLeaf</p>
				<h1 class="text-5xl md:text-7xl font-extrabold text-neutral-dark leading-tight mb-4 animate-slide-up-fade">Special Combo Deal!</h1>
				<p class="text-xl md:text-2xl text-neutral-dark mb-2 animate-slide-up-fade">Get our Ghee Misure Pack with Essential Spices</p>
				<button class="px-9 py-7 md:text-5xl bg-primary-500 text-primary-100 font-bold rounded-md shadow-md hover:bg-secondary-500 transition duration-300 ease-in-out transform hover:scale-105">
					<a href="/collections/spices-and-masalas/">Order Now</a>
				</button>
			</div>
			<div class="flex-shrink-0 mt-8 md:mt-0 md:ml-auto md:w-1/2 w-full flex justify-center items-center overflow-hidden">
				<img src={slide4} width={'500'} height={'600'} object-fit={'cover'} class="animate-slide-left-fade"/>
			</div>
		</div>
	</div>
));

const Slide5 = component$(() => (
	<div class="relative w-full overflow-hidden md:h-[600px] h-auto flex flex-col md:flex-row items-center justify-center py-4 md:py-8 bg-primary-100">
		<div class="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 md:px-8 relative z-10">
			<div class="flex flex-col items-center md:items-start text-center md:text-left py-4 md:py-8 z-10">
				<p class="text-sm md:text-base text-primary-500 mb-2 uppercase tracking-wide">Farm SpiceLeaf</p>
				<h1 class="text-5xl md:text-7xl font-extrabold text-neutral-dark leading-tight mb-4 animate-slide-up-fade">Pure Desi Ghee - A Must-Have!</h1>
				<p class="text-xl md:text-2xl font-bold text-green-500 mb-6 font-semibold animate-slide-up-fade">Made for Indian kitchens</p>
				<button class="px-6 py-3 animation-scale-in bg-primary-500 text-primary-100 font-bold rounded-md shadow-md hover:bg-secondary-500 transition duration-300 ease-in-out transform hover:scale-105">
					<a href="/collections/spices-and-masalas/">Order Now</a>
				</button>
			</div>
			<div class="flex-shrink-0 mt-8 md:mt-0 md:ml-auto md:w-1/2 w-full flex justify-center items-center overflow-hidden">
				<img src={slide5} width={'500'} height={'600'} object-fit={'cover'} class="animate-slide-left-fade"/>
			</div>
		</div>
	</div>
));

export const HeroCarousel = component$(() => {
	const currentIndex = useSignal(0);
	const slides = [<Slide1 />, <Slide2 />, <Slide3 />, <Slide4 />, <Slide5 />];

	useVisibleTask$(() => {
		const interval = setInterval(() => {
			currentIndex.value = (currentIndex.value + 1) % slides.length;
		}, 5000);
		return () => clearInterval(interval);
	});

	return (
		<div class="relative w-full h-[600px] overflow-hidden">
			<div class="absolute inset-0 transition-all duration-700">{slides[currentIndex.value]}</div>
			<div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
				{slides.map((_, index) => (
					<button
						key={index}
						class={`w-3 h-3 rounded-full transition-colors duration-300 ${
							currentIndex.value === index ? 'bg-white' : 'bg-gray-400'
						}`}
						onClick$={() => (currentIndex.value = index)}
					/>
				))}
			</div>
		</div>
	);
});
