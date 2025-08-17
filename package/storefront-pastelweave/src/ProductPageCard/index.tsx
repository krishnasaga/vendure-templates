import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import type { Product } from "../generated/graphql";

interface ProductPageCardProps {
  product: Product;
  height?: number;
}

const ProductPageCard: React.FC<ProductPageCardProps> = ({
  product,
  height = 320,
}) => {
  // Extract images from featuredAsset and assets
  const images: string[] = [
    ...(product.featuredAsset ? [product.featuredAsset?.preview] : []),
    ...(product.assets ? product.assets.map((a) => a?.preview) : []),
  ].filter(Boolean);

  // Extract price and mrp from first variant (if available)
  const firstVariant = product.variants?.[0];
  const price = firstVariant?.priceWithTax ?? 0;
  const mrp = firstVariant?.price ?? price;

  // Extract tag from first facetValue (if available)
  const tag = product.facetValues?.[0]?.name ?? "";

  // Discount logic (example: show % off if price < mrp)
  const discount =
    mrp > price && mrp > 0
      ? `${Math.round(((mrp - price) / mrp) * 100)}% OFF`
      : "";

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    );
  };

  return (
    <div className="relative text-secondary-900 group overflow-hidden">
      {/* Image Carousel */}
      <div
        className="relative overflow-hidden"
        style={{ height: `${height}px` }}
      >
        <img
          src={images[currentImageIndex]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300"
        />

        {/* Discount Badge (Top-Left) */}
        {discount && (
          <div className="absolute top-2 left-2 text-white bg-primary-900 text-xs font-semibold px-1 py-1 tracking-wide shadow-sm z-10">
            {discount}
          </div>
        )}

        {/* Sale Badge (Bottom-Left) */}
        <div className="absolute bottom-2 right-2 bg-primary-900 text-white text-xs font-semibold px-1 py-1 tracking-wide z-10">
          Sale
        </div>

        {/* Carousel Arrows - Show on Hover */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white z-10 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <FaChevronLeft size={16} />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white z-10 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <FaChevronRight size={16} />
            </button>
          </>
        )}
      </div>

      {/* Product Info */}
      <div className="p-2 text-secondary-900 text-sm">
        {/* Tag */}
        {tag && (
          <div className="inline-block border border-secondary-900 text-[10px] font-medium text-secondary-900 px-2 py-[4px] my-1">
            {tag}
          </div>
        )}

        {/* Title */}
        <h3 className="font-medium text-[13px] leading-snug mt-4 mb-2">
          {product.name}
        </h3>

        <div className="flex items-center gap-2 mb-4">
          <span className="font-semibold text-[14px] ">
            {Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: firstVariant?.priceWithTax.currencyCode || "INR",
            }).format(firstVariant?.priceWithTax.value || firstVariant?.priceWithTax.min)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductPageCard;
