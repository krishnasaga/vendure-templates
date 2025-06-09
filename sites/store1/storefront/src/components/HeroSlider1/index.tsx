import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';

const Slide1 = component$(() => (
  <div class="flex items-center justify-center h-full bg-blue-500 text-white text-2xl font-bold">
    Slide 1 - Welcome
  </div>
));

const Slide2 = component$(() => (
  <div class="flex items-center justify-center h-full bg-green-500 text-white text-2xl font-bold">
    Slide 2 - Features
  </div>
));

const Slide3 = component$(() => (
  <div class="flex items-center justify-center h-full bg-red-500 text-white text-2xl font-bold">
    Slide 3 - Services
  </div>
));

const Slide4 = component$(() => (
  <div class="flex items-center justify-center h-full bg-purple-500 text-white text-2xl font-bold">
    Slide 4 - Testimonials
  </div>
));

const Slide5 = component$(() => (
  <div class="flex items-center justify-center h-full bg-yellow-500 text-black text-2xl font-bold">
    Slide 5 - Contact
  </div>
));

export const HeroCarousel = component$(() => {
  const currentIndex = useSignal(0);
  const slides = [
    <Slide1 />, <Slide2 />, <Slide3 />, <Slide4 />, <Slide5 />
  ];

  useVisibleTask$(() => {
    const interval = setInterval(() => {
      currentIndex.value = (currentIndex.value + 1) % slides.length;
    }, 5000);
    return () => clearInterval(interval);
  });

  return (
    <div class="relative w-full h-[400px] overflow-hidden">
      <div class="absolute inset-0 transition-all duration-700">
        {slides[currentIndex.value]}
      </div>

      <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            class={`w-3 h-3 rounded-full transition-colors duration-300 ${
              currentIndex.value === index ? 'bg-white' : 'bg-gray-400'
            }`}
            onClick$={() => (currentIndex.value = index)}
          />
        ))}
      </div>
    </div>
  );
});
