import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

interface ProductProps {
  images: string[];
  discount: string;
  tag: string;
  title: string;
  price: number;
  mrp: number;
  height?: number; // Add height prop
}

const ProductPageCard: React.FC<ProductProps> = ({
  images,
  discount,
  tag,
  title,
  price,
  mrp,
  height = 320, // Default height if not provided
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
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
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300"
        />

        {/* Discount Badge (Top-Left) */}
        <div className="absolute top-2 left-2 text-white bg-primary-900 text-xs font-semibold px-1 py-1 tracking-wide shadow-sm z-10">
          {discount}
        </div>

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
        <div className="inline-block border border-secondary-900 text-[10px] font-medium text-secondary-900 px-2 py-[4px] my-1">
          {tag}
        </div>

        {/* Title */}
        <h3 className="font-medium text-[13px] leading-snug mt-4 mb-2">
          {title}
        </h3>

        {/* Price and MRP */}
        <div className="flex items-center gap-2 mb-4">
          <span className="font-semibold text-[14px] ">
            ₹{price.toLocaleString()}
          </span>
          <span className="line-through text-[12px] ">
            ₹{mrp.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductPageCard;
