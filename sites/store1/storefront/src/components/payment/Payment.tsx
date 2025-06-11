import { component$, QRL, useSignal, useVisibleTask$, $ } from '@builder.io/qwik';
import { getEligiblePaymentMethodsQuery } from '~/providers/shop/checkout/checkout';
import { EligiblePaymentMethods } from '~/types';
import { shopSdk } from '~/graphql-wrapper';

declare global {
	interface Window {
		Razorpay: any;
	}
}

export default component$<{ onForward$: QRL<({ orderCode }: { orderCode: string }) => void> }>(
	({ onForward$ }) => {
		const paymentMethods = useSignal<EligiblePaymentMethods[]>();

		const startRazorpayPayment$ = $(async () => {
			await shopSdk.setOrderShippingMethod({shippingMethodId: '1'});
			await shopSdk.transitionOrderToState({ state: 'ArrangingPayment' });
			try {
				const order = await shopSdk.addPaymentToOrder({
					input: {
						method: 'razorpay',
						metadata: {},
					},
				});

				const vendureOrderCode = (order as any)?.addPaymentToOrder.code;
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
						await shopSdk.activeOrder({});
						onForward$({ 
							orderCode: vendureOrderCode
						 });
					},
					onabort: async () => {
						await shopSdk.transitionOrderToState({ state: 'AddingItems' });
					},
					prefill: {
						name: 'Customer',
						email: 'test@example.com',
					},
					theme: {
						color: '#EA570C',
					},
				});

				rzp.open();
			} catch (err) {
				console.error('Razorpay error:', err);
				await shopSdk.transitionOrderToState({ state: 'AddingItems' });
				alert('Something went wrong. Try again.');
			}
		});

		useVisibleTask$(async () => {
			paymentMethods.value = await getEligiblePaymentMethodsQuery();

			if (!document.querySelector('#razorpay-script')) {
				const script = document.createElement('script');
				script.id = 'razorpay-script';
				script.src = 'https://checkout.razorpay.com/v1/checkout.js';
				script.async = true;
				script.onload = () => startRazorpayPayment$(); // Trigger Razorpay after script loads
				document.body.appendChild(script);
			} else {
				startRazorpayPayment$(); // Trigger directly if already loaded
			}
		});

		return (
			<div class="text-center mt-20 text-lg font-medium text-gray-600">
				Loading payment gateway...
			</div>
		);
	}
);
