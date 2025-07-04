const values = [
  {
    image: "https://d2gansr34f2te0.cloudfront.net/usp1.avif   ",
    title: "Femme Forward",
  },
  {
    image: "https://d2gansr34f2te0.cloudfront.net/Circular.webp   ",
    title: "Restyle",
  },
  {
    image: "https://d2gansr34f2te0.cloudfront.net/Sustainable.avif   ",
    title: "Earth Kind",
  },
  {
    image: "https://d2gansr34f2te0.cloudfront.net/Heirloom%20Crafts.avif   ",
    title: "Crafted",
  },
  {
    image: "https://d2gansr34f2te0.cloudfront.net/Easy%20Returns.avif   ",
    title: "Free Returns",
  },
];

const ValuesSection = ({ className }: { className: string }) => {
  return (
    <section className={`container mx-auto flex justify-between md:justify-center gap-4 md:gap-14 ${className}`}>
      {values.map((value, index) => (
        <div className=" md:h-[100px] w-auto flex flex-col items-center justify-between">
          <img
            key={index}
            src={value.image}
            alt={value.title}
            className="w-14 h-14 md:w-16 md:h-16 md:w-20 md:h-20 object-contain mb-2"
          />
          <h4
            className={
              "text-[10px] md:text-sm font-medium leading-tight text-center"
            }
          >
            {value.title}
          </h4>
        </div>
      ))}
    </section>
  );
};

export default ValuesSection;
