import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ProductCard from "react-cart/src/components/ProductCard-VariantA";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const collections = [
  {
    title: "Samo Kanchi Moti Rakhi (Set Of 2)",
    imageUrl: "https://d2gansr34f2te0.cloudfront.net/image1.png",
    price: 880.0,
  },
  {
    title: "Elegant Thread Rakhi",
    imageUrl: "https://d2gansr34f2te0.cloudfront.net/image1.png",
    price: 750.0,
  },
  {
    title: "Golden Beads Rakhi",
    imageUrl: "https://d2gansr34f2te0.cloudfront.net/sarees/saree1.png",
    price: 920.0,
  },
  {
    title: "Minimal Rakhi Thread",
    imageUrl: "https://d2gansr34f2te0.cloudfront.net/image1.png",
    price: 640.0,
  },
];

const NextArrow = ({ onClick }: { onClick?: () => void }) => (
  <div
    className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer bg-white p-2 rounded-full shadow hover:bg-gray-100"
    onClick={onClick}
  >
    <FaArrowRight size={18} />
  </div>
);

const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
  <div
    className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer bg-white p-2 rounded-full shadow hover:bg-gray-100"
    onClick={onClick}
  >
    <FaArrowLeft size={18} />
  </div>
);


const ProductSection1 = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="max-w-[1200px] mt-12 mx-auto w-full px-4 md:px-0 relative">
      <h2 className="text-center text-[26px] font-semibold text-secondary-900 mb-2">
        Handcrafted Rakhis
      </h2>
      <h4 className="text-center font-light text-[15px] text-secondary-800 mb-6">
        View Rakhis
      </h4>

      <Slider {...settings}>
        {collections.map((item, idx) => (
          <div key={idx} className="px-2">
            <ProductCard
              title={item.title}
              imageUrl={item.imageUrl}
              price={item.price}
            />
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default ProductSection1;
