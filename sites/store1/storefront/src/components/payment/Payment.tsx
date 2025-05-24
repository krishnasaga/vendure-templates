import { $, component$, QRL, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { getEligiblePaymentMethodsQuery } from '~/providers/shop/checkout/checkout';
import { EligiblePaymentMethods } from '~/types';
import CreditCardIcon from '../icons/CreditCardIcon';
import BraintreePayment from './BraintreePayment';
import StripePayment from './StripePayment';

interface RazorpayOrderResponse {
	orderId: string;
	amount: number;
}

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
		// Load Razorpay script once
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
			{paymentMethods.value?.map((method) => (
				<div key={method.code} class="flex flex-col items-center">
					{method.code === 'standard-payment' && (
						<>
							<p class="text-gray-600 text-sm p-6">
								{$localize`This is a dummy payment for demonstration purposes only`}
							</p>
							<button
								class="flex px-6 bg-primary-600 hover:bg-primary-700 items-center justify-center space-x-2 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
								onClick$={$(async () => {
									await onForward$();
								})}
							>
								<CreditCardIcon />
								<span>{$localize`Pay with ${method.name}`}</span>
							</button>
						</>
					)}

					{method.code === 'razorpay' && (
						<>
							<button
								class="flex px-6 bg-black hover:bg-gray-800 items-center justify-center space-x-2 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
								onClick$={$(async () => {
									try {
										const res = await fetch('/api/razorpay-order', {
											method: 'POST',
										});
										const data: RazorpayOrderResponse = await res.json();

										const options = {
											key: import.meta.env.VITE_RAZORPAY_KEY_ID ,
											amount: data.amount,
											currency: 'INR',
											order_id: data.orderId,
											handler: async (response: any) => {
												await fetch('/api/add-razorpay-payment', {
													method: 'POST',
													headers: {
														'Content-Type': 'application/json',
													},
													body: JSON.stringify({
														method: 'razorpay',
														metadata: {
															razorpayPaymentId: response.razorpay_payment_id,
															razorpayOrderId: response.razorpay_order_id,
															razorpaySignature: response.razorpay_signature,
														},
													}),
												});
												await onForward$();
											},
											prefill: {
												name: 'Customer',
												email: 'test@example.com',
											},
											theme: {
												color: '#3399cc',
											},
										};

										const rzp = new window.Razorpay(options);
										rzp.open();
									} catch (err) {
										console.error('Razorpay payment error:', err);
										alert('Failed to start payment. Please try again.');
									}
								})}
							>
								<span>Pay with Razorpay</span>
							</button>
						</>
					)}

					{method.code.includes('stripe') && <StripePayment />}
					{method.code.includes('braintree') && <BraintreePayment />}
				</div>
			))}
		</div>
	);
});
