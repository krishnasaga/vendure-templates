import React from "react";
import { FaInstagram } from "react-icons/fa";

interface CategoryCardProps {
  title: string;
  imageUrl: string;
  height?: number;
}

const CategoryInstaCard = ({ title, imageUrl, height = 415 }: CategoryCardProps) => {
  return (
    <div className="text-center">
      <div className="relative group w-full">
        <img
          src={imageUrl}
          alt={title}
          style={{ height: `${height}px` }}
          className="w-full object-cover"
        />

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <FaInstagram className="text-white text-3xl drop-shadow-lg" />
        </div>
      </div>

      {title && (
        <h4 className="mt-4 text-[22px] font-semibold text-secondary-900">
          {title}
        </h4>
      )}
    </div>
  );
};

export default CategoryInstaCard;
