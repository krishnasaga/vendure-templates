import { component$, useSignal, $, QRL } from '@builder.io/qwik';

// Define a type for a single product
interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  rating: number; // 1-5
  category: 'All' | 'Vegetables' | 'Fruits' | 'Bread' | 'Meat';
  inStock: boolean;
}

// --- ProductCard Component ---
// This is a sub-component for displaying an individual product
interface ProductCardProps {
  product: Product;
  onAddToCart$?: QRL<(productId: string) => void>; // Optional QRL for add to cart action
}

export const ProductCard = component$<ProductCardProps>(({ product, onAddToCart$ }) => {
  return (
    <div class="bg-white rounded-lg shadow-md p-4 relative overflow-hidden transform transition-transform duration-200 hover:scale-[1.02]">
      {/* "Out Of Stock" Overlay */}
      {!product.inStock && (
        <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white font-bold text-xl rounded-lg z-10">
          Out Of Stock
        </div>
      )}

      <div class="w-full h-40 flex items-center justify-center mb-4">
        <img
          src={product.image}
          alt={product.name}
          width={150} // Approximate width based on image, adjust as needed
          height={150} // Approximate height based on image, adjust as needed
          class="object-contain max-h-full max-w-full"
          loading="lazy"
        />
      </div>

      <h3 class="font-semibold text-gray-800 text-base mb-1">{product.name}</h3>

      {/* Star Rating */}
      <div class="flex items-center space-x-0.5 text-yellow-400 text-sm mb-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <svg
            key={index}
            class={`w-4 h-4 ${index < product.rating ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.683-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.565-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
        ))}
      </div>

      <p class="text-lg font-bold text-green-600 mb-4">£{product.price.toFixed(2)}</p>

      {/* Action Button */}
      {product.inStock ? (
        <button
          onClick$={() => onAddToCart$?.(product.id)}
          class="w-full py-2 px-4 bg-green-500 text-white rounded-md text-sm font-medium hover:bg-green-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          ADD TO CART
        </button>
      ) : (
        <button
          class="w-full py-2 px-4 bg-gray-200 text-gray-700 rounded-md text-sm font-medium cursor-not-allowed"
          disabled
        >
          READ MORE
        </button>
      )}
    </div>
  );
});

// --- ProductListing Component ---
/**
 * ProductListing component displays a grid of products with category filtering.
 * It includes a sub-component for individual product cards.
 */
export const ProductListing = component$(() => {
  // Use useSignal to manage the active filter state
  const activeFilter = useSignal<Product['category']>('All');

  // Dummy product data
  // NOTE: Ensure your /public/images/ directory contains the images referenced here.
  const products: Product[] = [
    { id: '1', name: 'Papaya Single', image: '/images/papaya.png', price: 745.64, rating: 5, category: 'Fruits', inStock: true },
    { id: '2', name: 'Cauliflower Pack 350g', image: '/images/cauliflower.png', price: 527.32, rating: 4, category: 'Vegetables', inStock: false },
    { id: '3', name: 'Kiwi Fruit Single', image: '/images/kiwi.png', price: 100.13, rating: 5, category: 'Fruits', inStock: true },
    { id: '4', name: 'Large Queen Pineapple', image: '/images/pineapple.png', price: 149.94, rating: 4, category: 'Fruits', inStock: true },
    { id: '5', name: 'Mixed Chillies Pack 150g', image: '/images/chillies.png', price: 724.75, rating: 5, category: 'Vegetables', inStock: true },
    { id: '6', name: 'Beef Brisket Per kg', image: '/images/beef-brisket.png', price: 37.90, rating: 5, category: 'Meat', inStock: true },
    { id: '7', name: 'Freshmark Cut Spinach 250g', image: '/images/spinach.png', price: 448.26, rating: 4, category: 'Vegetables', inStock: true },
    { id: '8', name: 'Thinly Sliced Beef Brisket', image: '/images/sliced-brisket.png', price: 985.97, rating: 5, category: 'Meat', inStock: true },
    { id: '9', name: 'Frozen Angelfish Per kg', image: '/images/angelfish.png', price: 647.32, rating: 4, category: 'Meat', inStock: true },
    { id: '10', name: 'Gourmet Beef Sausages Per kg', image: '/images/beef-sausages.png', price: 648.97, rating: 3, category: 'Meat', inStock: false },
  ];

  // Categories for the filter buttons
  const categories: Product['category'][] = ['All', 'Vegetables', 'Fruits', 'Bread', 'Meat'];

  // Filtered products based on the active filter
  const filteredProducts = products.filter(product =>
    activeFilter.value === 'All' ? true : product.category === activeFilter.value
  );

  // Event handler for filter button clicks
  const handleFilterClick = $((category: Product['category']) => {
    activeFilter.value = category;
  });

  // Event handler for "Add to Cart" button (you would integrate actual cart logic here)
  const handleAddToCart = $((productId: string) => {
    console.log(`Product with ID ${productId} added to cart!`);
    // In a real app, you'd dispatch an action, update cart state, etc.
  });

  return (
    <div class="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Category Filter Buttons */}
      <div class="flex flex-wrap justify-center gap-4 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick$={() => handleFilterClick(category)}
            class={[
              'px-6 py-2 rounded-full font-medium transition-colors duration-200',
              activeFilter.value === category
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
            ]}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart$={handleAddToCart}
          />
        ))}
        {filteredProducts.length === 0 && (
          <p class="col-span-full text-center text-gray-600 text-lg">No products found for this category.</p>
        )}
      </div>
    </div>
  );
});
export default ProductListing
