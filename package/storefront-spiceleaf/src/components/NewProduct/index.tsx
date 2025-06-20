import { component$, $, useComputed$, useContext, useSignal } from '@builder.io/qwik';
import { APP_STATE } from '~/constants';
import { Order, OrderLine, ProductVariant } from '~/generated/graphql';
import { addItemToOrderMutation } from '~/providers/shop/orders/order';
import { Collection, Variant } from '~/types';
import CheckIcon from '~/components/icons/CheckIcon';

export const ProductCard = component$<{ product: any }>(({ product }) => {
	const selectedVariantId = useSignal(product.variants?.[0]?.id ?? '');
	const isAddingToCart = useSignal(false);

	const selectedVariant = () =>
		product.variants?.find((v: any) => v.id === selectedVariantId.value) ?? product.variants?.[0];
	const addItemToOrderErrorSignal = useSignal('');
	const appState = useContext(APP_STATE);
	const quantitySignal = useComputed$<Record<string, number>>(() => {
		const result: Record<string, number> = {};
		(product.variants || []).forEach((variant: Variant) => {
			const orderLine = (appState.activeOrder?.lines || []).find(
				(l: OrderLine) =>
					l?.productVariant?.id === variant?.id && l?.productVariant?.product?.id === product?.id
			);
			result[variant?.id] = orderLine?.quantity || 0;
		});
		return result;
	});
	const getAddToCartButtonClass = () => {
		const base = 'w-full text-white font-medium py-2 px-4 rounded-md transition duration-300';

		if (selectedVariant()?.stockLevel === 'OUT_OF_STOCK') {
			return `bg-gray-400 cursor-not-allowed ${base}`;
		}

		if (quantitySignal.value[selectedVariantId.value]) {
			return `bg-green-600 hover:bg-green-700 ${base}`;
		}

		if (isAddingToCart.value) {
			return `bg-primary-100 cursor-not-allowed ${base}`;
		}

		return `bg-primary-500 hover:bg-orange-900 ${base}`;
	};

	return (
		<div class="h-full bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 relative group">
			<div class=" absolute top-2 right-2 bg-primary-500 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
				Save
			</div>
			<div class={'w-[100%] h-[280px] overflow-hidden relative'}>
				<a href={`/products/${product.slug}`} class="block">
					<picture>
						{/* Mobile image - for screens up to 639px */}
						<source
							srcset={
								(product as any)?.featuredAsset.preview.replace('http', 'https') +
								'?w=300&h=500&format=webp'
							}
							type="image/webp"
							media="(max-width: 639px)"
						/>
						{/* Desktop image - fallback for larger screens */}
						<source
							srcset={
								(product as any)?.featuredAsset.preview?.replace('http', 'https') +
								'?w=400&h=400&format=png'
							}
							type="image/webp"
						/>
						{/* Fallback for non-WebP browsers */}
						<img
							src={
								(product as any)?.featuredAsset.preview.replace('http', 'https') + '?w=400&h=400'
							}
							alt={product.name}
							width={400}
							height={400}
							class="object-cover w-full h-64 sm:h-64 md:h-72 lg:h-80 xl:h-96 transition-transform duration-300 group-hover:scale-105"
						/>
					</picture>
				</a>
			</div>
			<div class="p-4">
				<h3 class="text-lg text-center font-semibold text-gray-800 mb-2">{product.name}</h3>
				<div class="relative mb-3">
					{product?.variants?.length > 1 ? (
						<select
							class="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							value={selectedVariantId.value}
							onChange$={(e) => (selectedVariantId.value = (e.target as HTMLSelectElement).value)}
						>
							{product.variants.map((option: any) => (
								<option key={option.id} value={option.id}>
									{option.name}
								</option>
							))}
						</select>
					) : (
						<h4 class="text-md text-center font-semibold text-gray-800 mb-2">
							{product.variants?.[0].name}
						</h4>
					)}
				</div>
				<p class="text-xl font-bold text-gray-900 mb-4">
					Rs.{' '}
					{selectedVariant()?.priceWithTax
						? (parseInt(selectedVariant()?.priceWithTax) / 100).toFixed(2)
						: ''}
				</p>
				<button
					disabled={isAddingToCart.value }
					class={getAddToCartButtonClass()}
					onClick$={async () => {
						// if (selectedVariant()?.stockLevel === 'OUT_OF_STOCK') return;
							isAddingToCart.value = true;
						const addItemToOrder = await addItemToOrderMutation(selectedVariantId.value, 1);
						isAddingToCart.value = false;

						if (addItemToOrder.__typename !== 'Order') {
							addItemToOrderErrorSignal.value = addItemToOrder.errorCode;
							} else {
							appState.activeOrder = addItemToOrder as Order;
						}
					}}
				>
					{selectedVariant()?.stockLevel === 'OUT_OF_STOCK' ? (
						<span>Sold Out</span>
					) : quantitySignal.value[selectedVariantId.value] ? (
						<span class="flex items-center justify-center gap-2">
							{isAddingToCart.value ? (
								$localize`Adding...`
							) : (
								<>
									<CheckIcon />
									{$localize`${quantitySignal.value[selectedVariantId.value]} in cart`}
								</>
							)}
						</span>
					) : (
						<span>{isAddingToCart.value ? $localize`Adding...` : $localize`Add to cart`}</span>
					)}
				</button>	
			</div>
		</div>
	);
});

export const ProductCollectionSlider = component$(({ collection }: { collection: Collection }) => {
	const products = groupVariantsByProduct((collection as unknown as any).productVariants.items);
	const scrollRef = useSignal<HTMLElement>();

	const scrollLeft = $(() => {
		scrollRef.value?.scrollBy({ left: -300, behavior: 'smooth' });
	});

	const scrollRight = $(() => {
		scrollRef.value?.scrollBy({ left: 300, behavior: 'smooth' });
	});

	return (
		<div class="font-sans bg-primary-100 py-10">
			<div class="container mx-auto">
				<div class="flex justify-between items-center mb-8">
					<h1 class="text-3xl font-bold text-gray-800 ">{collection.name}</h1>
				</div>
				<div class="relative">
					<div
						ref={scrollRef}
						class="h-full flex gap-5 overflow-x-auto scroll-smooth scrollbar-hide pb-4"
					>
						{products.map((product: any, index: number) => {
							return (
								<div
									key={product.id}
									class={`min-w-[260px] max-w-[260px]
                    transition-transform
                    delay-[${index * 200}ms]
                    duration-500 `}

								>
									<ProductCard product={product} />
								</div>
							);
						})}
					</div>

					{/* Navigation Buttons */}
					<button
						onClick$={scrollLeft}
						class="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 hidden md:block"
					>
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
					<button
						onClick$={scrollRight}
						class="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 hidden md:block"
					>
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

export default ProductCollectionSlider;

export function groupVariantsByProduct(variants: ProductVariant[]): any[] {
	const productMap = new Map<string, any>();

	for (const variant of variants) {
		const productId = variant.product.id;

		if (!productMap.has(productId)) {
			productMap.set(productId, {
				...variant.product,
				id: variant.product.id,
				variants: [],
			});
		}

		(productMap.get(productId) as unknown as any)!.variants.push?.(variant);
	}

	return Array.from(productMap.values());
}
