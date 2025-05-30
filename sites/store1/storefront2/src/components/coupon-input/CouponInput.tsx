import { $, component$, useContext, useSignal } from '@qwik.dev/core';
import { APP_STATE } from '~/constants';
import { Order } from '~/generated/graphql';
import { applyCouponCodeMutation } from '~/providers/shop/orders/order';
import Alert from '../alert/Alert';
import Success from '../success/Success';

export default component$(() => {
	const appState = useContext(APP_STATE);
	const couponCodeSignal = useSignal('');
	const errorSignal = useSignal('');
	const successSignal = useSignal('');

	const applyCoupon = $(async () => {
		if (couponCodeSignal.value) {
			successSignal.value = '';
			errorSignal.value = '';
			const res = await applyCouponCodeMutation(couponCodeSignal.value);
			if (res.__typename == 'Order') {
				appState.activeOrder = res as Order;
				successSignal.value = $localize`Coupon code successfully applied`;
				couponCodeSignal.value = '';
			} else {
				errorSignal.value = res.message;
			}
		}
	});

	return (
		<>
			{!!errorSignal.value && <Alert message={errorSignal.value} />}
			{!!successSignal.value && <Success message={successSignal.value} />}
			<div class="w-full py-2 mb-4">
				<form preventdefault:submit onSubmit$={() => applyCoupon()}>
					<div class="flex gap-2">
						<input
							type="text"
							placeholder={$localize`Enter a coupon code`}
							value={couponCodeSignal.value}
							onInput$={(_, el) => (couponCodeSignal.value = el.value)}
							class="block w-full border-muted rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
							required
						/>
						<button
							type="submit"
							class="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
						>
							{$localize`Apply`}
						</button>
					</div>
				</form>
			</div>
		</>
	);
});
