import { component$, useContext } from '@qwik.dev/core';
import { Image } from 'qwik-image';
import CollectionCard from '~/components/collection-card/CollectionCard';
import { APP_STATE, HOMEPAGE_IMAGE } from '~/constants';

export default component$(() => {
    const collections = useContext(APP_STATE).collections;
    return (
        <div>
            {/* Removed the background image and overlay divs */}
            <div class="relative h-[600px]">
                {/* This div previously contained the background image and its overlays */}
                {/* It's kept here for structural integrity but its content is removed */}
                {/* If you want to remove this div entirely and reduce the height,
                    you'll need to adjust the layout accordingly. */}
            </div>

            {/* Removed the entire 'Shop by Category' section */}
            {/* This section (originally `section class="pt-12..."`) and its children are gone */}
        </div>
    );
});