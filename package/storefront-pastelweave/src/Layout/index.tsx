import{ type ReactElement } from 'react';
import Header from 'react-cart/src/components/Header-VariantA';
import Footer from 'react-cart/src/components/Footer-VariantA';

const Layout = ({children} : {children: ReactElement}) => {
  return <div className="w-full min-h-[100vh] bg-pastelweave-900">
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
