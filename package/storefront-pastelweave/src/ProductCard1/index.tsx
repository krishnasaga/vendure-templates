import ProductCard from 'react-cart/src/components/ProductCard-VariantA';

const collections = [
  {
    title: "Samoolam Kanchi Moti Rakhi (Set Of 2)",
    imageUrl: "https://d2gansr34f2te0.cloudfront.net/image1.png",
    price: 880.0,
  },
  {
    title: "Elegant Thread Rakhi",
    imageUrl: "https://d2gansr34f2te0.cloudfront.net/image1.png",
    price: 750.0,
  },
  {
    title: "Golden Beads Rakhi",
    imageUrl: "https://d2gansr34f2te0.cloudfront.net/sarees/saree1.png",
    price: 920.0,
  },
  {
    title: "Minimal Rakhi Thread",
    imageUrl: "https://d2gansr34f2te0.cloudfront.net/image1.png",
    price: 640.0,
  },
];

const ProductSection1 = () => {
  return (
    <section className="max-w-[1200px] mt-12 mx-auto w-full px-4 md:px-0">
      <h2 className="text-center text-[26px] font-semibold text-secondary-900 mb-2">
        Handcrafted Rakhis
      </h2>
      <h4 className="text-center font-light text-[15px] text-secondary-800 mb-6">
        View Rakhis
      </h4>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {collections.map((item, idx) => (
          <ProductCard
            key={idx}
            title={item.title}
            imageUrl={item.imageUrl}
            price={item.price}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductSection1;
