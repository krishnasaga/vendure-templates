import { component$, useStore, useVisibleTask$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './slider.css?inline';

import slide1 from './slide1.png';
import slide2 from './slide2.png';
import slide3 from './slide3.png';
import slide4 from './slide4.png';
import slide5 from './slide5.png';

export const HeroCarousel = component$(() => {
  useStylesScoped$(styles);

  const state = useStore({
    currentIndex: 0,
  });

  const slides = [
    {
      img: slide1,
      subtitle: 'FARM SPICELEAF',
      title: 'Quality that speaks in every pinch!',
      line1: 'From daily tadka to festive feasts - good masala makes all the difference.',
      line2: 'Choose only the best - no compromise!',
      line3: 'Trusted in every pinch',
      link: '/collections/spices-and-masalas',
    },
    {
      img: slide2,
      subtitle: 'FARM SPICELEAF',
      title: 'Aromatic & Flavorful',
      line1: 'Unlock the secrets of authentic Indian cuisine with our premium spices.',
      line2: 'Sourced from the best farms, for a taste you can trust.',
      line3: 'Trusted in every pinch',
      link: '/collections/spices-and-masalas',
    },
    {
      img: slide3,
      subtitle: 'FARM SPICELEAF',
      title: 'The Taste of Tradition',
      line1: 'Hand-picked and traditionally ground to preserve flavor and aroma.',
      line2: 'Bring home the taste of real India.',
      line3: 'Trusted in every pinch',
      link: '/products/kashmiri-chilli-powder',
    },
    {
      img: slide4,
      subtitle: 'FARM SPICELEAF',
      title: 'Sweetness of Tradition',
      line1: 'Indulge in the rich, melt-in-mouth flavor of Ghee Mysore Pak.',
      line2: 'Handcrafted with pure ghee for a truly authentic experience.',
      line3: 'A taste of heritage in every bite',
      link: '/products/ghee-mysore-pak',
    },
    {
      img: slide5,
      subtitle: 'FARM SPICELEAF',
      title: 'Pure & Unadulterated',
      line1: 'No artificial colors, no preservatives. Just pure, natural goodness.',
      line2: 'Experience the difference that quality makes.',
      line3: 'Trusted in every pinch',
      link: '/products/a2-cow-ghee',
    },
  ];

  useVisibleTask$(() => {
    const interval = setInterval(() => {
      state.currentIndex = (state.currentIndex + 1) % slides.length;
    }, 3000);
    return () => clearInterval(interval);
  });

  return (
    <div class="slider bg-[#FDEFE1]">
      {slides.map((slide, index) => (
        <div key={index} class={`slide ${state.currentIndex === index ? 'active' : ''}`}>
          <div class="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 md:px-8 h-full">
            <div class="flex flex-col items-center md:items-start text-center md:text-left py-4 md:py-8 z-10 md:w-1/2">
              <p class="text-sm md:text-base text-[#D97706] mb-2 uppercase tracking-wide">{slide.subtitle}</p>
              <h1 class="text-5xl md:text-7xl font-bold text-[#6B462B] leading-tight mb-4">{slide.title}</h1>
              <p class="text-lg md:text-xl text-[#6B462B] mb-2">{slide.line1}</p>
              <p class="text-lg md:text-xl text-[#6B462B] mb-6">{slide.line2}</p>
              <p class="text-xl md:text-2xl font-semibold text-green-600 mb-6">{slide.line3}</p>
              <button class="px-8 py-3 bg-[#F97316] text-white font-bold rounded-md shadow-md hover:bg-[#EA580C] transition duration-300 ease-in-out transform hover:scale-105">
                <a href={slide.link}>Shop Now</a>
              </button>
            </div>
            <div class="flex-shrink-0 mt-8 md:mt-0 md:ml-auto md:w-1/2 w-full flex justify-start items-start">
              <img src={slide.img} width={'500'} height={'500'} style={{ objectFit: 'contain' }} />
            </div>
          </div>
        </div>
      ))}
      <div class="dots">
        {slides.map((_, index) => (
          <div
            key={index}
            class={`dot ${state.currentIndex === index ? 'active' : ''}`}
            onClick$={() => (state.currentIndex = index)}
          ></div>
        ))}
      </div>
    </div>
  );
});
