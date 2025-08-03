interface ProductCardProps {
  title: string;
  price: number;
  imageUrl: string;
  rating?: number;
  height?: number; // Add height prop
}

export default function ProductCard({
  title,
  price,
  imageUrl,
  rating = 5,
  height = 420,
}: ProductCardProps) {
  return (
    <div className="w-full overflow-hidden text-center" data-component="ProductCard-VariantA">
      {/* Product Image */}
      <img
        src={imageUrl}
        alt={title}
        className="w-full object-cover"
        style={{ height: `${height}px` }} // Use height prop
      />

      {/* Product Info */}
      <div className="pt-4 pb-2 px-2">
        {/* Title */}
        <h3 className="text-[15px] font-normal text-secondary-900 mb-1">
          {title}
        </h3>

        {/* Rating */}
        <div className="flex justify-center text-yellow-400 mb-2">
          {Array.from({ length: rating }).map((_, i) => (
            <svg
              key={i}
              className="w-4 h-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M10 15l-5.878 3.09 1.123-6.545L.49 6.91l6.564-.955L10 0l2.946 5.955 6.564.955-4.755 4.635 1.123 6.545z" />
            </svg>
          ))}
        </div>

        {/* Price */}
        <p className="text-[16px] font-normal text-gray-800">₹ {price.toFixed(2)}</p>
      </div>
    </div>
  );
}
