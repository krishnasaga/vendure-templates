import { component$ } from '@qwik.dev/core';

export default component$(
	({ bestSeller, discount, productName, CurrencyCode, productAsset, varients }: any) => {
		return (
			<div class="max-w-sm rounded-md overflow-hidden shadow-sm border border-gray-200 bg-white">
				{/* Header */}
				<div class="relative">
					<img
						src={productAsset}
						alt="Two Brothers A2 Ghee"
						class="w-full h-64 object-cover bg-yellow-100"
					/>
					{discount ? (
						<div class="absolute top-2 left-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded font-semibold">
							Save 11%
						</div>
					) : null}
					{bestSeller ? (
						<div class="absolute top-2 right-2 bg-secondary-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
							Best Seller
						</div>
					) : null}
				</div>
				{/* Product Info */}
				<div class="p-2">
					<h3 class="font-semibold text-neutral-dark text-sm mb-1">{productName}</h3>

					<div class="flex items-center text-yellow-500 text-sm mb-2">
						★★★★★
						<span class="text-gray-600 ml-2">4.9 · 2k+ Reviews</span>
					</div>

					{/* Price Section */}
					<div class="mb-3">
						<span class="text-lg font-bold text-neutral-darkest mr-2">{CurrencyCode}27.73</span>
						<span class="line-through text-gray-400">{CurrencyCode} 31.20</span>
					</div>

					{/* Size Selector */}
					{varients?.length > 0 ? (
						<div class="mb-3">
							<select class="w-full border border-gray-300 rounded px-3 py-2 text-sm">
								{varients.map((variant: any) => (
									<option key={variant.id} value={variant.id}>
										{`${variant.name} - ${CurrencyCode}${variant.price}`}
									</option>
								))}
							</select>
						</div>
					) : null}

					{/* Quantity Selector */}

					{/* Add to Cart Button */}
					<button class="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 rounded transition">
						ADD TO CART
					</button>
				</div>
			</div>
		);
	}
);
