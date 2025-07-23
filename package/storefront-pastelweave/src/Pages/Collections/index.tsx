import { useState, useRef, useLayoutEffect } from 'react';
import Layout from '../../Layout';
import SideFilters from '../../SideFilter';
import ProductPageCard from '../../ProductPageCard';
// import SortDropdown from '../../SortDropdown';

const products = [
  {
    images: [
      'https://d2gansr34f2te0.cloudfront.net/sarees/saree1.png',
      'https://d2gansr34f2te0.cloudfront.net/sarees/saree2.png',
      'https://d2gansr34f2te0.cloudfront.net/sarees/saree3.png',
      'https://d2gansr34f2te0.cloudfront.net/sarees/saree4.png',
    ],
    discount: '10% off',
    tag: 'Batik',
    title: 'GC ‘Ocean’ Handwoven Hand Batik Pure',
    price: 7605,
    mrp: 8450,
  },
  {
    images: [
      'https://d2gansr34f2te0.cloudfront.net/sarees/saree1.png',
      'https://d2gansr34f2te0.cloudfront.net/sarees/saree2.png',
      'https://d2gansr34f2te0.cloudfront.net/sarees/saree3.png',
      'https://d2gansr34f2te0.cloudfront.net/sarees/saree4.png',
    ],
    discount: '10% off',
    tag: 'Block Painting',
    title: 'GC ‘Ocean’ Handwoven Hand Batik ',
    price: 7605,
    mrp: 8450,
  },
    {
    images: [
      'https://d2gansr34f2te0.cloudfront.net/sarees/saree1.png',
      'https://d2gansr34f2te0.cloudfront.net/sarees/saree2.png',
      'https://d2gansr34f2te0.cloudfront.net/sarees/saree3.png',
      'https://d2gansr34f2te0.cloudfront.net/sarees/saree4.png',
    ],
    discount: '10% off',
    tag: 'Batik',
    title: 'GC ‘Ocean’ Handwoven Hand Batik ',
    price: 7605,
    mrp: 8450,
  },
    {
    images: [
      'https://d2gansr34f2te0.cloudfront.net/sarees/saree1.png',
      'https://d2gansr34f2te0.cloudfront.net/sarees/saree2.png',
      'https://d2gansr34f2te0.cloudfront.net/sarees/saree3.png',
      'https://d2gansr34f2te0.cloudfront.net/sarees/saree4.png',
    ],
    discount: '10% off',
    tag: 'Batik',
    title: 'GC ‘Ocean’ Handwoven Hand Batik P..',
    price: 7605,
    mrp: 8450,
  },
    {
    images: [
      'https://d2gansr34f2te0.cloudfront.net/sarees/saree1.png',
      'https://d2gansr34f2te0.cloudfront.net/sarees/saree2.png',
      'https://d2gansr34f2te0.cloudfront.net/sarees/saree3.png',
      'https://d2gansr34f2te0.cloudfront.net/sarees/saree4.png',
    ],
    discount: '10% off',
    tag: 'Batik',
    title: 'GC ‘Ocean’ Handwoven Hand Batik',
    price: 7605,
    mrp: 8450,
  },
    {
    images: [
      'https://d2gansr34f2te0.cloudfront.net/sarees/saree1.png',
      'https://d2gansr34f2te0.cloudfront.net/sarees/saree2.png',
      'https://d2gansr34f2te0.cloudfront.net/sarees/saree3.png',
      'https://d2gansr34f2te0.cloudfront.net/sarees/saree4.png',
    ],
    discount: '10% off',
    tag: 'Batik',
    title: 'GC ‘Ocean’ Handwoven Hand Batik ',
    price: 7605,
    mrp: 8450,
  },
  // Repeat data for demo...
];

export const CollectionsPage = () => {
  // const [setSortOption] = useState('Sort');
  const rightContentRef = useRef<HTMLDivElement>(null);
  const [rightHeight, setRightHeight] = useState<number | undefined>();

  useLayoutEffect(() => {
    if (rightContentRef.current) {
      setRightHeight(rightContentRef.current.offsetHeight);
    }
  }, [products.length]);

  return (
    <Layout>
      <div className="pt-[30px] flex px-4">
        <div className="w-[300px] shrink-0">
          <div
            className="sticky top-[100px] overflow-y-auto"
            style={{
              maxHeight: rightHeight ? `${rightHeight}px` : 'auto',
            }}
          >
            <SideFilters />
          </div>
        </div>

        <div ref={rightContentRef} className="flex-1 px-4 lg:px-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="text-sm font-medium text-secondary-900">
              {products.length} Products
            </div>

            {/* <SortDropdown onSortChange={(value) => setSortOption(value)} /> */}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {products.map((product, idx) => (
              <ProductPageCard key={idx} {...product} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CollectionsPage;
