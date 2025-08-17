/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import Layout from "../../Layout";
import SideFilters from "../../SideFilter";
import ProductPageCard from "../../ProductPageCard";
import { useParams } from "react-router-dom";
import {
  type SearchResult,
  type Product,
  LanguageCode,
  type Asset,
} from "../../generated/graphql";

const GET_PRODUCTS = gql`
  query GetCollectionProducts($slug: String!, $skip: Int, $take: Int) {
    search(
      input: {
        collectionSlug: $slug
        groupByProduct: true
        skip: $skip
        take: $take
      }
    ) {
      totalItems
      items {
        productName
        slug
        productAsset {
          id
          preview
        }
        priceWithTax {
          ... on SinglePrice {
            value
          }
          ... on PriceRange {
            min
            max
          }
        }
      }
    }
  }
`;

const getCardHeight = (width: number) => {
  if (width < 640) return 300;
  if (width < 900) return 380;
  return 420;
};

export const CollectionsPage = () => {
  const { slug } = useParams();

  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: {
      slug: slug,
      skip: 0,
      take: 10,
    },
  });

  const rightContentRef = useRef<HTMLDivElement>(null);
  const [rightHeight, setRightHeight] = useState<number | undefined>();
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const products: SearchResult[] = data?.search?.items;

  useLayoutEffect(() => {
    if (rightContentRef.current) {
      setRightHeight(rightContentRef.current.offsetHeight);
    }
  }, [products?.length]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cardHeight = getCardHeight(windowWidth);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading products...</div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-600">
            Error loading products: {error.message}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <>
      <Layout>
        <div>
          <div className="pt-[30px] flex px-4">
            <div className="hidden md:block md:w-[200px] lg:w-[300px] shrink-0">
              <div
                className="sticky top-[100px] overflow-y-auto"
                style={{
                  maxHeight: rightHeight ? `${rightHeight}px` : "auto",
                }}
              >
                <SideFilters />
              </div>
            </div>

            <div ref={rightContentRef} className="flex-1 px-4 lg:px-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div className="text-sm font-medium text-secondary-900">
                  {products?.length} Products
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {products.map((product, idx: number) => {
                  // Inline mapping to match the generated Product type
                  const mappedProduct: Product = {
                    id:
                      (product as any).productId ||
                      (product as any).id ||
                      idx.toString(),
                    name: product.productName,
                    slug: product.slug,
                    assets: [product.productAsset as Asset],
                    collections: [],
                    createdAt: "",
                    customFields: {},
                    description: "",
                    enabled: true,
                    facetValues: [],
                    featuredAsset: product.productAsset as Asset,
                    languageCode: LanguageCode.EnGb,
                    optionGroups: [],
                    translations: [],
                    updatedAt: "",
                    variants: [{
                      id: (product as any).variantId || idx.toString(),
                      priceWithTax: product?.priceWithTax,
                    }],
                    variantList: { items: [], totalItems: 0 },
                  };

                  return (
                    <ProductPageCard
                      key={product.productId || idx}
                      height={cardHeight}
                      product={mappedProduct}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          <div className="fixed bottom-0 left-0 w-full bg-white flex justify-around border-t shadow-md p-3 md:hidden z-50">
            <button
              onClick={() => setShowFilter(true)}
              className="w-1/2 text-center text-sm font-medium text-secondary-900"
            >
              Filters
            </button>
            <button
              onClick={() => setShowSort(true)}
              className="w-1/2 text-center text-sm font-medium text-secondary-900"
            >
              Sort
            </button>
          </div>
        </div>
      </Layout>

      {showFilter && (
        <div className="fixed inset-0 z-[100] flex md:hidden pointer-events-none">
          <div
            className="absolute inset-0 pointer-events-auto"
            onClick={() => setShowFilter(false)}
            style={{ cursor: "pointer" }}
          />
          <div className="bg-white w-[80vw] h-full shadow-lg relative flex flex-col pointer-events-auto z-10">
            <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button
                onClick={() => setShowFilter(false)}
                className="text-2xl absolute right-4 top-4"
              >
                &times;
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <SideFilters />
            </div>
            <div className="p-4 sticky bottom-0 bg-white z-10">
              <button
                onClick={() => setShowFilter(false)}
                className="w-full bg-yellow-400 py-3 font-medium text-white"
              >
                View Items
              </button>
            </div>
          </div>
        </div>
      )}

      {showSort && (
        <div className="fixed inset-0 z-[100] flex items-end md:hidden pointer-events-none">
          <div
            className="absolute inset-0 pointer-events-auto"
            onClick={() => setShowSort(false)}
            style={{ cursor: "pointer" }}
          />
          <div className="bg-white w-full h-[50vh] rounded-t-2xl shadow-lg relative pointer-events-auto flex flex-col z-10">
            <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
              <button
                onClick={() => setShowSort(false)}
                className="text-2xl absolute left-4 top-4"
              >
                &times;
              </button>
              <h2 className="text-lg font-semibold w-full text-center">Sort</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-4 flex flex-col items-center justify-center space-y-4 text-secondary-900 text-md">
              {[
                "Featured",
                "New Arrivals",
                "Price: Low To High",
                "Price: High To Low",
                "Discount: High To Low",
                "Rating",
              ].map((item) => (
                <div key={item} className="w-full text-center">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CollectionsPage;
