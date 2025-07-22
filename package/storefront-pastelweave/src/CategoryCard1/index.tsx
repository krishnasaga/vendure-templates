import Slider from "react-slick";
import CategoryCardVariantA from "react-cart/src/components/CategoryCard-VariantA";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const collections = [
  { title: "Kurtas", imageUrl: "https://d2gansr34f2te0.cloudfront.net/image1.png" },
  { title: "Dresses", imageUrl: "https://d2gansr34f2te0.cloudfront.net/image1.png" },
  { title: "Sarees", imageUrl: "https://d2gansr34f2te0.cloudfront.net/sarees/saree1.png" },
  { title: "Jewellery", imageUrl: "https://d2gansr34f2te0.cloudfront.net/image1.png" },
  { title: "Tops", imageUrl: "https://d2gansr34f2te0.cloudfront.net/image1.png" },
  { title: "Dupattas", imageUrl: "https://d2gansr34f2te0.cloudfront.net/image1.png" },
];

const CategorySection = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, 
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="w-full mt-10 px-4 flex justify-center">
      <div className="w-[1200px]">
        <h2 className="text-center text-[26px] font-semibold text-secondary-900 mb-10">
          Collections
        </h2>

        <Slider {...settings}>
          {collections.map((item, idx) => (
            <div key={`${item.title}-${idx}`} className="px-3">
              <CategoryCardVariantA
                title={item.title}
                imageUrl={item.imageUrl}
                height={415}
              />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default CategorySection;
