import ProductCard2 from 'react-cart/src/components/ProductCard-VariantB';
import { Link } from 'react-router-dom';

const collections = [
  {
    title: "Samoolammmmmmm Kanchi Moti Rakhi (Set Of 2)",
    imageUrl: "https://d2gansr34f2te0.cloudfront.net/image1.png",
    price: 880.0,
    slug: "samoolam-kanchi-moti-rakhi"
  },
  {
    title: "Elegant Thread Rakhi",
    imageUrl: "https://d2gansr34f2te0.cloudfront.net/image1.png",
    price: 750.0,
    slug: "samoolam-kanchi-moti-rakhi"
  },
  {
    title: "Golden Beads Rakhi",
    imageUrl: "https://d2gansr34f2te0.cloudfront.net/sarees/saree1.png",
    price: 920.0,
    slug: "samoolam-kanchi-moti-rakhi"
  },
  {
    title: "Minimal Rakhi Thread",
    imageUrl: "https://d2gansr34f2te0.cloudfront.net/image1.png",
    price: 640.0,
    slug: "samoolam-kanchi-moti-rakhi"
  },
];

const ProductSection2 = () => {
  return (
    <section className="max-w-[1200px] mt-12 mx-auto w-full px-4 md:px-0">
      <h2 className="text-center text-[26px] font-semibold text-secondary-900 mb-2">
        Dresses for Every Curve
      </h2>
      <h4 className="text-center font-light text-[15px] text-secondary-800 mb-6">
        Over 500 Options
      </h4>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {collections.map((item, idx) => (
          <Link to={`/product/${item.slug}`} key={idx}>
            <ProductCard2
              title={item.title}
              imageUrl={item.imageUrl}
              price={item.price}
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ProductSection2;
