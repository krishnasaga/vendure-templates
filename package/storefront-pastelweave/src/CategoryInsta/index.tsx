// src/components/CategorySection.tsx

import CategoryCardVariantA from 'react-cart/src/components/CategoryCard-VariantA';

const collections = [
  {
    title: "",
    imageUrl: "https://d2gansr34f2te0.cloudfront.net/image1.png",
  },
  {
    title: "",
    imageUrl: "https://d2gansr34f2te0.cloudfront.net/image1.png",
  },
  {
    title: "",
    imageUrl: "https://d2gansr34f2te0.cloudfront.net/sarees/saree1.png",
  },
  {
    title: "",
    imageUrl: "https://d2gansr34f2te0.cloudfront.net/image1.png",
  },
  {
    title: "",
    imageUrl: "https://d2gansr34f2te0.cloudfront.net/image1.png",
  },
  {
    title: "",
    imageUrl: "https://d2gansr34f2te0.cloudfront.net/image1.png",
  },
  {
    title: "",
    imageUrl: "https://d2gansr34f2te0.cloudfront.net/sarees/saree1.png",
  },
  {
    title: "",
    imageUrl: "https://d2gansr34f2te0.cloudfront.net/image1.png",
  },
  {
    title: "",
    imageUrl: "https://d2gansr34f2te0.cloudfront.net/image1.png",
  },
  {
    title: "",
    imageUrl: "https://d2gansr34f2te0.cloudfront.net/image1.png",
  },
  {
    title: "",
    imageUrl: "https://d2gansr34f2te0.cloudfront.net/sarees/saree1.png",
  },
  {
    title: "",
    imageUrl: "https://d2gansr34f2te0.cloudfront.net/image1.png",
  },
];

const CategorySection = () => {
  return (
    <section className="max-w-[1200px]  mt-10 mx-auto w-full px-0 md:px-0">
      <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
        {collections.map((item, idx) => (
          <CategoryCardVariantA
            key={idx}
            title={item.title}
            imageUrl={item.imageUrl}
            height={180}
          />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
