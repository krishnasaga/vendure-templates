import { component$ } from '@builder.io/qwik';

export default component$(() => {
  return (
    <div class="bg-primary-500 py-10">
      <h2 class="text-white text-5xl font-bold mb-8 text-center">Shop Our Category</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 container mx-auto px-4">
        {/* Category Card Component */}
        {[
          {
            name: 'Dry Fruits and Nuts',
            desc: 'Rich and Nutty.',
            url: '/collections/diary-products/',
            img: 'https://images.unsplash.com/photo-1541349400435-8899a68bad76?auto=format&fit=crop&w=600&q=60',
          },
          {
            name: 'Dairy Products',
            desc: 'Ghee, butter, and more.',
            url: '/collections/diary-products/',
            img: 'https://images.pexels.com/photos/20689447/pexels-photo-20689447/free-photo-of-bowls-with-liquid-and-food-ingredients.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          },
          {
            name: 'Sweets and Snacks',
            desc: 'Crunchy treats.',
            url: '/collections/diary-products/',
            img: 'https://images.unsplash.com/photo-1681476747916-8a8fc7e2001e?auto=format&fit=crop&w=600&q=60',
          },
          {
            name: 'Vegetables',
            desc: 'Farm-fresh veggies.',
            url: '/collections/diary-products/',
            img: 'https://images.pexels.com/photos/57556/pexels-photo-57556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          },
        ].map((category) => (
          <a
            key={category.name}
            href={category.url}
            class="bg-white rounded-md shadow-md overflow-hidden block hover:shadow-lg transition-shadow duration-200"
          >
            <div class="aspect-[1/1] w-full overflow-hidden">
              <img
                src={category.img}
                alt={category.name}
                class="w-full h-full object-cover hover:scale-[1.1] transition-transform duration-200"
              />
            </div>
            <div class="p-4 text-center">
              <h2 class="text-xl font-semibold text-primary">{category.name}</h2>
              <p class="text-md text-secondary">{category.desc}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
});
