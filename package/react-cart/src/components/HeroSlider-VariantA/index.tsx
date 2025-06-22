import { useEffect, useState } from 'react';
import slide1 from './slide1.png';
import slide2 from './slide2.png';
import slide3 from './slide3.png';
import slide4 from './slide4.png';
import slide5 from './slide5.png';
import slide2_2 from './slide2.2.png';

const SlideImage = ({ src = "", alt = '', className = '', ...props }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <img
      src={src}
      alt={alt}
      object-fit={"contain"}
      className={`${className} transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      onLoad={() => setLoaded(true)}
      {...props}
    />
  );
};

const Slide1 = () => (
  <div className="relative w-full overflow-hidden md:h-[600px] flex flex-col md:flex-row items-center justify-center py-4 md:py-8 bg-primary-100">
    <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 md:px-8 relative z-10">
      <div className="flex flex-col items-center md:items-start text-center md:text-left py-4 md:py-8 z-10">
        <p className="text-sm md:text-base text-primary-500 mb-2 uppercase tracking-wide">Khai Fashion</p>
        <h1 className="text-5xl md:text-7xl font-extrabold text-neutral-dark leading-tight mb-4 animate-slide-up-fade">
          Flat 25% OFF on Summer Styles!
        </h1>
        <p className="text-xl md:text-2xl text-neutral-dark mb-6 animate-slide-up-fade">
          Flowy fits, bold prints — perfect for warm days.
        </p>
        <a href="/collections/summer-fashion/" className="px-5 py-4 md:text-2xl bg-primary-500 text-primary-100 font-bold rounded-md shadow-md hover:bg-secondary-500 transition duration-300 ease-in-out transform hover:scale-105">
          Explore Collection
        </a>
      </div>
      <div className="flex-shrink-0 mt-8 md:mt-0 md:ml-auto md:w-1/2 w-full flex justify-center items-center overflow-hidden h-[600px]">
        <SlideImage src={slide1} alt="Slide 1" width={500} height={400} />
      </div>
    </div>
  </div>
);

const Slide2 = () => (
  <div className="relative w-full overflow-hidden md:h-[600px] flex flex-col md:flex-row items-center justify-center py-4 md:py-0 bg-primary-100">
    <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 md:px-8 relative z-10 h-full mt-0">
      <div className="flex flex-col items-center md:items-start text-center md:text-left py-4 md:py-8 z-10">
        <p className="text-sm md:text-base text-primary-500 mb-2 uppercase tracking-wide">Khai Fashion</p>
        <h1 className="text-5xl md:text-7xl font-extrabold text-neutral-dark leading-tight mb-4 animate-slide-up-fade">
          What defines effortless style?
        </h1>
        <p className="text-xl md:text-2xl text-neutral-dark mb-2 animate-slide-up-fade">
          The right drape, the right detail.
        </p>
        <a href="/collections/fusion-wear/" className="px-5 py-4 md:text-2xl bg-primary-500 text-primary-100 font-bold rounded-md shadow-md hover:bg-secondary-500 transition duration-300 ease-in-out transform hover:scale-105">
          Explore Looks
        </a>
      </div>
      <div className="flex-shrink-0 mt-8 md:mt-0 md:ml-auto md:w-1/2 w-full h-full flex flex-col justify-start items-center overflow-hidden">
        <SlideImage src={slide2} alt="Slide 2 top" width={500} height={300} />
        <SlideImage src={slide2_2} alt="Slide 2 bottom" width={500} height={300} />
      </div>
    </div>
  </div>
);

const Slide3 = () => (
  <div className="relative w-full overflow-hidden md:h-[600px] flex flex-col md:flex-row items-center justify-center py-4 md:py-8 bg-primary-100">
    <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 md:px-8 relative z-10">
      <div className="flex flex-col items-center md:items-start text-center md:text-left py-4 md:py-8 z-10">
        <p className="text-sm md:text-base text-primary-500 mb-2 uppercase tracking-wide">Khai Fashion</p>
        <h1 className="text-5xl md:text-7xl font-extrabold text-neutral-dark leading-tight mb-4 animate-slide-up-fade">
          Style meets substance — no compromise!
        </h1>
        <p className="text-xl md:text-2xl text-neutral-dark mb-2 animate-slide-up-fade">
          From everyday elegance to festive glam — we've got you covered.
        </p>
        <a href="/products/khadi-kurta-set/" className="px-9 py-7 md:text-5xl bg-primary-500 text-primary-100 font-bold rounded-md shadow-md hover:bg-secondary-500 transition duration-300 ease-in-out transform hover:scale-105">
          Shop the Look
        </a>
      </div>
      <div className="flex-shrink-0 mt-8 md:mt-0 md:ml-auto md:w-1/2 w-full flex justify-center items-center overflow-hidden">
        <SlideImage src={slide3} alt="Slide 3" width={500} height={600} />
      </div>
    </div>
  </div>
);

const Slide4 = () => (
  <div className="relative w-full overflow-hidden md:h-[600px] flex flex-col md:flex-row items-center justify-center py-4 md:py-8 bg-primary-100">
    <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 md:px-8 relative z-10">
      <div className="flex flex-col items-center md:items-start text-center md:text-left py-4 md:py-8 z-10">
        <p className="text-sm md:text-base text-primary-500 mb-2 uppercase tracking-wide">Khai Fashion</p>
        <h1 className="text-5xl md:text-7xl font-extrabold text-neutral-dark leading-tight mb-4 animate-slide-up-fade">
          Festive Combo Pack!
        </h1>
        <p className="text-xl md:text-2xl text-neutral-dark mb-2 animate-slide-up-fade">
          Get handcrafted dupattas with our bestselling tunics.
        </p>
        <a href="/products/festive-combo/" className="px-9 py-7 md:text-5xl bg-primary-500 text-primary-100 font-bold rounded-md shadow-md hover:bg-secondary-500 transition duration-300 ease-in-out transform hover:scale-105">
           Explore Collection
        </a>
      </div>
      <div className="flex-shrink-0 mt-8 md:mt-0 md:ml-auto md:w-1/2 w-full flex justify-center items-center overflow-hidden">
        <SlideImage src={slide4} alt="Slide 4" width={500} height={600} />
      </div>
    </div>
  </div>
);

const Slide5 = () => (
  <div className="relative w-full overflow-hidden md:h-[600px] flex flex-col md:flex-row items-center justify-center py-4 md:py-8 bg-primary-100">
    <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 md:px-8 relative z-10">
      <div className="flex flex-col items-center md:items-start text-center md:text-left py-4 md:py-8 z-10">
        <p className="text-sm md:text-base text-primary-500 mb-2 uppercase tracking-wide">Khai Fashion</p>
        <h1 className="text-5xl md:text-7xl font-extrabold text-neutral-dark leading-tight mb-4 animate-slide-up-fade">
          Handmade Accessories - A Must-Have!
        </h1>
        <p className="text-xl md:text-2xl font-bold text-green-500 mb-6 animate-slide-up-fade">
          Made to complete your look
        </p>
        <a href="/products/handcrafted-earrings/" className="px-6 py-3 bg-primary-500 text-primary-100 font-bold rounded-md shadow-md hover:bg-secondary-500 transition duration-300 ease-in-out transform hover:scale-105">
          Shop Now
        </a>
      </div>
      <div className="flex-shrink-0 mt-8 md:mt-0 md:ml-auto md:w-1/2 w-full flex justify-center items-center overflow-hidden">
        <SlideImage src={slide5} alt="Slide 5" width={500} height={600} />
      </div>
    </div>
  </div>
);

export const HeroCarousel = () => {
  const slides = [<Slide1 />, <Slide2 />, <Slide3 />, <Slide4 />, <Slide5 />];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      <div className="absolute inset-0 transition-all duration-700">
        {slides[index]}
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${i === index ? 'bg-white' : 'bg-gray-400'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
