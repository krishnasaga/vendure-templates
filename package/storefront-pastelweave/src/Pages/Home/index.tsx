import Layout from '../../Layout';
import HeroSlider from 'react-cart/src/components/HeroSlider-VariantA';
import ProductCarousel from 'react-cart/src/components/ProductCarousel-VariantA';
import ProductCard from 'react-cart/src/components/ProductCard-VariantA';
import { TopStrip } from 'react-cart/src/components/PromotionStript-VariantA';


const products = [
  {
    title: 'Okhai "Pineapple Punch"',
    image: '/pineapple.jpg',
    price: 30.03,
    rating: 3,
  },
  {
    title: 'Okhai "Verdine"',
    image: '/verdine.jpg',
    price: 25.74,
    rating: 5,
  },
  {
    title: 'Okhai "Graceful"',
    image: '/graceful.jpg',
    price: 11.58,
    rating: 5,
  },
  {
    title: 'Okhai "Lush Canopy"',
    image: '/lush.jpg',
    price: 38.62,
    rating: 5,
  },
    {
    title: 'Okhai "Lush Canopy"',
    image: '/lush.jpg',
    price: 38.62,
    rating: 5,
  },
    {
    title: 'Okhai "Lush Canopy"',
    image: '/lush.jpg',
    price: 38.62,
    rating: 5,
  },
    {
    title: 'Okhai "Lush Canopy"',
    image: '/lush.jpg',
    price: 38.62,
    rating: 5,
  },
];

const ProductCardWrapper = ({ product }: { product: any }) => (
    <ProductCard
        title={product.title}
        subtitle={product.subtitle}
        price={product.price}
        imageUrl={product.image || product.imageUrl}
        rating={product.rating}
    />
);

export const HomePage = () => {
    return (
        <>
            <TopStrip />
            <Layout>
                <main className='w-full text-green-900 pt-[50px]'>
                <HeroSlider className={"h-[calc(100vh-218px)]"} />
                <ProductCarousel products={products} CardComponent={ProductCardWrapper} />
                <ProductCarousel products={products} CardComponent={ProductCardWrapper} />
                </main>
            </Layout>
        </>
    );
}

export default HomePage;
