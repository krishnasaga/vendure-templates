// vendure-react-sdk.ts
// Simple Vendure React SDK stub for API interaction and hooks

import { useState, useEffect } from 'react';

export interface VendureProduct {
  id: string;
  name: string;
  description?: string;
  price?: number;
  imageUrl?: string;
}

export interface VendureSDKConfig {
  apiUrl: string;
  token?: string;
}

let config: VendureSDKConfig = { apiUrl: '' };

export function configureVendureSDK(cfg: VendureSDKConfig) {
  config = { ...cfg };
}

// --- GraphQL Client ---
async function vendureGraphQL<T = any>(query: string, variables?: Record<string, any>) {
  const res = await fetch(`${config.apiUrl}/shop-api`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(config.token ? { Authorization: `Bearer ${config.token}` } : {}),
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors) throw new Error(json.errors[0].message);
  return json.data as T;
}

// --- Products ---
export function useVendureProducts() {
  const [products, setProducts] = useState<VendureProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    vendureGraphQL(`
      query GetProducts($options: ProductListOptions) {
        products(options: $options) {
          items { id name description }
        }
      }
    `, { options: { take: 20 } })
      .then(data => {
        setProducts(data.products.items || []);
        setLoading(false);
      })
      .catch(e => {
        setError(e.message);
        setLoading(false);
      });
  }, [config.apiUrl]);

  return { products, loading, error };
}

// --- Collections ---
export function useVendureCollections() {
  const [collections, setCollections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    vendureGraphQL(`
      query GetCollections {
        collections {
          items { id name description slug }
        }
      }
    `)
      .then(data => {
        setCollections(data.collections.items || []);
        setLoading(false);
      })
      .catch(e => {
        setError(e.message);
        setLoading(false);
      });
  }, [config.apiUrl]);

  return { collections, loading, error };
}

// --- Cart ---
export function useVendureCart() {
  const [cart, setCart] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch active order
  useEffect(() => {
    setLoading(true);
    vendureGraphQL(`
      query GetActiveOrder {
        activeOrder {
          id code state totalWithTax currencyCode lines {
            id quantity productVariant { id name }
          }
        }
      }
    `)
      .then(data => {
        setCart(data.activeOrder);
        setLoading(false);
      })
      .catch(e => {
        setError(e.message);
        setLoading(false);
      });
  }, [config.apiUrl, config.token]);

  // Add item to cart
  const addItem = async (productVariantId: string, quantity: number = 1) => {
    setLoading(true);
    setError(null);
    try {
      const data = await vendureGraphQL(`
        mutation AddItem($productVariantId: ID!, $quantity: Int!) {
          addItemToOrder(productVariantId: $productVariantId, quantity: $quantity) {
            ... on Order {
              id code state totalWithTax currencyCode lines {
                id quantity productVariant { id name }
              }
            }
            ... on ErrorResult {
              errorCode message
            }
          }
        }
      `, { productVariantId, quantity });
      setCart(data.addItemToOrder);
      setLoading(false);
      return data.addItemToOrder;
    } catch (e: any) {
      setError(e.message);
      setLoading(false);
      throw e;
    }
  };

  // Remove item from cart
  const removeItem = async (orderLineId: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await vendureGraphQL(`
        mutation RemoveOrderLine($orderLineId: ID!) {
          removeOrderLine(orderLineId: $orderLineId) {
            ... on Order {
              id code state totalWithTax currencyCode lines {
                id quantity productVariant { id name }
              }
            }
            ... on ErrorResult {
              errorCode message
            }
          }
        }
      `, { orderLineId });
      setCart(data.removeOrderLine);
      setLoading(false);
      return data.removeOrderLine;
    } catch (e: any) {
      setError(e.message);
      setLoading(false);
      throw e;
    }
  };

  // Adjust order line
  const adjustOrderLine = async (orderLineId: string, quantity: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await vendureGraphQL(`
        mutation AdjustOrderLine($orderLineId: ID!, $quantity: Int!) {
          adjustOrderLine(orderLineId: $orderLineId, quantity: $quantity) {
            ... on Order {
              id code state totalWithTax currencyCode lines {
                id quantity productVariant { id name }
              }
            }
            ... on ErrorResult {
              errorCode message
            }
          }
        }
      `, { orderLineId, quantity });
      setCart(data.adjustOrderLine);
      setLoading(false);
      return data.adjustOrderLine;
    } catch (e: any) {
      setError(e.message);
      setLoading(false);
      throw e;
    }
  };

  return { cart, loading, error, addItem, removeItem, adjustOrderLine };
}

// Add more hooks and utilities as needed
