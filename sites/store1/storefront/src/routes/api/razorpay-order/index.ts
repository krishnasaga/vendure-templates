import { type RequestHandler } from '@builder.io/qwik-city';
import Razorpay from 'razorpay';
import { ENV_VARIABLES } from '~/env';

export const onPost: RequestHandler = async ({ json }) => {
    const razorpay = new Razorpay({
        key_id: ENV_VARIABLES.VITE_RAZORPAY_KEY_ID,
        key_secret: ENV_VARIABLES.VITE_RAZORPAY_KEY_SECRET,
    });

    const order = await razorpay.orders.create({
        amount: 50000, // amount in paise (500 INR)
        currency: 'INR',
        receipt: `receipt_${Date.now()}`,
    });

    json(200, {
        orderId: order.id,
        amount: order.amount,
    });
};
