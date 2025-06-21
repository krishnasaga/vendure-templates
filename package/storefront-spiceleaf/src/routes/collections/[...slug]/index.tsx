import { $, component$, useStore, useTask$, useSignal } from '@qwik.dev/core';
import { DocumentHead, routeLoader$, useLocation } from '@qwik.dev/router';
import Breadcrumbs from '~/components/breadcrumbs/Breadcrumbs';
import CollectionCard from '~/components/collection-card/CollectionCard';
import Filters from '~/components/facet-filter-controls/Filters';
import FiltersButton from '~/components/filters-button/FiltersButton';
import ProductCard from '~/components/products/ProductCard';
import { SearchResponse } from '~/generated/graphql';
import { getCollectionBySlug } from '~/providers/shop/collections/collections';
import {
	searchQueryWithCollectionSlug,
	searchQueryWithTerm,
	getProductBySlug,
} from '~/providers/shop/products/products';
import { FacetWithValues } from '~/types';
import {
	changeUrlParamsWithoutRefresh,
	cleanUpParams,
	enableDisableFacetValues,
	generateDocumentHead,
	groupFacetValues,
} from '~/utils';
import { type StaticGenerateHandler } from '@builder.io/qwik-city';
import { gql } from 'graphql-tag';

const query = gql`
	query GetCollections {
		collections {
			items {
				id
				name
				slug
			}
		}
	}
`;

type CollectionItem = {
	id: string;
	name: string;
	slug: string;
};

type CollectionsResponse = {
	data: {
		collections: {
			items: CollectionItem[];
		};
	};
};

const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 80000); // 80 seconds

async function getCollections() {
	const response = await fetch('https://indiastore1.duckdns.org/shop-api', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ query: query.loc?.source.body }),
		signal: controller.signal,
	});

	clearTimeout(timeout);

	const result = (await response.json()) as CollectionsResponse;
	return result.data.collections.items;
}

export const onStaticGenerate: StaticGenerateHandler = async () => {
	const collections = await getCollections();
	return {
		params: collections
			?.filter(({ slug }) => {
				return !!slug;
			})
			.map(({ id, slug, name }) => {
				return { id, slug, name };
			}),
	};
};

export const useCollectionLoader = routeLoader$(async ({ params }) => {
	return await getCollectionBySlug(params.slug);
});

export const useSearchLoader = routeLoader$(async ({ params: p, url }) => {
	const params = cleanUpParams(p);
	const activeFacetValueIds: string[] = url.searchParams.get('f')?.split('-') || [];
	return activeFacetValueIds.length
		? await searchQueryWithTerm(params.slug, '', activeFacetValueIds)
		: await searchQueryWithCollectionSlug(params.slug);
});

