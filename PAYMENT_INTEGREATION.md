
# Razorpay Payment Integration with Vendure (Two Parts) 

## Introduction
This document outlines the implementation details for integrating Razorpay with Vendure using a two-step payment flow: authorization followed by capture (settlement). This design provides better control over the payment lifecycle and improves handling of edge cases such as inventory validation or fraud checks prior to fund capture.

## Integration Flow Overview
The integration consists of two distinct phases:

*Payment Authorization* – Performed during checkout from the storefront.

*Payment Capture (Settlement)* – Performed via Admin UI or Admin API once conditions are met (e.g., stock validation, fraud verification).

![image](https://github.com/user-attachments/assets/4f8a0781-f892-48fd-ab98-d4ab2f4ef244)

### Part 1: Payment Authorization
Customer initiates checkout from the frontend Storefront UI.

1) The frontend executes the addPaymentToOrder GraphQL mutation through the Shop API. This mutation includes order details and a Razorpay-specific payment method code.

2) Vendure’s PaymentMethodHandler invokes Razorpay’s API (typically orders.create) to initiate a payment authorization and receives a Razorpay Payment ID in response.

3) Vendure stores this Razorpay Payment ID in a Payment entity and updates the order’s state to PaymentAuthorized.

4) The Storefront redirects the customer to the Razorpay Checkout UI, passing the Razorpay Payment ID and necessary order/customer metadata.

5) The customer completes the payment on Razorpay’s hosted interface. Razorpay authorizes the amount but does not yet capture the funds.

*At this point, the customer has authorized the payment, but money has not yet moved.*

### Part 2: Payment Capture (Settlement)
1) Once the order is reviewed or validated (e.g., fraud check, inventory confirmation), an admin user or automated service calls the settlePayment mutation via the Admin API.

2) The Vendure PaymentMethodHandler makes a request to Razorpay’s payments.capture API using the Payment ID obtained in Step 1.

3) Razorpay captures the funds and confirms the capture.

4) Vendure marks the payment as settled and transitions the order’s state to PaymentSettled.

*Capture is separated intentionally to give the merchant full control over when funds are finalized.*

