import { type ReactElement } from 'react';
import Header from 'react-cart/src/components/Header-VariantA';
import Footer from 'react-cart/src/components/Footer-VariantA';
import { TopStrip } from 'react-cart/src/components/PromotionStript-VariantA';

const Layout = ({ children }: { children: ReactElement }) => {
  return (
    <div className="w-full min-h-[100vh] bg-pastelweave-900">
      <div className="sticky top-0 z-[60] bg-white">
        <TopStrip />
        <div className="container mx-auto">
          <Header />
        </div>
        <hr className="border-t border-gray-200 my-4" />
      </div>

      <div className="w-full">{children}</div>

      <div className="mx-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
