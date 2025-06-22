import { component$, useContext, useSignal, useTask$ } from '@qwik.dev/core';
import { addItemToOrderMutation } from '~/providers/shop/orders/order';
import { APP_STATE } from '~/constants';
import type { Order } from '~/generated/graphql';
import CheckIcon from '../icons/CheckIcon';

export default component$(
  ({ bestSeller, discount, productName, slug, CurrencyCode, productAsset, varients }: any) => {
    const selectedVariantId = useSignal(varients?.[0]?.id || '');
    const selectedPrice = useSignal(varients?.[0]?.priceWithTax || 0);
    const stockLevel = useSignal(varients?.[0]?.stockLevel || 'IN_STOCK');
    const isAddingToCart = useSignal(false);

    const appState = useContext(APP_STATE);

    useTask$(({ track }) => {
      track(() => selectedVariantId.value);
      const selected = varients?.find((v: any) => v.id === selectedVariantId.value);
      if (selected) {
        selectedPrice.value = selected.priceWithTax;
        stockLevel.value = selected.stockLevel;
      }
    });

    return (
      <div class="max-w-sm rounded-md overflow-hidden shadow-sm border border-gray-200 bg-white">
        <div class="relative">
          <a href={`/products/${slug}`} class="block">
            <img
              src={productAsset}
              alt={productName}
              width={400}
              height={400}
              class="w-full h-64 object-cover bg-yellow-100"
            />
          </a>
          {discount && (
            <div class="absolute top-2 left-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded font-semibold">
              Save 11%
            </div>
          )}
          {bestSeller && (
            <div class="absolute top-2 right-2 bg-secondary-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
              Best Seller
            </div>
          )}
        </div>

        <div class="p-2">
          <h3 class="font-semibold text-neutral-dark text-sm mb-1">{productName}</h3>

          <div class="mb-3">
            <span class="text-lg font-bold text-neutral-darkest mr-2">
              {CurrencyCode === 'INR' ? 'Rs.' : CurrencyCode} {(selectedPrice.value / 100).toFixed(2)}
            </span>
          </div>

          {varients?.length > 0 && (
            <div class="mb-3">
              <select
                class="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                onChange$={(e) => {
                  selectedVariantId.value = (e.target as HTMLSelectElement).value;
                }}
              >
                {varients.map((variant: any) => (
                  <option key={variant.id} value={variant.id}>
                    {variant.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <button
            disabled={stockLevel.value === 'OUT_OF_STOCK' || isAddingToCart.value}
            class={`w-full font-semibold py-2 rounded transition ${
              stockLevel.value === 'OUT_OF_STOCK' || isAddingToCart.value
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-primary-600 hover:bg-primary-700 text-white'
            }`}
            onClick$={async () => {
              if (stockLevel.value === 'OUT_OF_STOCK') return;

              isAddingToCart.value = true;
              const result = await addItemToOrderMutation(selectedVariantId.value, 1);
              isAddingToCart.value = false;

              if (result.__typename === 'Order') {
                appState.activeOrder = result as Order;
              } else {
                console.error('Error adding to cart:', result);
              }
            }}
          >
            {(() => {
              if (stockLevel.value === 'OUT_OF_STOCK') return 'Out of stock';
              if (isAddingToCart.value) return 'ADDING...';

              const line = appState.activeOrder?.lines?.find(
                (line) => line.productVariant.id === selectedVariantId.value
              );

              if (line) {
                return (
                  <span class="flex items-center justify-center gap-2 text-green-700">
                    <CheckIcon/>
                    {line.quantity} in cart
                  </span>
                );
              }

              return 'ADD TO CART';
            })()}
          </button>
        </div>
      </div>
    );
  }
);
