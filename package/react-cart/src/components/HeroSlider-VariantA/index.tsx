import { useEffect, useState } from "react";

const SlideImage = ({ src = "", alt = "", className = "", ...props }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!src) return;

    const img = new Image();
    img.src = src;
    img.onload = () => setLoaded(true);
  }, [src]);

  return (
    <img
      data-componentId="Image"
      src={src}
      alt={alt}
      object-fit={"contain"}
      className={`${className} transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
      style={{ pointerEvents: loaded ? undefined : "none" }}
      draggable={false}
      {...props}
    />
  );
};

const Slide1 = () => (
  <div className="relative bg-primary-100 bg-[url('https://d2gansr34f2te0.cloudfront.net/gray-floral.png')] w-full overflow-hidden md:h-full flex flex-col md:flex-row items-center justify-center md:py-8 ">
    <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 md:px-8 relative z-10">
      <div className="flex flex-col items-center md:items-start text-center md:text-left py-4 md:py-8 z-10">
        <p data-componentId="Text" className="text-sm md:text-base text-primary-500 mb-2 uppercase tracking-wide">
          PASTEL WAVE
        </p>
        <h1 data-componentId="Text" className="text-5xl md:text-7xl font-extrabold text-secondary-900 leading-tight mb-4 animate-slide-left-fade">
          Flat 25% OFF on Summer Styles!
        </h1>
        <p data-componentId="Text" className="text-xl md:text-2xl text-secondary-900 mb-6 animate-slide-left-fade">
          Flowy fits, bold prints — perfect for warm days.
        </p>
        <a
          href="/collections/summer-fashion/"
          className="animate-slide-up-fade px-5 py-4 md:text-2xl bg-primary-500 text-white font-bold hover:bg-secondary-500 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Explore Collection
        </a>
      </div>
      <div className="flex-shrink-0 mt-8 md:mt-0 md:ml-auto md:w-1/2 w-full flex justify-center items-center overflow-hidden ">
        <SlideImage
          src={"https://d2gansr34f2te0.cloudfront.net/hero-2.png"}
          alt="Slide 1"
          width={500}
          height={400}
          className="animate-slide-right-fade"
        />
      </div>
    </div>
  </div>
);

const Slide2 = () => (
  <div className="relative w-full overflow-hidden md:h-full flex flex-col md:flex-row items-center justify-center py-4 md:py-0 bg-primary-100 bg-[url('https://d2gansr34f2te0.cloudfront.net/gray-floral.png')] bg-center bg-repeat">
    <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 md:px-8 relative z-10 h-full mt-0">
      <div className="flex flex-col items-center md:items-start text-center md:text-left py-4 md:py-8 z-10">
        <p data-componentId="Text" className="text-sm md:text-base text-primary-500 mb-2 uppercase tracking-wide">
          PASTEL WAVE
        </p>
        <h1 data-componentId="Text" className="text-5xl md:text-7xl font-extrabold text-secondary-900 leading-tight mb-4 animate-slide-left-fade">
          What defines effortless style?
        </h1>
        <p data-componentId="Text" className="text-xl md:text-2xl text-secondary-900 mb-2 animate-slide-left-fade">
          The right drape, the right detail.
        </p>
        <a
          data-componentId="Text"
          href="/collections/summer-fashion/"
          className="animate-slide-up-fade px-5 py-4 md:text-2xl bg-primary-500 text-white font-bold hover:bg-secondary-500 transition duration-300 ease-in-out transform hover:scale-105 animate-ping"
        >
          Explore Collection
        </a>
      </div>
      <div className="flex-shrink-0 mt-8 md:mt-0 md:ml-auto md:w-1/2 w-full flex justify-center items-center overflow-hidden ">
        <SlideImage
          src={"https://d2gansr34f2te0.cloudfront.net/hero-2.png"}
          alt="Slide 1"
          width={500}
          height={400}
          className="animate-slide-right-fade"
        />
      </div>
    </div>
  </div>
);

const Slide3 = () => (
  <div className="relative w-full overflow-hidden md:h-full flex flex-col md:flex-row items-center justify-center py-4 md:py-8 bg-repeat bg-tile-x bg-[#f7e7f7] ">
    <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 md:px-8 relative z-10">
      <div className="flex flex-col items-center md:items-start text-center md:text-left py-4 md:py-8 z-10">
        <p data-componentId="Text" className="text-sm md:text-base text-primary-500 mb-2 uppercase tracking-wide">
          PASTEL WAVE
        </p>
        <h1 data-componentId="Text" className="text-5xl md:text-7xl font-extrabold text-secondary-900  leading-tight mb-4 animate-slide-left-fade">
          Style Meets Substance!
        </h1>
        <p data-componentId="Text" className="text-xl md:text-2xl text-secondary-900 mb-2 animate-slide-left-fade">
          From everyday elegance to festive glam — we've got you covered.
        </p>
        <a
          data-componentId="Text"
          href="/collections/summer-fashion/"
          className="animate-slide-up-fade px-5 py-4 md:text-2xl bg-primary-500 text-white font-bold hover:bg-secondary-500 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Explore Collection
        </a>
      </div>
      <div className="flex-shrink-0 mt-8 md:mt-0 md:ml-auto md:w-1/2 w-full flex justify-center items-center overflow-hidden ">
        <SlideImage
          src={"https://d2gansr34f2te0.cloudfront.net/hero-2.png"}
          alt="Slide 1"
          width={500}
          height={400}
          className="animate-slide-right-fade"
        />
      </div>
    </div>
  </div>
);

const Slide4 = () => (
  <div className="relative w-full overflow-hidden md:h-full flex flex-col md:flex-row items-center justify-center py-4 md:py-8 bg-gradient-to-br from-[#D8E6F1] via-[#C9DDEB] to-[#B5CFE1] ">
    <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 md:px-8 relative z-10">
      <div className="flex flex-col items-center md:items-start text-center md:text-left py-4 md:py-8 z-10">
        <p data-componentId="Text" className="text-sm md:text-base text-primary-500 mb-2 uppercase tracking-wide">
          PASTEL WAVE
        </p>
        <h1 data-componentId="Text" className="text-5xl md:text-7xl font-extrabold text-secondary-900  leading-tight mb-4 animate-slide-left-fade">
          Festive Combo Pack!
        </h1>
        <p data-componentId="Text" className="text-xl md:text-2xl text-secondary-900  mb-2 animate-slide-right-fade">
          Get handcrafted dupattas with our bestselling tunics.
        </p>
        <a
          data-componentId="Text"
          href="/collections/summer-fashion/"
          className="animate-slide-up-fade px-5 py-4 md:text-2xl bg-primary-500 text-white font-bold hover:bg-secondary-500 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Explore Collection
        </a>
      </div>
      <div className="flex-shrink-0 mt-8 md:mt-0 md:ml-auto md:w-1/2 w-full flex justify-center items-center overflow-hidden ">
        <SlideImage
          src={"https://d2gansr34f2te0.cloudfront.net/hero-4.png"}
          alt="Slide 1"
          width={500}
          height={400}
          className="animate-slide-right-fade"
        />
      </div>
    </div>
  </div>
);

const Slide5 = () => (
  <div className="relative w-full overflow-hidden md:h-full flex flex-col md:flex-row items-center justify-center py-4 md:py-8 bg-primary-100 bg-[url('https://d2gansr34f2te0.cloudfront.net/gray-floral.png')]">
    <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 md:px-8 relative z-10">
      <div className="flex flex-col items-center md:items-start text-center md:text-left py-4 md:py-8 z-10">
        <p data-componentId="Text" className="text-sm md:text-base text-primary-500 mb-2 uppercase tracking-wide">
          PASTEL WAVE
        </p>
        <h1 data-componentId="Text" className="text-5xl md:text-7xl font-extrabold text-secondary-900  leading-tight mb-4 animate-slide-right-fade">
          Handmade Accessories
        </h1>
        <p data-componentId="Text" className="text-xl md:text-2xl font-bold text-secondary-900  mb-6 animate-slide-left-fade">
          Made to complete your look
        </p>
        <a
          data-componentId="Text"
          href="/collections/summer-fashion/"
          className="animate-slide-up-fade px-5 py-4 md:text-2xl bg-primary-500 text-white font-bold hover:bg-secondary-500 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Explore Collection
        </a>
      </div>
      <div className="flex-shrink-0 mt-8 md:mt-0 md:ml-auto md:w-1/2 w-full flex justify-center items-center overflow-hidden ">
        <SlideImage
          src={"https://d2gansr34f2te0.cloudfront.net/hero-2.png"}
          alt="Slide 1"
          width={500}
          height={400}
          className="animate-slide-right-fade"
        />
      </div>
    </div>
  </div>
);

export const HeroCarousel = (props: { className: string }) => {
  const slides = [<Slide1 />, <Slide2 />, <Slide3 />, <Slide4 />, <Slide5 />];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div
      className={`relative w-full  overflow-hidden ${props?.className}`}
      data-componentId="HeroSlider-VariantA"
    >
      <div className="absolute inset-0 transition-all duration-700">
        {slides[index]}
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${i === index ? "bg-white" : "bg-gray-400"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
