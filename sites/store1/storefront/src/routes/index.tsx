import { component$ } from '@qwik.dev/core';
import Cat1 from '~/components/category1';
import NewPro from '~/components/NewProduct';
import Cat2 from '~/components/category2';
import HeroBanner1 from '~/components/herobanner1';

export default component$(() => {
    return (
        <div>
            <HeroBanner1/>
            <Cat1/>
            <NewPro/>
            <Cat2/>
        </div>
    );
});

export const prerender = true;
