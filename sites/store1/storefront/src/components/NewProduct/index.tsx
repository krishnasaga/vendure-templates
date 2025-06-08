import { component$, useContext, useSignal } from '@builder.io/qwik';
import { APP_STATE } from '~/constants';
import { Order, ProductVariant } from '~/generated/graphql';
import { addItemToOrderMutation } from '~/providers/shop/orders/order';
import { Collection } from '~/types';

// export const useProductLoader = routeLoader$(async ({ params }) => {
// 	const { slug } = cleanUpParams(params);
// 	const product = await getProductBySlug(slug);
// 	if (product?.assets.length === 1) {
// 		product?.assets.push({
// 			...product?.assets[0],
// 			id: 'placeholder_2',
// 			name: 'placeholder',
// 			preview: '/asset_placeholder.webp',
// 		});
// 	}
// 	return product;
// });

export const ProductCard = component$<{ product: any }>(({ product }) => {
	const selectedVariantId = useSignal(product.variants?.[0]?.sku ?? '');
	const selectedVariant = () =>
		product.variants?.find((v: any) => v.sku === selectedVariantId.value) ?? product.variants?.[0];
	// const productSignal = useProductLoader();
	const addItemToOrderErrorSignal = useSignal('');
	const appState = useContext(APP_STATE);
	// const quantitySignal = useComputed$<Record<string, number>>(() => {
	// 		const result: Record<string, number> = {};
	// 		(productSignal.value.variants || []).forEach((variant: Variant) => {
	// 			const orderLine = (appState.activeOrder?.lines || []).find(
	// 				(l: OrderLine) =>
	// 					l?.productVariant?.id === variant?.id &&
	// 					l?.productVariant?.product?.id === productSignal?.value?.id
	// 			);
	// 			result[variant?.id] = orderLine?.quantity || 0;
	// 		});
	// 		return result;
	// 	});

	return (
		<div class="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 relative group">
			<div class=" absolute top-2 right-2 bg-primary-500 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
				Save
			</div>
			<div class={'w-[100%] h-[280px] overflow-hidden relative'}>
				<a href={`/products/${product.slug}`} class="block">
					<img
						src={(product as unknown as any)?.featuredAsset.preview + '?w=400&h=400&format=webp'}
						alt={product.name}
						object-fit="cover"
						object-position="center"
						width={400}
						height={400}
						class={
							'object-cover w-full h-48 sm:h-64 md:h-72 lg:h-80 xl:h-96 transition-transform duration-300 group-hover:scale-105'
						}
					/>
				</a>
			</div>
			<div class="p-4">
				<div class="flex items-center justify-center mb-2">
					{Array.from({ length: 5 }).map((_, i) => (
						<svg
							key={i}
							class={`w-4 h-4 ${i < 0 ? 'text-yellow-400' : 'text-gray-300'}`}
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.683-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.785.565-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
						</svg>
					))}
				</div>
				<h3 class="text-lg text-center font-semibold text-gray-800 mb-2">{product.name}</h3>
				<div class="relative mb-3">
					{product?.variants?.length > 1 ? (
						<select
							class="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							value={selectedVariantId.value}
							onChange$={(e) => (selectedVariantId.value = (e.target as HTMLSelectElement).value)}
						>
							{product.variants.map((option: any) => (
								<option key={option.sku} value={option.sku}>
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
					class="w-full bg-primary-500 hover:bg-orange-900 text-white font-medium py-2 px-4 rounded-md transition duration-300"
					onClick$={async () => {
						// if (quantitySignal.value[selectedVariantId.value] <= 7) {
							const addItemToOrder = await addItemToOrderMutation(
							selectedVariantId.value,
							1
						);
							if (addItemToOrder.__typename !== 'Order') {
								addItemToOrderErrorSignal.value = addItemToOrder.errorCode;
							} else {
								appState.activeOrder = addItemToOrder as Order;
							}
						// }
					}}
				>
					Add to Cartw
				</button>
			</div>
		</div>
	);
});

export const AuthenticPicklesAndOils = component$(({ collection }: { collection: Collection }) => {
	const products2 = groupVariantsByProduct((collection as unknown as any).productVariants.items);
	return (
		<div class="font-sans bg-primary-100 py-10">
			<div class="container mx-auto">
				<div class="flex justify-between items-center mb-8">
					<h1 class="text-3xl font-bold text-gray-800">{collection.name}</h1>
					<div class="hidden flex space-x-3">
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
						{products2.map((product: any) => (
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
