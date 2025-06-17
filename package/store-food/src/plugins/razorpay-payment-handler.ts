import { PaymentMethodHandler, LanguageCode } from '@vendure/core';
import Razorpay from 'razorpay';

// Create localized strings for the labels using the correct LanguageCode
const localizedString = (value: string) => [
  { languageCode: LanguageCode.en, value },  // Use LanguageCode.en instead of 'en'
];

// Create a localized description (required by Vendure)
const localizedDescription = (value: string) => [
  { languageCode: LanguageCode.en, value },  // Use LanguageCode.en for description as well
];

export const razorpayPaymentHandler = new PaymentMethodHandler({
  code: 'razorpay',

  args: {
    key_id: { type: 'string', label: localizedString('Key ID') },
    key_secret: { type: 'string', label: localizedString('Key Secret') },
  },

  // Add the required description
  description: localizedDescription('Pay using Razorpay'),

  createPayment: async (ctx, order, amount, args, metadata) => {
    const razorpay = new Razorpay({
      key_id: String(args.key_id),
      key_secret: String(args.key_secret),
    });

    const payment = await razorpay.orders.create({
      amount,
      currency: order.currencyCode,
      receipt: `order_${order.code}`,
    });

    return {
      amount,
      state: 'Authorized' as const,
      transactionId: payment.id,
      metadata: {
        razorpayOrderId: payment.id,
      },
    };
  },

  settlePayment: async (ctx, order, payment, args) => {
    return {
      success: true,
    };
  },
});
