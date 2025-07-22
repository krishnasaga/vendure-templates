import ProductCard2 from 'react-cart/src/components/ProductCard-VariantB';

const collections = [
  {
    title: "Samoooooooooo Kanchi Moti Rakhi (Set Of 2)",
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

const YouMayLike = () => {
  return (
    <section className="max-w-[1200px] mt-12 mx-auto w-full px-4 md:px-0">
      <h2 className="text-center text-[26px] font-semibold text-secondary-900 mb-8">
        You may also like
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {collections.map((item, idx) => (
          <ProductCard2
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

export default YouMayLike;
