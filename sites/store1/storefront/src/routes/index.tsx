import { component$, useContext } from '@qwik.dev/core';
import { Image } from 'qwik-image';
import CollectionCard from '~/components/collection-card/CollectionCard';
import { APP_STATE, HOMEPAGE_IMAGE } from '~/constants';
import Cat1 from '~/components/category1';
import NewPro from '~/components/NewProduct';
import Cat2 from '~/components/category2';
import HeroBanner1 from '~/components/herobanner1';

export default component$(() => {
    const collections = useContext(APP_STATE).collections;
    return (
        <div>
            <HeroBanner1/>
            <Cat1/>
            <NewPro/>
            <Cat2/>

        </div>
    );
});