// src/components/CategorySection.tsx

import CategoryCardVariantA from 'react-cart/src/components/CategoryCard-VariantA';
import CategoryCardVariantB from 'react-cart/src/components/CategoryCard-VariantB';

const collectionsA = [
  {
    title: "",
    imageUrl: "https://d2gansr34f2te0.cloudfront.net/sarees/saree1.png",
  },
  {
    title: "",
    imageUrl: "https://d2gansr34f2te0.cloudfront.net/image1.png",
  },
];

const CategoryCard2 = () => {
  return (
    <section className="max-w-[1200px] mt-25 mx-auto w-full px-4 md:px-0">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3">
          <CategoryCardVariantB
            title="Clutches"            
            subtitle="Your super cool, stylish and eco- friendly companion."
            imageUrl="https://d2gansr34f2te0.cloudfront.net/image1.png"
            buttonText="SHOP NOW"
            height = {580}
            />
        </div>

        <div className="w-full md:w-2/3 grid grid-cols-2 gap-8">
          {collectionsA.map((item, idx) => (
            <CategoryCardVariantA
              key={idx}
              title={item.title}
              imageUrl={item.imageUrl}
              height={580}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryCard2;
