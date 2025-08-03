import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import Layout from '../../Layout';
import SideFilters from '../../SideFilter';
import ProductPageCard from '../../ProductPageCard';

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
];

const getCardHeight = (width: number) => {
  if (width < 640) return 300;
  if (width < 900) return 380;
  return 420;
};

export const CollectionsPage = () => {
  const rightContentRef = useRef<HTMLDivElement>(null);
  const [rightHeight, setRightHeight] = useState<number | undefined>();
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useLayoutEffect(() => {
    if (rightContentRef.current) {
      setRightHeight(rightContentRef.current.offsetHeight);
    }
  }, [products.length]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cardHeight = getCardHeight(windowWidth);

  return (
    <>
      <Layout>
        <div>
          {/* Main Grid */}
          <div className="pt-[30px] flex px-4">
            {/* Left Filter Panel */}
            <div className="hidden md:block md:w-[200px] lg:w-[300px] shrink-0">
              <div
                className="sticky top-[100px] overflow-y-auto"
                style={{
                  maxHeight: rightHeight ? `${rightHeight}px` : 'auto',
                }}
              >
                <SideFilters />
              </div>
            </div>

            {/* Right Product Grid */}
            <div ref={rightContentRef} className="flex-1 px-4 lg:px-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div className="text-sm font-medium text-secondary-900">
                  {products.length} Products
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {products.map((product, idx) => (
                  <ProductPageCard key={idx} {...product} height={cardHeight} />
                ))}
              </div>
            </div>
          </div>

          {/* Sticky Bottom Filter & Sort (Mobile) */}
          <div className="fixed bottom-0 left-0 w-full bg-white flex justify-around border-t shadow-md p-3 md:hidden z-50">
            <button
              onClick={() => setShowFilter(true)}
              className="w-1/2 text-center text-sm font-medium text-secondary-900"
            >
              Filters
            </button>
            <button
              onClick={() => setShowSort(true)}
              className="w-1/2 text-center text-sm font-medium text-secondary-900"
            >
              Sort
            </button>
          </div>
        </div>
      </Layout>

      {/* Filter Popup - OUTSIDE Layout */}
      {showFilter && (
        <div className="fixed inset-0 z-[100] flex md:hidden pointer-events-none">
          {/* Transparent background, no blur */}
          <div
            className="absolute inset-0 pointer-events-auto"
            onClick={() => setShowFilter(false)}
            style={{ cursor: "pointer" }}
          />
          {/* Left panel */}
          <div className="bg-white w-[80vw] h-full shadow-lg relative flex flex-col pointer-events-auto z-10">
            {/* Fixed header */}
            <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button onClick={() => setShowFilter(false)} className="text-2xl absolute right-4 top-4">
                &times;
              </button>
            </div>
            {/* Scrollable filter content */}
            <div className="flex-1 overflow-y-auto p-4">
              <SideFilters />
            </div>
            {/* Fixed footer */}
            <div className="p-4 sticky bottom-0 bg-white z-10">
              <button onClick={() => setShowFilter(false)} className="w-full bg-yellow-400 py-3 font-medium text-white">
                View Items
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sort Popup - OUTSIDE Layout */}
      {showSort && (
        <div className="fixed inset-0 z-[100] flex items-end md:hidden pointer-events-none">
          {/* Transparent background, no blur */}
          <div
            className="absolute inset-0 pointer-events-auto"
            onClick={() => setShowSort(false)}
            style={{ cursor: "pointer" }}
          />
          {/* Bottom panel */}
          <div className="bg-white w-full h-[50vh] rounded-t-2xl shadow-lg relative pointer-events-auto flex flex-col z-10">
            {/* Fixed header */}
            <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
              <button onClick={() => setShowSort(false)} className="text-2xl absolute left-4 top-4">
                &times;
              </button>
              <h2 className="text-lg font-semibold w-full text-center">Sort</h2>
            </div>
            {/* Scrollable sort options */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col items-center justify-center space-y-4 text-secondary-900 text-md">
              {[
                'Featured',
                'New Arrivals',
                'Price: Low To High',
                'Price: High To Low',
                'Discount: High To Low',
                'Rating',
              ].map((item) => (
                <div key={item} className="w-full text-center">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CollectionsPage;
