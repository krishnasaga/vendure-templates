import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import CategoryCardVariantA from "react-cart/src/components/CategoryCard-VariantA";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { gql, useQuery } from "@apollo/client";

const collections = [
  {
    title: "Kurtas",
    imageUrl: "https://d2gansr34f2te0.cloudfront.net/image1.png",
  },
  {
    title: "Dresses",
    imageUrl: "https://d2gansr34f2te0.cloudfront.net/image1.png",
  },
  {
    title: "Sarees",
    imageUrl: "https://d2gansr34f2te0.cloudfront.net/sarees/saree1.png",
  },
  {
    title: "Jewellery",
    imageUrl: "https://d2gansr34f2te0.cloudfront.net/image1.png",
  },
  {
    title: "Tops",
    imageUrl: "https://d2gansr34f2te0.cloudfront.net/image1.png",
  },
  {
    title: "Dupattas",
    imageUrl: "https://d2gansr34f2te0.cloudfront.net/image1.png",
  },
];

const getCardSize = (width: number) => {
  if (width < 600) {
    return { width: 140, height: 240 };
  } else if (width < 900) {
    return { width: 180, height: 300 };
  } else {
    return { width: 220, height: 415 };
  }
};

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

const CategorySection = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const { data, loading, error } = useQuery(gql`
    query GetCollections {
      collections(options: { take: 10 }) {
        items {
          id
          name
          slug
          featuredAsset {
            preview
          }
        }
      }
    }
  `);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Determine slidesToShow and arrows based on windowWidth
  let slidesToShow = 4;
  let arrows = false;
  if (windowWidth < 1200 && windowWidth >= 900) {
    slidesToShow = 3;
    arrows = true;
  } else if (windowWidth < 900) {
    slidesToShow = 2;
    arrows = true;
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows,
    slidesToShow,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          arrows: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          arrows: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          arrows: true,
        },
      },
    ],
  };

  const cardSize = getCardSize(windowWidth);

  return (
    <section className="w-full mt-10 px-2 sm:px-4 flex justify-center">
      <div className="w-full max-w-[1200px]">
        <h2 className="text-center text-[22px] sm:text-[26px] font-semibold text-secondary-900 mb-6 sm:mb-10">
          Collections
        </h2>

        <Slider {...settings}>
            {loading ? (
            // Loading skeleton
            Array.from({ length: 4 }).map((_, idx) => (
              <div
              key={`skeleton-${idx}`}
              className="px-1 sm:px-2 md:px-3 flex justify-center"
              style={{
                width: cardSize.width,
                maxWidth: "100%",
              }}
              >
              <div
                className="bg-gray-200 animate-pulse rounded-lg"
                style={{ height: cardSize.height, width: cardSize.width }}
              />
              </div>
            ))
            ) : error ? (
            <div className="text-center text-red-500">Error loading collections</div>
            ) : (
            data?.collections?.items?.map((item: any, idx: number) => (
              <div
              key={`${item.id}-${idx}`}
              className="px-1 sm:px-2 md:px-3 flex justify-center"
              style={{
                width: cardSize.width,
                maxWidth: "100%",
              }}
              >
              <CategoryCardVariantA
                title={item.name}
                imageUrl={item.featuredAsset?.preview || "https://d2gansr34f2te0.cloudfront.net/image1.png"}
                height={cardSize.height}
              />
              </div>
            ))
            )}
        </Slider>
      </div>
    </section>
  );
};

export default CategorySection;
