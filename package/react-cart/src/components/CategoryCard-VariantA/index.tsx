interface CategoryCardProps {
  title: string;
  imageUrl: string;
  height?: number; // Optional height prop
}

const CategoryCardVariantA = ({ title, imageUrl, height = 415 }: CategoryCardProps) => {
  return (
    <div className="text-center" data-componentId="CategoryCard-VariantA">
      <img
        src={imageUrl}
        alt={title}
        style={{ height: `${height}px` }}
        className="w-full object-cover"
      />
      {title && (
        <h4 className="mt-4 text-[22px] font-semibold text-secondary-900">
          {title}
        </h4>
      )}
    </div>
  );
};

export default CategoryCardVariantA;
