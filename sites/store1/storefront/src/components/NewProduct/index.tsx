import { component$, useSignal, $, useStore } from '@builder.io/qwik';
import type { Signal } from '@builder.io/qwik';

interface Product {
	id: number;
	name: string;
	rating: number;
	image: string;
	weightOptions: string[];
	price: number;
}

const products: Product[] = [
	{
		id: 1,
		name: 'Allam Pickle',
		rating: 5,
		image: 'https://jammunuts.com/wp-content/uploads/2024/10/5-9.jpg',
		weightOptions: ['250g', '500g'],
		price: 265.0,
	},
	{
		id: 2,
		name: 'Gongura pickle',
		rating: 5,
		image: 'https://vellankifoods.com/cdn/shop/products/gongura_pickle_2.jpg?v=1680180278',
		weightOptions: ['250g', '500g'],
		price: 265.0,
	},
	{
		id: 3,
		name: 'Karivepaku pickle',
		rating: 4,
		image: 'https://prashantcorner.com/cdn/shop/files/DakGulabJamunSR-2.jpg?v=1718083866',
		weightOptions: ['250g', '500g'],
		price: 265.0,
	},
	{
		id: 4,
		name: 'Lemon pickle',
		rating: 4,
		image: 'https://vellankifoods.com/cdn/shop/products/gongura_pickle_2.jpg?v=1680180278',
		weightOptions: ['250g', '500g'],
		price: 245.0,
	},
	{
		id: 5,
		name: 'Mango pickle',
		rating: 5,
		image:
			'https://img.freepik.com/free-photo/colorful-fruits-tasty-fresh-ripe-juicy-white-desk_179666-169.jpg?semt=ais_hybrid&w=740',
		weightOptions: ['250g', '500g'],
		price: 265.0,
	},
];

export const ProductCard = component$<{ product: Product }>(({ product }) => {
	const selectedWeight: Signal<string> = useSignal(product.weightOptions[0]);

	const handleAddToCart = $(() => {
		console.log(`Added ${product.name} (${selectedWeight.value}) to cart!`);
	});

	return (
		<div class="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 relative group">
			<div class="absolute top-2 right-2 bg-primary-500 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
				Save
			</div>
			<img src={product.image} alt={product.name} class="w-full h-48 object-cover" />
			<div class="p-4">
				<div class="flex items-center justify-center mb-2">
					{Array.from({ length: 5 }).map((_, i) => (
						<svg
							key={i}
							class={`w-4 h-4 ${i < product.rating ? 'text-yellow-400' : 'text-gray-300'}`}
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.683-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.785.565-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
						</svg>
					))}
				</div>
				<h3 class="text-lg text-center font-semibold text-gray-800 mb-2">{product.name}</h3>
				<div class="relative mb-3">
					<select
						class="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
						value={selectedWeight.value}
						onChange$={(e) => (selectedWeight.value = (e.target as HTMLSelectElement).value)}
					>
						{product.weightOptions.map((option: string) => (
							<option key={option} value={option}>
								{option}
							</option>
						))}
					</select>
					<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
						<svg class="fill-current h-4 w-4" viewBox="0 0 20 20">
							<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9l4.95 4.95z" />
						</svg>
					</div>
				</div>
				<p class="text-xl font-bold text-gray-900 mb-4">Rs. {product.price.toFixed(2)}</p>
				<button
					class="w-full bg-primary-500 hover:bg-orange-900 text-white font-medium py-2 px-4 rounded-md transition duration-300"
					onClick$={handleAddToCart}
				>
					Add to Cart
				</button>
			</div>
		</div>
	);
});

export const AuthenticPicklesAndOils = component$(() => {
	const productData = useStore({ products: products });

	return (
		<div class="font-sans bg-primary-100 py-10">
			<div class="container mx-auto">
				<div class="flex justify-between items-center mb-8">
					<h1 class="text-3xl font-bold text-gray-800">Authentic Pickles & Oils</h1>
					<div class="flex space-x-3">
						<button class="bg-white border border-gray-300 text-gray-700 text-sm px-4 py-2 rounded-full shadow-md hover:bg-primary-300 transition duration-300">
							Pickles
						</button>
						<button class="bg-white border border-gray-300 text-gray-700 text-sm px-4 py-2 rounded-full shadow-md hover:bg-primary-300 transition duration-300">
							Oils
						</button>
					</div>
				</div>

				<div class="relative">
					<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
						{productData.products.map((product: Product) => (
							<ProductCard key={product.id} product={product} />
						))}
					</div>

					{/* Navigation Arrows */}
					<button class="hidden absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 hidden md:block">
						<svg
							class="w-6 h-6 text-gray-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M15 19l-7-7 7-7"
							></path>
						</svg>
					</button>
					<button class="hidden absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 hidden md:block">
						<svg
							class="w-6 h-6 text-gray-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 5l7 7-7 7"
							></path>
						</svg>
					</button>
				</div>
			</div>
		</div>
	);
});

export default AuthenticPicklesAndOils;
