/* eslint-disable qwik/use-method-usage */
import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@qwik.dev/router';
import Category from '~/components/category1';
import ProductCollectionSlider from '~/components/NewProduct';
import { Collection } from '~/types';
import { HeroCarousel } from '~/components/HeroSlider1';

export const useCollectionsLoader = routeLoader$(async () => {
	const slugs = ['spices-and-masalas', 'diary-products'];
	const res = await fetch(
		`${process.env.VENDURE_API_URL || 'https://indiastore1.duckdns.org'}/shop-api`,
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				query: `
query GetCollectionsBySlugs($slugs: [String!]) {
  collections(options: { filter: { slug: { in: $slugs } } }) {
    items {
      id
      name
      slug
      productVariants {
        items {
          id
          name
          priceWithTax
          sku
          product {
           id,
           slug,
           name,
           featuredAsset {
              id
              preview
              source,
              fileSize,
              mimeType,
              width,
              height,
              focalPoint {
                x,
                y
              }
            }
          }
        }

      }
    }
  }
}
				`,
				variables: { slugs },
			}),
		}
	);
	const data = await res.json();

	return data;
});

export default component$(() => {
	const data = useCollectionsLoader();
	const collections = data?.value?.data?.collections.items;
	return (
		<div>
			<HeroCarousel />
			<Category />
			{collections?.map((collection: Collection) => (
				<ProductCollectionSlider key={collection.id} collection={collection} />
			))}
		</div>
	);
});
