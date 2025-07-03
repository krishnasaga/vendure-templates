import React from 'react';

interface ProductCardProps {
  title: string;
  image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, image }) => (
  <div className="flex flex-col items-center">
    <img src={image} alt={title} className="w-[164px] h-[279px] object-cover" />
    <p className="text-[16px] mt-2 font-semibold text-secondary-900 cursor-pointer">{title}</p>
  </div>
);

export default ProductCard;
