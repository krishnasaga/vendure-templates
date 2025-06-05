import { component$, QRL, useSignal, useVisibleTask$, $ } from '@builder.io/qwik';
import { getEligiblePaymentMethodsQuery } from '~/providers/shop/checkout/checkout';
import { EligiblePaymentMethods } from '~/types';
import { shopSdk } from '~/graphql-wrapper';

declare global {
	interface Window {
		Razorpay: any;
	}
}

export default component$<{ onForward$: QRL<() => void> }>(({ onForward$ }) => {
	const paymentMethods = useSignal<EligiblePaymentMethods[]>();

	useVisibleTask$(async () => {
		paymentMethods.value = await getEligiblePaymentMethodsQuery();
	});

	useVisibleTask$(() => {
		if (!document.querySelector('#razorpay-script')) {
			const script = document.createElement('script');
			script.id = 'razorpay-script';
			script.src = 'https://checkout.razorpay.com/v1/checkout.js';
			script.async = true;
			document.body.appendChild(script);
		}
	});

	return (
		<div class="flex flex-col space-y-24 items-center">
			<button
				class="flex px-6 bg-black hover:bg-gray-800 items-center justify-center space-x-2 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
				onClick$={$(async () => {
					await shopSdk.setOrderShippingMethod({
						shippingMethodId: '1',
					});

					await shopSdk.transitionOrderToState({ state: 'ArrangingPayment' });

					try {
						const order = await shopSdk.addPaymentToOrder({
							input: {
								method: 'razorpay',
								metadata: {},
							},
						});

						console.log(order);
						const amount = (order as any)?.addPaymentToOrder.payments[0].amount;
						const razorpayOrderId = (order as any)?.addPaymentToOrder.payments[0].transactionId;
						if (!razorpayOrderId) {
							alert('Payment setup failed (missing order ID).');
							return;
						}

						const rzp = new window.Razorpay({
							key: import.meta.env.VITE_RAZORPAY_KEY_ID,
							amount: amount * 100,
							currency: 'INR',
							order_id: razorpayOrderId,
							handler: async () => {
								onForward$();
							},
							prefill: {
								name: 'Customer',
								email: 'test@example.com',
							},
							theme: {
								color: '#3399cc',
							},
						});

						rzp.open();
					} catch (err) {
						console.error('Razorpay error:', err);
						alert('Something went wrong. Try again.');
					}
				})}
			>
				<span>Pay with Razorpay</span>
			</button>
		</div>
	);
});
