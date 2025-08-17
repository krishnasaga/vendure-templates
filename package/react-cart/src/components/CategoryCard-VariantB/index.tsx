import { BsArrowRight } from "react-icons/bs";

interface CategoryCardProps {
  title: string;
  subtitle?: string;
  imageUrl: string;
  buttonText?: string;
  height?: number;
}

const CategoryCardVariantB = ({
  title,
  subtitle,
  imageUrl,
  buttonText ,
  height ,
}: CategoryCardProps) => {
  return (
    <div
      className="relative w-full text-white overflow-hidden"
      style={{ height: `${height}px` }}
      data-componentId="CategoryCard-VariantB"
    >
      {/* Background Image */}
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-full object-cover"
      />

      {/* Overlay content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/50 via-black/30 to-transparent">
        <h3 className="text-[22px] font-semibold mb-1">{title}</h3>
        {subtitle && (
          <p className="text-sm font-light mb-4">{subtitle}</p>
        )}
        <button className="border border-white text-white px-4 py-2 text-sm uppercase font-medium hover:bg-primary-900 transition-all w-max flex items-center gap-2">
          {buttonText}
          <BsArrowRight className="text-base" />
        </button>
      </div>
    </div>
  );
};

export default CategoryCardVariantB;
