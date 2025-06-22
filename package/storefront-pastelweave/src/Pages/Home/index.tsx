import Layout from '../../Layout';
import HeroSlider from 'react-cart/src/components/HeroSlider-VariantA';
import ProductCarousel from 'react-cart/src/components/ProductCarousel-VariantA';

export const HomePage = () => {
    return (
        <Layout>
            <main className='w-full bg-red-200 text-green-900 container mx-auto'>
                <HeroSlider />
                <ProductCarousel />
                <ProductCarousel />
            </main>
        </Layout>
    );
}

export default HomePage;
