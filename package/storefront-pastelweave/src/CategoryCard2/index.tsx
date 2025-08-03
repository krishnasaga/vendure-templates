import { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import CategoryCardVariantA from "react-cart/src/components/CategoryCard-VariantA";
import CategoryCardVariantB from "react-cart/src/components/CategoryCard-VariantB";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const collectionsA = [
  {
    title: "",
    imageUrl: "https://d2gansr34f2te0.cloudfront.net/sarees/saree1.png",
  },
  {
    title: "",
    imageUrl: "https://d2gansr34f2te0.cloudfront.net/image1.png",
  },
  {
    title: "",
    imageUrl: "https://d2gansr34f2te0.cloudfront.net/sarees/saree1.png",
  },
  {
    title: "",
    imageUrl: "https://d2gansr34f2te0.cloudfront.net/image1.png",
  },
];

const CategoryCard2 = () => {
  const desktopSliderRef = useRef<Slider | null>(null);
  const mobileSliderRef = useRef<Slider | null>(null);

  const desktopSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
  };

  const mobileSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <section className="max-w-[1200px] mt-20 mx-auto w-full px-4 md:px-0">
      {/* Desktop + Tablet View */}
      <div className="hidden md:flex flex-row gap-8 items-center relative">
        <div className="w-full md:w-1/3">
          <CategoryCardVariantB
            title="New Arrivals"
            subtitle="Crafted with love"
            imageUrl="https://d2gansr34f2te0.cloudfront.net/image1.png"
            buttonText="SHOP NOW"
            height={580}
          />
          <button
            className="absolute -left-6 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100"
            onClick={() => desktopSliderRef.current?.slickPrev()}
          >
            <FaArrowLeft size={18} />
          </button>
        </div>

        <div className="w-full md:w-2/3 relative">
          <Slider ref={desktopSliderRef} {...desktopSettings}>
            {collectionsA.map((item, idx) => (
              <div key={idx} className="px-2">
                <CategoryCardVariantA
                  title={item.title}
                  imageUrl={item.imageUrl}
                  height={580}
                />
              </div>
            ))}
          </Slider>

          <button
            className="absolute -right-6 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100"
            onClick={() => desktopSliderRef.current?.slickNext()}
          >
            <FaArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden relative">
        <button
          className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow"
          onClick={() => mobileSliderRef.current?.slickPrev()}
        >
          <FaArrowLeft size={16} />
        </button>

        <Slider ref={mobileSliderRef} {...mobileSettings}>
          {collectionsA.map((item, idx) => (
            <div key={idx} className="px-2">
              <CategoryCardVariantA
                title={item.title}
                imageUrl={item.imageUrl}
                height={380}
              />
            </div>
          ))}
        </Slider>

        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow"
          onClick={() => mobileSliderRef.current?.slickNext()}
        >
          <FaArrowRight size={16} />
        </button>
      </div>
    </section>
  );
};

export default CategoryCard2;
