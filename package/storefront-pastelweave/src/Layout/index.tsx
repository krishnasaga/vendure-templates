import{ type ReactElement } from 'react';
import Header from 'react-cart/src/components/Header-VariantA';
import Footer from 'react-cart/src/components/Footer-VariantA';
import PromotionBanner from 'react-cart/src/components/TopPromotionBanner';

const Layout = ({children} : {children: ReactElement}) => {
  return <div className="w-full min-h-[100vh] bg-pastelweave-900">
   <PromotionBanner />
   <div className='container mx-auto'>
    <Header/>
    </div>
      <div className="w-full">
         {children}
      </div>
       <div className='container mx-auto'>
      <Footer/>
       </div>
   </div>
};

export default Layout;
