import { useState, useEffect } from "react";
import Slider from "react-slick";
import ProductCard2 from "react-cart/src/components/ProductCard-VariantB";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const collections = [
  {
    title: "Samoolam Kanchi Moti Rakhi (Set Of 2)",
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

const getCardSize = (width: number) => {
  if (width < 640) {
    return { width: 150, height: 250 };
  } else if (width < 900) {
    return { width: 180, height: 360 };
  } else {
    return { width: 220, height: 420 };
  }
};

import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
const NextArrow = ({ onClick }: { onClick?: () => void }) => (
  <div
    className="absolute right-2 top-1/3 transform -translate-y-1/3 z-10 cursor-pointer bg-white p-2 rounded-full shadow hover:bg-gray-100"
    onClick={onClick}
  >
    <FaArrowRight size={18} />
  </div>
);

const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
  <div
    className="absolute left-2 top-1/3 transform -translate-y-1/3 z-10 cursor-pointer bg-white p-2 rounded-full shadow hover:bg-gray-100"
    onClick={onClick}
  >
    <FaArrowLeft size={18} />
  </div>
);

const ProductSection2 = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cardSize = getCardSize(windowWidth);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: windowWidth < 640 ? 2 : 4,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        },
      },
    ],
  };

  return (
    <section className="max-w-[1200px] mt-12 mx-auto w-full px-4 md:px-0" data-componentId="ProductCarousel-VariantA">
      <h2 className="text-center text-[26px] font-semibold text-secondary-900 mb-2">
        The Timeless Fashion Statement
      </h2>
      <h4 className="text-center font-light text-[15px] text-secondary-800 mb-6">
        Kurta & Kurta Sets
      </h4>

      <Slider {...settings}>
        {collections.map((item, idx) => (
          <div
            key={idx}
            className="px-2 flex justify-center"
            style={{
              width: cardSize.width,
              maxWidth: "100%",
            }}
          >
            <ProductCard2
              title={item.title}
              imageUrl={item.imageUrl}
              price={item.price}
              height={cardSize.height}
            />
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default ProductSection2;
