import CategoryCardVariantA from 'react-cart/src/components/CategoryCard-VariantA';

const collections = [
  {
    title: "Kurtas",
    imageUrl: "https://d2gansr34f2te0.cloudfront.net/image1.png",
  },
  {
    title: "Dresses",
    imageUrl: "https://d2gansr34f2te0.cloudfront.net/image1.png",
  },
  {
    title: "Sarees",
    imageUrl: "https://d2gansr34f2te0.cloudfront.net/sarees/saree1.png",
  },
  {
    title: "Jewellery",
    imageUrl: "https://d2gansr34f2te0.cloudfront.net/image1.png",
  },
  {
    title: "Tops",
    imageUrl: "https://d2gansr34f2te0.cloudfront.net/image1.png",
  },
  {
    title: "Dupattas",
    imageUrl: "https://d2gansr34f2te0.cloudfront.net/image1.png",
  },
];

const CategorySection = () => {
  return (
    <section className="max-w-[1200px] mt-10 mx-auto w-full px-4 md:px-0">
      <h2 className="text-center text-[26px] font-light font-semibold text-secondary-900 mb-10">
        Collections
      </h2>

      <div className="relative overflow-x-auto hide-scrollbar">
        <div className="flex w-[calc(250px*6)] gap-6">
          {collections.map((item, idx) => (
            <div key={idx} className="w-[250px] flex-shrink-0">
              <CategoryCardVariantA
                title={item.title}
                imageUrl={item.imageUrl}
                height={415}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
