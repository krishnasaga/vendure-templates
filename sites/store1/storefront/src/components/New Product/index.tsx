import { component$ } from '@builder.io/qwik';

export const NewProducts = component$(() => {
  const products = [
    {
      name: 'Papaya Single',
      price: '£746.64',
      image: '/images/papaya.png',
      rating: 4,
      inStock: true,
    },
    {
      name: 'Cauliflower Pack 350g',
      price: '£527.32',
      image: '/images/cauliflower.png',
      rating: 5,
      inStock: false,
    },
    {
      name: 'Kiwi Fruit Single',
      price: '',
      image: '/images/kiwi.png',
      rating: 5,
      inStock: true,
    },
    {
      name: 'Large Crown Pineapple',
      price: '',
      image: '/images/pineapple.png',
      rating: 4,
      inStock: true,
    },
  ];

  return (
    <div class="p-4 max-w-screen-lg mx-auto">
      <h2 class="text-xl font-semibold text-center mb-4">New Products</h2>

      <div class="flex justify-center gap-2 mb-6 flex-wrap">
        {['All', 'Vegetables', 'Fruits', 'Bread', 'Meat'].map((category) => (
          <button
            key={category}
            class="px-4 py-1 rounded-full text-sm bg-green-100 text-green-800 hover:bg-green-200"
          >
            {category}
          </button>
        ))}
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {products.map((product, index) => (
          <div key={index} class="bg-white rounded shadow p-2 relative text-center">
            <img
              src={product.image}
              alt={product.name}
              class="h-24 w-24 object-contain mx-auto"
            />
            {!product.inStock && (
              <span class="absolute top-2 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs px-2 py-1 rounded">
                Out Of Stock
              </span>
            )}
            <p class="mt-2 font-medium">{product.name}</p>
            {product.price && <p class="text-green-600 font-semibold">{product.price}</p>}
            <div class="flex justify-center mt-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  class={`w-4 h-4 ${i < product.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448 1.286 3.957c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.285-3.957-3.37-2.448c-.783-.57-.38-1.81.588-1.81h4.162l1.286-3.957z" />
                </svg>
              ))}
            </div>
            {product.inStock ? (
              <button class="mt-2 w-full py-1 text-sm text-white bg-green-500 rounded hover:bg-green-600">
                Add to Cart
              </button>
            ) : (
              <button class="mt-2 w-full py-1 text-sm text-gray-500 bg-gray-200 rounded cursor-not-allowed">
                Read More
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
});
