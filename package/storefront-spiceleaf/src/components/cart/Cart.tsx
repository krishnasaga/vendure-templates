import { component$, useContext, useSignal, useTask$ } from '@qwik.dev/core';
import { useLocation } from '@qwik.dev/router';
import { APP_STATE } from '~/constants';
import { isCheckoutPage } from '~/utils';
import CartContents from '../cart-contents/CartContents';
import CartPrice from '../cart-totals/CartPrice';
import CloseIcon from '../icons/CloseIcon';
import { AppState } from '~/types';
import { Signal } from '@qwik.dev/core';
import emptyCartImage from './empty-cart.png';

export default component$(() => {
	const location = useLocation();
	const appState = useContext(APP_STATE);
	const isInEditableUrl = !isCheckoutPage(location.url.toString());

	return <CartPanel isInEditableUrl={isInEditableUrl} appState={appState} />;
});

// --- CartPanel ---
const CartPanel = component$(
	({ isInEditableUrl, appState }: { isInEditableUrl: boolean; appState: AppState }) => {
		const shouldRender = useSignal(false);

		useTask$(({ track }) => {
			const open = track(() => appState.showCart);

			if (open) {
				setTimeout(() => {
					shouldRender.value = true;
				},20);
			} else {
				setTimeout(() => {
					shouldRender.value = false;
				}, 200);
			}
		});

		return (
			<div class={`fixed inset-0 overflow-hidden z-20 ${appState.showCart ? 'block' : 'hidden'}`}>
				<div class="absolute inset-0 overflow-hidden">
					<div
						class="absolute inset-0 bg-muted bg-opacity-75 transition-opacity opacity-100"
						onClick$={() => {
							shouldRender.value = false;
						}}
					></div>
					<div class="fixed inset-y-0 right-0 pl-10 max-w-full flex">
						<div
							class={`w-screen max-w-md transform transition-transform duration-200 ease-out ${
								shouldRender.value ? 'translate-x-0' : 'translate-x-full'
							}`}
							onTransitionEnd$={() => {
								if (!shouldRender.value) {
									appState.showCart = false;
								}
							}}
						>
							<div class="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
								<CartHeader shouldRender={shouldRender} />
								<CartBody />
								<CartFooter isInEditableUrl={isInEditableUrl} />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
);

// --- CartHeader ---
const CartHeader = component$(({ shouldRender }: { shouldRender: Signal<boolean> }) => {
	return (
		<div class="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
			<div class="flex items-start justify-between">
				<h2 class="text-lg font-medium text-primary">{$localize`Shopping cart`}</h2>
				<div class="ml-3 h-7 flex items-center">
					<button
						type="button"
						class="-m-2 p-2 text-muted hover:text-secondary hover:bg-grey-100 round-sm"
						onClick$={() => (shouldRender.value = false)}
					>
						<span class="sr-only">Close panel</span>
						<CloseIcon />
					</button>
				</div>
			</div>
		</div>
	);
});

// --- CartBody ---
const CartBody = component$(() => {
	const appState = useContext(APP_STATE);
	const hasItems = !!appState?.activeOrder?.totalQuantity;

	return hasItems ? (
		<div class={`mt-8 px-4 sm:px-6 flex h-full flex-col justify-start`}>
			<CartContents />
		</div>
	) : (
		<div class="flex h-full flex-col items-center justify-center text-xl text-muted">
			<img width={100} height={100} alt={'empty-shoping-cart'} src={emptyCartImage} />
			<h2 class="text-2xl font-bold text-neutral-dark">{$localize`Your cart is empty`}</h2>
			<a class={'text-lg text-netural-darkest font-medium'} href={'/collections/shop-all'}>
				Continue Shoping
			</a>
		</div>
	);
});

// --- CartFooter ---
const CartFooter = component$(({ isInEditableUrl }: { isInEditableUrl: boolean }) => {
	const appState = useContext(APP_STATE);
	const hasItems = !!appState?.activeOrder?.totalQuantity;

	if (!hasItems || !isInEditableUrl) return null;

	return (
		<div class="border-t border-muted py-6 px-4 sm:px-6">
			<div class="flex justify-between text-base font-medium text-primary">
				<p>{$localize`Subtotal`}</p>
				<p>
					<CartPrice field={'subTotalWithTax'} order={appState?.activeOrder} />
				</p>
			</div>
			<p class="mt-0.5 text-sm text-secondary">
				{$localize`Shipping will be calculated at checkout.`}
			</p>
			<div class="mt-6">
				<a
					href="/checkout/"
					class="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-800 hover:bg-primary-900 w-full"
				>
					{$localize`Checkout`}
				</a>
			</div>
		</div>
	);
});
