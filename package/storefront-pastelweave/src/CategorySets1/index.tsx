import CategoryCardVariantB from 'react-cart/src/components/CategoryCard-VariantB';

const collectionsA = [
  {
    title: "",
    imageUrl: "https://d2gansr34f2te0.cloudfront.net/sarees/saree1.png",
    subtitle: "",
    buttonText: "MADHUBANI",
  },
  {
    title: "",
    imageUrl: "https://d2gansr34f2te0.cloudfront.net/image1.png",
    subtitle: "",
    buttonText: "WEAVING",
  },
];

const CategorySets1 = () => {
  return (
    <section className="max-w-[1200px] mt-25 mx-auto w-full px-4 md:px-0">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3">
          <CategoryCardVariantB
            title="New Arrivals"
            subtitle="Crafted with love"
            imageUrl="https://d2gansr34f2te0.cloudfront.net/image1.png"
            buttonText="Explore Now"
            height={580}
          />
        </div>

        {/* Right Column: Two Cards in Grid */}
        <div className="w-full md:w-2/3 grid grid-cols-2 gap-8">
          {collectionsA.map((item, idx) => (
            <CategoryCardVariantB
              key={idx}
              title={item.title}
              subtitle={item.subtitle}
              imageUrl={item.imageUrl}
              buttonText={item.buttonText}
              height={580}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySets1;
