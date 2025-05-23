import { component$ } from '@builder.io/qwik';

export default component$(() => {
  return (
    <footer class="bg-white py-8">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h2 class="font-bold text-gray-700 mb-4">SHOP</h2>
            <ul>
              <li><a href="#" class="text-gray-600 hover:text-gray-800">Electronics</a></li>
              <li><a href="#" class="text-gray-600 hover:text-gray-800">Home & Garden</a></li>
              <li><a href="#" class="text-gray-600 hover:text-gray-800">Sports & Outdoor</a></li>
            </ul>
          </div>
          <div>
            <h2 class="font-bold text-gray-700 mb-4">SUPPORT</h2>
            <ul>
              <li><a href="#" class="text-gray-600 hover:text-gray-800">Help</a></li>
              <li><a href="#" class="text-gray-600 hover:text-gray-800">Track order</a></li>
              <li><a href="#" class="text-gray-600 hover:text-gray-800">Shipping</a></li>
              <li><a href="#" class="text-gray-600 hover:text-gray-800">Returns</a></li>
            </ul>
          </div>
          <div>
            <h2 class="font-bold text-gray-700 mb-4">COMPANY</h2>
            <ul>
              <li><a href="#" class="text-gray-600 hover:text-gray-800">About</a></li>
              <li><a href="#" class="text-gray-600 hover:text-gray-800">Blog</a></li>
              <li><a href="#" class="text-gray-600 hover:text-gray-800">Corporate responsibility</a></li>
              <li><a href="#" class="text-gray-600 hover:text-gray-800">Press</a></li>
            </ul>
          </div>
          <div>
            <h2 class="font-bold text-gray-700 mb-4">SUBSCRIBE TO OUR NEWSLETTER</h2>
            <p class="text-gray-600 mb-4">Be the first to know about exclusive offers & deals.</p>
            <form>
              <input type="email" placeholder="Enter your email" class="border border-gray-300 p-2 w-full mb-4" />
              <button type="submit" class="bg-blue-500 text-white p-2 w-full">Subscribe</button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
});