export default component$(() => {
	const { params: p, url } = useLocation();
	const params = cleanUpParams(p);
	const activeFacetValueIds: string[] = url.searchParams.get('f')?.split('-') || [];

	const collectionSignal = useCollectionLoader();
	const searchSignal = useSearchLoader();

	const state = useStore<{
		showMenu: boolean;
		search: SearchResponse;
		facedValues: FacetWithValues[];
		facetValueIds: string[];
	}>(
		{
			showMenu: false,
			search: searchSignal.value as SearchResponse,
			facedValues: groupFacetValues(searchSignal.value as SearchResponse, activeFacetValueIds),
			facetValueIds: activeFacetValueIds,
		},
	);

	const detailedProducts = useSignal<any[]>([]);

	useTask$(async ({ track }) => {
		track(() => collectionSignal.value.slug);
		params.slug = cleanUpParams(p).slug;
		state.facetValueIds = url.searchParams.get('f')?.split('-') || [];
		state.search = state.facetValueIds.length
			? await searchQueryWithTerm(params.slug, '', state.facetValueIds)
			: await searchQueryWithCollectionSlug(params.slug);
		state.facedValues = groupFacetValues(state.search as SearchResponse, state.facetValueIds);

		// fetch detailed product data
		const results = await Promise.all(
			state.search.items.map((item) => getProductBySlug(item.slug))
		);
		detailedProducts.value = results;
	});

	const onFilterChange = $(async (id: string) => {
		const { facedValues, facetValueIds } = enableDisableFacetValues(
			state.facedValues,
			state.facetValueIds.includes(id)
				? state.facetValueIds.filter((f) => f !== id)
				: [...state.facetValueIds, id]
		);
		state.facedValues = facedValues;
		state.facetValueIds = facetValueIds;
		changeUrlParamsWithoutRefresh('', facetValueIds);

		state.search = facetValueIds.length
			? await searchQueryWithTerm(params.slug, '', state.facetValueIds)
			: await searchQueryWithCollectionSlug(params.slug);

		const results = await Promise.all(
			state.search.items.map((item) => getProductBySlug(item.slug))
		);
		detailedProducts.value = results;
	});

	const onOpenCloseFilter = $((id: string) => {
		state.facedValues = state.facedValues.map((f) => {
			if (f.id === id) {
				f.open = !f.open;
			}
			return f;
		});
	});

	return (
		<div class={"w-full bg-primary-100"}>
			<div
				class="container mx-auto px-4 py-10"
				onKeyDown$={(event: KeyboardEvent) => {
					if (event.key === 'Escape') {
						state.showMenu = false;
					}
				}}
			>
				<div class="flex justify-between items-center">
					<h2 class="text-3xl sm:text-5xl font-light tracking-tight text-gray-900 my-8">
						{collectionSignal.value.name}
					</h2>
					<div>
						{!!state.facedValues.length && (
							<FiltersButton
								onToggleMenu$={async () => {
									state.showMenu = !state.showMenu;
								}}
							/>
						)}
					</div>
				</div>
				<div>
					<Breadcrumbs items={collectionSignal.value.breadcrumbs || []}></Breadcrumbs>
					{!!collectionSignal.value.children?.length && (
						<div class="max-w-2xl mx-auto py-16 sm:py-16 lg:max-w-none border-b mb-16">
							<h2 class="text-2xl font-light text-gray-900">Collections</h2>
							<div class="mt-6 grid max-w-xs sm:max-w-none mx-auto sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
								{collectionSignal.value.children.map((child) => (
									<CollectionCard key={child.id} collection={child}></CollectionCard>
								))}
							</div>
						</div>
					)}
				</div>
				<div class="mt-6 grid sm:grid-cols-5 gap-x-4">
					{!!state.facedValues.length && (
						<Filters
							showMenu={state.showMenu}
							facetsWithValues={state.facedValues}
							onToggleMenu$={async () => {
								state.showMenu = !state.showMenu;
							}}
							onFilterChange$={onFilterChange}
							onOpenCloseFilter$={onOpenCloseFilter}
						/>
					)}
				<div class="sm:col-span-5 lg:col-span-4">
  <div class="grid grid-cols-1 gap-y-10 gap-x-2 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-2">
    {detailedProducts.value.map((item) => {
      return (
        <ProductCard
          key={item.id}
          productAsset={item.featuredAsset?.preview}
          productName={item.name}
          slug={item.slug}
          priceWithTax={item.variants?.[0]?.priceWithTax}
          CurrencyCode={item.variants?.[0]?.currencyCode}
          varients={item.variants}
        />
      );
    })}
  </div>
</div>
				</div>
			</div>
		</div>
	);
});

export const head: DocumentHead = ({ resolveValue, url }) => {
	const collection = resolveValue(useCollectionLoader);
	let image = collection.children?.[0]?.featuredAsset?.preview || undefined;
	if (!image) {
		const search = resolveValue(useSearchLoader);
		image = search.items?.[0]?.productAsset?.preview || undefined;
	}
	return generateDocumentHead(url.href, collection.name, undefined, image);
};
