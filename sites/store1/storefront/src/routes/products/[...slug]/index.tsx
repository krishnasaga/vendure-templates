import { component$, useComputed$, useContext, useSignal } from '@qwik.dev/core';
import { DocumentHead, routeLoader$ } from '@qwik.dev/router';
import Alert from '~/components/alert/Alert';
import Breadcrumbs from '~/components/breadcrumbs/Breadcrumbs';
import CheckIcon from '~/components/icons/CheckIcon';
import Price from '~/components/products/Price';
import StockLevelLabel from '~/components/stock-level-label/StockLevelLabel';
import { APP_STATE } from '~/constants';
import { Order, OrderLine } from '~/generated/graphql';
import { addItemToOrderMutation } from '~/providers/shop/orders/order';
import { getProductBySlug } from '~/providers/shop/products/products';
import { Variant } from '~/types';
import { cleanUpParams, generateDocumentHead } from '~/utils';
import { type StaticGenerateHandler } from '@builder.io/qwik-city';
import { gql } from 'graphql-tag';

const query = gql`
    query GetProducts {
        products {
            items {
                id
                name
                description
                slug
                collections {
                    id
                    slug
                    name
                    breadcrumbs {
                        id
                        name
                        slug
                    }
                }
                facetValues {
                    facet {
                        id
                        code
                        name
                    }
                    id
                    code
                    name
                }
                featuredAsset {
                    id
                    preview
                }
                assets {
                    id
                    preview
                }
                variants {
                    id
                    name
                    priceWithTax
                    currencyCode
                    sku
                    stockLevel
                    featuredAsset {
                        id
                        preview
                    }
                }
            }
        }
    }
`;

type ProductItem = {
    id: string;
    name: string;
    slug: string;
};

type ProductsResponse = {
    data: {
        products: {
            items: ProductItem[];
        };
    };
};

async function getProducts() {
    const response = await fetch('https://indiastore1.duckdns.org/shop-api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: query.loc?.source.body }),
    });

    const result = (await response.json()) as ProductsResponse;
    return result.data?.products.items;
}

export const onStaticGenerate: StaticGenerateHandler = async () => {
    const products = await getProducts();
    return {
        params: products
            ?.filter((product) => {
                return !!product.slug;
            })
            .map((product) => {
                return product;
            }),
    };
};

export const useProductLoader = routeLoader$(async ({ params }) => {
    const { slug } = cleanUpParams(params);
    const product = await getProductBySlug(slug);
    if (product?.assets.length === 1) {
        product?.assets.push({
            ...product?.assets[0],
            id: 'placeholder_2',
            name: 'placeholder',
            preview: '/asset_placeholder.webp',
        });
    }
    return product;
});

