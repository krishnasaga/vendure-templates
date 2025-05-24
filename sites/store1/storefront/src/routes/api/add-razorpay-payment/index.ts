import { type RequestHandler } from '@builder.io/qwik-city';
import crypto from 'crypto';
import { ENV_VARIABLES } from '~/env';

export const onPost: RequestHandler = async ({ request, json }) => {
	const body = await request.json();
	const { razorpayPaymentId, razorpayOrderId, razorpaySignature } = body.metadata;

	const keySecret = ENV_VARIABLES.VITE_RAZORPAY_KEY_SECRET;

	if (!keySecret) {
		console.error('Missing Razorpay secret in environment variables');
		json(500, { success: false, message: 'Server configuration error' });
		return;
	}

	const expectedSignature = crypto
		.createHmac('sha256', keySecret)
		.update(`${razorpayOrderId}|${razorpayPaymentId}`)
		.digest('hex');

	if (expectedSignature === razorpaySignature) {
		json(200, { success: true });
	} else {
		json(400, { success: false, message: 'Invalid signature' });
	}
};
