import Layout from '../../Layout';
import HeroSlider from 'react-cart/src/components/HeroSlider-VariantA';
import CategorySection from '../../CategoryCard1';
// import ProductCarousel from 'react-cart/src/components/ProductCarousel-VariantA';
// import ProductCard from 'react-cart/src/components/ProductCard-VariantA';
import USPs from 'react-cart/src/components/USPs-VariantA';
import CategoryCard2 from '../../CategoryCard2';
import CategoryCard3 from '../../CategoryCard3';
import ProductCard1 from '../../ProductCard1';
import ProductCard2 from '../../ProductCard2';
import ProductCard3 from '../../ProductCard3';
import CategorySets1 from '../../CategorySets1';
import CategoryInsta from '../../CategoryInsta';


export const HomePage = () => {
  return (
    <Layout>
      <main className="w-full">
        <HeroSlider className="h-[calc(100vh-180px)]" />
        <USPs className="mt-10"/>
        <CategorySection />
        <CategoryCard2 />
        <ProductCard1 />
        <CategorySets1 />
        <ProductCard2 />
        <ProductCard3 />
        <CategoryCard3 />
        <ProductCard2 />
        <ProductCard3 />
        <CategoryInsta />
      </main>
    </Layout>
  );
};

export default HomePage;
