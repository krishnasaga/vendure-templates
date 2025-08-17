/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useMemo } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "react-cart/src/components/ProductCard-VariantA";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useQuery, gql } from "@apollo/client";
import {
  type SearchResult,
} from "../generated/graphql";

const ProductSection1 = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cardSize = getCardSize(windowWidth);

  const settings = useMemo(
    () => ({
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
    }),
    [windowWidth],
  );

  const { data } = useQuery(
    gql`
      query GetCollectionProducts($slug: String) {
        search(
          input: {
            collectionSlug: $slug
            groupByProduct: true
            skip: 0
            take: 10
          }
        ) {
          totalItems

          items {
            productName
            slug
            productAsset {
              id
              preview
            }
            priceWithTax {
              ... on SinglePrice {
                value
              }
              ... on PriceRange {
                min
                max
              }
            }
          }
        }
      }
    `,
    {
      variables: { slug: "saree" },
    },
  );

  if (!data) return null;

  const products = data?.search?.items || [];
  console.log("Products:", data);

  return (
    <section
      className="max-w-[1200px] mt-12 mx-auto w-full px-4 md:px-0 relative"
      data-componentId="ProductCarousel-VariantA"
      data-component="ProductCarousel-VariantA"
      style={{ overflow: "hidden" }}
    >
      <h2 className="text-center text-[26px] font-semibold text-secondary-800 mb-2">
        Handcrafted Sarees
      </h2>
      <h4 className="text-center font-light text-[15px] text-secondary-700 mb-6">
        View All
      </h4>

      <Slider {...settings}>
        {products?.map((item: SearchResult, idx: number) => (
          <div
            key={idx}
            className="px-2 flex justify-center"
            style={{
              width: cardSize.width,
              maxWidth: "100%",
            }}
          >
            <ProductCard
              title={item.productName || ""}
              imageUrl={item?.productAsset?.preview || ""}
              price={
                "min" in (item?.priceWithTax || {})
                  ? (item.priceWithTax as any).min / 100
                  : (item.priceWithTax as any).value / 100
              }
              height={cardSize.height}
            />
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default ProductSection1;

const getCardSize = (width: number) => {
  if (width < 640) {
    return { width: 150, height: 250 };
  } else if (width < 900) {
    return { width: 180, height: 360 };
  } else {
    return { width: 220, height: 420 };
  }
};

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
