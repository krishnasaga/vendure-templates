import { QRL, component$, useStore, useVisibleTask$, useContext } from '@qwik.dev/core';
import { useLocation } from '@qwik.dev/router';
import CartContents from '~/components/cart-contents/CartContents';
import CartTotals from '~/components/cart-totals/CartTotals';
import CheckCircleIcon from '~/components/icons/CheckCircleIcon';
import ChevronRightIcon from '~/components/icons/ChevronRightIcon';
import { Order } from '~/generated/graphql';
import { getOrderByCodeQuery } from '~/providers/shop/orders/order';
import { APP_STATE } from '~/constants';

type Step = 'SHIPPING' | 'PAYMENT' | 'CONFIRMATION';

export default component$<{ onForward$: QRL<() => void> }>(() => {
	const {
		params: { code },
	} = useLocation();
	const appState = useContext(APP_STATE);
	const store = useStore<{ order?: Order }>({});

	const steps: { name: string; state: Step }[] = [
		{ name: $localize`Shipping Checkout`, state: 'SHIPPING' },
		{ name: $localize`Payment`, state: 'PAYMENT' },
		{ name: $localize`Confirmation`, state: 'CONFIRMATION' },
	];

	useVisibleTask$(async () => {
		store.order = await getOrderByCodeQuery(code);
		// appState.activeOrder = null;
		appState.showCart = false;
	});

	console.log(store);

	return (
		<div>
			{store.order?.id ? (
				<div class="bg-gray-50 pb-48">
					<div class="lg:max-w-3xl mx-auto max-w-2xl pt-8 px-4 sm:px-6 lg:px-8">
						<h2 class="sr-only">{$localize`Checkout`}</h2>
						<nav class="hidden sm:block pb-8 mb-8 border-b">
							<ol class="flex space-x-4 justify-center">
								{steps.map((step, index) => (
									<li key={step.name} class="flex items-center">
										<span class={`${step.state === 'CONFIRMATION' ? 'text-primary-600' : ''}`}>
											{step.name}
										</span>
										{index !== steps.length - 1 ? <ChevronRightIcon /> : null}
									</li>
								))}
							</ol>
						</nav>
						<div class="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
							<div class="lg:col-span-2">
								<div>
									<h2 class="text-3xl flex items-center space-x-2 sm:text-5xl font-light tracking-tight text-gray-900 my-8">
										<CheckCircleIcon forcedClass="text-green-600 w-8 h-8 sm:w-12 sm:h-12" />
										<span>{$localize`Order summary`}</span>
									</h2>
									<p class="text-lg text-gray-700">
										{$localize`Your order`} <span class="font-bold">{store.order?.code}</span>{' '}
										{$localize`has been received!`}
									</p>
									<div class="mt-12">
										<div class="mb-6">
											<CartContents order={store.order} />
										</div>
										<CartTotals order={store.order} readonly />
										<div class="mt-12 flex justify-center">
											<button
												class="px-6 py-3 bg-primary-600 text-white text-base font-medium rounded-md shadow hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
												onClick$={() => {
													window.location.href = '/';
													window.location.reload(); // optional: reload home page
												}}
											>
												{$localize`Continue Shopping`}
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div class={'h-[100vh]'}>
					<div class={'container mx-auto h-full w-full'}>
						<div class={'flex items-center justify-center h-full w-full'}>
							<div class={'w-[200px] h-[200px]'}>
								<picture>
									<source srcset="/spice_leaf_loading_indicator.jpg" type="image/jpeg" />
									<img
										src="/spice_leaf_loading_indicator.jpg"
										alt="Loading indicator with spice leaves"
										class="w-[200px] h-[200px] object-contain"
									/>
								</picture>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
});
