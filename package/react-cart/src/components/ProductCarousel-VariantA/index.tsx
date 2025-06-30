import React, { useRef } from 'react';

interface ProductCarouselProps {
  products: any[];
  CardComponent: React.ComponentType<{ product: any }>;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ products, CardComponent }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: string) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      current?.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative container mx-auto my-8">
      <div className='flex justify-between items-center mb-4'>
        <h2 className="text-2xl font-bold text-secondary-900">Featured Products</h2>
        
      </div>
      {/* Left Arrow */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-white border rounded-full shadow p-2"
      >
        ←
      </button>

      {/* Scroll Container */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto scrollbar-hide py-4 scroll-smooth w-full gap-6"
        style={{ scrollBehavior: 'smooth' }}
      >
        {products.map((product, idx) => (
          <div className="w-[300px] flex-shrink-0" key={idx}>
             <CardComponent key={idx} product={product} />
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-white border rounded-full shadow p-2"
      >
        →
      </button>
    </div>
  );
};

export default ProductCarousel;
