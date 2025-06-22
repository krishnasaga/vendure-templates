import image1 from './image.png';

interface ProductCardProps {
  title: string;
  subtitle: string;
  price: number;
  imageUrl: string;
  rating?: number;
}

export default function ProductCard({
  title,
  subtitle,
  price,
  imageUrl,
  rating = 5,
}: ProductCardProps) {
  return (
    <div className="w-full overflow-hidden text-center">
      <img
        src={image1}
        alt={title}
        className="w-full h-[420px] object-cover"
      />
      <div className="p-4">
        <h3 className="text-gray-800 font-semibold">{title}</h3>
        <p className="text-gray-600 text-sm mb-2">{subtitle}</p>
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
        <p className="text-gray-700 text-lg font-semibold">£{price.toFixed(2)}</p>
      </div>
    </div>
  );
}