export default component$(() => {
    const appState = useContext(APP_STATE);
    const productSignal = useProductLoader();
    const currentImageSig = useSignal(productSignal.value?.assets[0]);
    const selectedVariantIdSignal = useSignal(productSignal.value?.variants[0]?.id);
    const selectedVariantSignal = useComputed$(() =>
        productSignal?.value?.variants.find((v) => v?.id === selectedVariantIdSignal.value)
    );
    const addItemToOrderErrorSignal = useSignal('');
    const quantitySignal = useComputed$<Record<string, number>>(() => {
        const result: Record<string, number> = {};
        (productSignal.value.variants || []).forEach((variant: Variant) => {
            const orderLine = (appState.activeOrder?.lines || []).find(
                (l: OrderLine) =>
                    l?.productVariant?.id === variant?.id &&
                    l?.productVariant?.product?.id === productSignal?.value?.id
            );
            result[variant?.id] = orderLine?.quantity || 0;
        });
        return result;
    });
    const isAddingToCart = useSignal(false);

    return (
        <div class="bg-primary-100">
            {selectedVariantSignal.value?.id && (
                <span class="hidden">{selectedVariantSignal.value?.id}</span>
            )}
            <div class="container mx-auto px-4 py-10">
                <div>
                    <h2 class="text-3xl sm:text-5xl font-light tracking-tight text-gray-900 my-8">
                        {productSignal.value.name}
                    </h2>
                    <Breadcrumbs
                        items={
                            productSignal.value.collections[productSignal.value.collections.length - 1]
                                ?.breadcrumbs ?? []
                        }
                    ></Breadcrumbs>
                    <div class="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start mt-4 md:mt-12">
                        <div class="w-full mx-auto sm:block lg:max-w-none">
                            <span class="rounded-md overflow-hidden">
                                <div class="w-full overflow-hidden">
                                    <img
                                        class="object-center object-cover rounded-lg mx-auto"
                                        width="800"
                                        height="800"
                                        src={currentImageSig.value.preview + '?w=400&h=400&format=webp'}
                                        alt={`Image of: ${currentImageSig.value.name}`}
                                    />
                                </div>
                                {productSignal.value?.assets.length > 1 && (
                                    <div class="w-full md:w-[400px] my-2 flex flex-wrap gap-3 justify-center">
                                        {productSignal.value?.assets.map((asset, key) => (
                                            <img
                                                key={key}
                                                class={{
                                                    'object-center object-cover rounded-lg': true,
                                                    'border-b-8 border-primary-600': currentImageSig.value?.id === asset?.id,
                                                }}
                                                width="80"
                                                height="80"
                                                src={asset.preview + '?w=400&h=400&format=webp'}
                                                alt={`Image of: ${asset.name}`}
                                                onClick$={() => {
                                                    currentImageSig.value = asset;
                                                }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </span>
                        </div>
                        <div class="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
                            <div class="">
                                <h3 class="sr-only">Description</h3>
                                <div
                                    class="text-base text-gray-700"
                                    dangerouslySetInnerHTML={productSignal.value.description}
                                />
                            </div>
                            {1 < productSignal?.value?.variants?.length && (
                                <div class="mt-4">
                                    <label class="block text-sm font-medium text-gray-700">Select option</label>
                                    <select
                                        class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                                        value={selectedVariantIdSignal.value}
                                        onChange$={(_, el) => {
                                            if (selectedVariantIdSignal) {
                                                selectedVariantIdSignal.value = el?.value;
                                            }
                                        }}
                                    >
                                        {productSignal.value.variants.map((variant) => (
                                            <option
                                                key={variant?.id}
                                                value={variant?.id}
                                                selected={selectedVariantIdSignal.value === variant?.id}
                                            >
                                                {variant.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}
                            <div class="mt-10 flex flex-col sm:flex-row sm:items-center">
                                <Price
                                    priceWithTax={selectedVariantSignal.value?.priceWithTax}
                                    currencyCode={selectedVariantSignal.value?.currencyCode}
                                    variantSig={selectedVariantSignal}
                                    forcedClass="text-3xl text-gray-900 mr-4"
                                ></Price>
                                <div class="flex sm:flex-col1 align-baseline">
                                    <button
                                        disabled={
                                        isAddingToCart.value ||
                                        selectedVariantSignal.value?.stockLevel === 'OUT_OF_STOCK'
                                        }
                                        class={{
                                        'max-w-xs flex-1 transition-colors border rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-primary-500 sm:w-full': true,

                                        'bg-gray-400 text-white border-gray-500 shadow-md cursor-not-allowed':
                                            selectedVariantSignal.value?.stockLevel === 'OUT_OF_STOCK',

                                        'bg-primary-600 hover:bg-primary-700':
                                            !isAddingToCart.value &&
                                            quantitySignal.value[selectedVariantIdSignal.value] === 0 &&
                                            selectedVariantSignal.value?.stockLevel !== 'OUT_OF_STOCK',

                                        'bg-green-600 active:bg-green-700 hover:bg-green-700':
                                            !isAddingToCart.value &&
                                            quantitySignal.value[selectedVariantIdSignal.value] >= 1 &&
                                            quantitySignal.value[selectedVariantIdSignal.value] <= 7 &&
                                            selectedVariantSignal.value?.stockLevel !== 'OUT_OF_STOCK',

                                        'bg-gray-600 cursor-not-allowed':
                                            !isAddingToCart.value &&
                                            quantitySignal.value[selectedVariantIdSignal.value] > 7,
                                        }}
                                        onClick$={async () => {
                                        if (
                                            selectedVariantSignal.value?.stockLevel !== 'OUT_OF_STOCK' &&
                                            quantitySignal.value[selectedVariantIdSignal.value] <= 7
                                        ) {
                                            isAddingToCart.value = true;
                                            const addItemToOrder = await addItemToOrderMutation(
                                            selectedVariantIdSignal.value,
                                            1
                                            );
                                            isAddingToCart.value = false;
                                            if (addItemToOrder.__typename !== 'Order') {
                                            addItemToOrderErrorSignal.value = addItemToOrder.errorCode;
                                            } else {
                                            appState.activeOrder = addItemToOrder as Order;
                                            }
                                        }
                                        }}
                                    >
                                        {selectedVariantSignal.value?.stockLevel === 'OUT_OF_STOCK' ? (
                                        <span>Sold Out</span>
                                        ) : quantitySignal.value[selectedVariantIdSignal.value] ? (
                                        <span class="flex items-center">
                                            <CheckIcon />
                                            {$localize`${quantitySignal.value[selectedVariantIdSignal.value]} in cart`}
                                        </span>
                                        ) : (
                                        $localize`Add to cart`
                                        )}
                                    </button>
                                    </div>
                            </div>
                            <div class="mt-2 flex items-center space-x-2">
                                <span class="text-gray-500">{selectedVariantSignal.value?.sku}</span>
                                <StockLevelLabel stockLevel={selectedVariantSignal.value?.stockLevel} />
                            </div>
                            {!!addItemToOrderErrorSignal.value && (
                                <div class="mt-4">
                                    <Alert message={addItemToOrderErrorSignal.value} />
                                </div>
                            )}

                            <section class="mt-12 pt-12 border-t text-xs">
                                <h3 class="text-gray-600 font-bold mb-2">{$localize`Shipping & Returns`}</h3>
                                <div class="text-gray-500 space-y-1">
                                    <p>
                                        {$localize`Standard shipping: 3 - 5 working days. Express shipping: 1 - 3 working days.`}
                                    </p>
                                    <p>
                                        {$localize`Shipping costs depend on delivery address and will be calculated during checkout.`}
                                    </p>
                                    <p>
                                        {$localize`Returns are subject to terms. Please see the`}{' '}
                                        <span class="underline">{$localize`returns page`}</span>{' '}
                                        {$localize`for further information`}.
                                    </p>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export const head: DocumentHead = ({ resolveValue, url }) => {
    const product = resolveValue(useProductLoader);
    return generateDocumentHead(
        url.href,
        product.name,
        product.description,
        product.featuredAsset?.preview
    );
};
