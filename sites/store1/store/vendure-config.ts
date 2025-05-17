import { VendureConfig } from "@vendure/core";
import { ManualPaymentMethodHandler } from "@vendure/core/dist/plugin/payment-method/manual-payment-method-handler";

export const config: VendureConfig = {
  apiOptions: {
    port: 4001,
    adminApiPath: "admin-api",
    shopApiPath: "shop-api",
  },
  authOptions: {
    tokenMethod: ["bearer", "cookie"],
    cookieOptions: {
      secret: process.env.SESSION_SECRET || "secret-key",
    },
  },
  dbConnectionOptions: {
    type: "sqlite",
    database: "vendure",
    synchronize: false, // only for development
    logging: false,
  },
  paymentOptions: {
    paymentMethodHandlers: [ManualPaymentMethodHandler],
  },
};
