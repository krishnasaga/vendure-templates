import { component$, useContext } from '@qwik.dev/core';
import { useLocation } from '@qwik.dev/router';
import { APP_STATE } from '~/constants';
import { isCheckoutPage } from '~/utils';
import CartContents from '../cart-contents/CartContents';
import CartPrice from '../cart-totals/CartPrice';
import CloseIcon from '../icons/CloseIcon';

export default component$(() => {
	const location = useLocation();
	const appState = useContext(APP_STATE);
	const isInEditableUrl = !isCheckoutPage(location.url.toString());

	return appState.showCart ? <CartPanel isInEditableUrl={isInEditableUrl} /> : null;
});

// --- CartPanel ---
const CartPanel = component$(({ isInEditableUrl }: { isInEditableUrl: boolean }) => {
	return (
		<div class="fixed inset-0 overflow-hidden z-20">
			<div class="absolute inset-0 overflow-hidden">
				<div class="absolute inset-0 bg-muted bg-opacity-75 transition-opacity opacity-100"></div>
				<div class="fixed inset-y-0 right-0 pl-10 max-w-full flex">
					<div class="w-screen max-w-md translate-x-0">
						<div class="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
							<CartHeader />
							<CartBody />
							<CartFooter isInEditableUrl={isInEditableUrl} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
});

// --- CartHeader ---
const CartHeader = component$(() => {
	const appState = useContext(APP_STATE);

	return (
		<div class="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
			<div class="flex items-start justify-between">
				<h2 class="text-lg font-medium text-primary">{$localize`Shopping cart`}</h2>
				<div class="ml-3 h-7 flex items-center">
					<button
						type="button"
						class="-m-2 p-2 text-muted hover:text-secondary"
						onClick$={() => (appState.showCart = false)}
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
		<div class="flex flex-col items-center justify-center text-xl text-muted ">
			<h2 class="text-4xl font-bold">{$localize`Your cart is empty`}</h2>
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
