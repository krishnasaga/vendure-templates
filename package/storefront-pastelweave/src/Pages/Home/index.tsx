import Layout from '../../Layout';
import HeroSlider from 'react-cart/src/components/HeroSlider-VariantA';
import ProductCarousel from 'react-cart/src/components/ProductCarousel-VariantA';
import ProductCard from 'react-cart/src/components/ProductCard-VariantA';
import USPs from 'react-cart/src/components/USPs-VariantA';

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProductCardWrapper = ({ product }: { product: any }) => (
    <ProductCard
        title={product.title}
        subtitle={product.subtitle}
        price={product.price}
        rating={product.rating}
        imageUrl={product.image || ''}
    />
);

export const HomePage = () => {
  return (
    <Layout>
      <main className="w-full text-green-900">
        <HeroSlider className="h-[calc(100vh-180px)]" />
        <USPs className="mt-10"/>
        <ProductCarousel products={products} CardComponent={ProductCardWrapper} />
        <ProductCarousel products={products} CardComponent={ProductCardWrapper} />
      </main>
    </Layout>
  );
};

export default HomePage;
