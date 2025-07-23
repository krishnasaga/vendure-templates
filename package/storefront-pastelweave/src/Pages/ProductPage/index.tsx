import Footer from 'react-cart/src/components/Footer-VariantA';
import RecentlyViewed from '../../recentlyViewed';
import YouMayLike from '../../youMayAlsoLike';
import CustomerReviewsSection from '../../CustomerReview';
import { useEffect, useRef, useState } from 'react';
import Header from 'react-cart/src/components/Header-VariantA';
import { TopStrip } from 'react-cart/src/components/PromotionStript-VariantA';
import {
  FaPlus, FaMinus, FaHeart, FaShareAlt, FaChevronDown,
  FaListUl, FaShippingFast, FaGift, FaUndoAlt, FaTruckMoving,
  FaInfoCircle, FaHandsWash
} from 'react-icons/fa';


const mainImages = [
  'https://d2gansr34f2te0.cloudfront.net/sarees/saree1.png',
  'https://d2gansr34f2te0.cloudfront.net/sarees/saree2.png',
];
const banner = 'https://d2gansr34f2te0.cloudfront.net/happyhands.png';
const extraImages = [
  'https://d2gansr34f2te0.cloudfront.net/sarees/saree3.png',
  'https://d2gansr34f2te0.cloudfront.net/sarees/saree4.png',
  'https://d2gansr34f2te0.cloudfront.net/sarees/saree4.png',
];

const sections = [
  { title: 'Description', icon: <FaListUl className="text-secondary-900 text-[16px]" /> },
  { title: 'Wash Care', icon: <FaHandsWash className="text-secondary-900 text-[16px]" /> },
  { title: 'Shipping', icon: <FaShippingFast className="text-secondary-900 text-[16px]" /> },
  { title: 'Gift Wrap Available', icon: <FaGift className="text-secondary-900 text-[16px]" /> },
  { title: '30 Days Free Return', icon: <FaUndoAlt className="text-secondary-900 text-[16px]" /> },
  { title: 'Estimated Delivery Time', icon: <FaTruckMoving className="text-secondary-900 text-[16px]" /> },
  { title: 'Colors', icon: <FaHeart className="text-secondary-900 text-[16px]" /> },
  { title: 'Additional Information', icon: <FaInfoCircle className="text-secondary-900 text-[16px]" /> },
];

type AccordionSectionProps = {
  title: string;
  icon: React.ReactNode;
};

const AccordionSection = ({ title, icon }: AccordionSectionProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-secondary-900 text-secondary-900">
      <button
        onClick={() => setOpen(!open)}
        className="w-full py-3 flex justify-between items-center font-semibold text-[16px]"
      >
        <div className="flex items-center gap-3">
          {icon}
          <span>{title}</span>
        </div>
        <FaChevronDown
          className={`transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          } text-[14px]`}
        />
      </button>
      {open && (
        <div className="pb-4 pl-8 pr-2 text-sm text-gray-600">
          {title}  Details
        </div>
      )}
    </div>
  );
};


const ProductPage = () => {
  const [qty, setQty] = useState(1);
  const [stickyRight, setStickyRight] = useState(false);
  const [showFooterBar, setShowFooterBar] = useState(false);

  const titleRef = useRef<HTMLHeadingElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);
  const leftSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const titleTop = titleRef.current?.getBoundingClientRect().top ?? 0;
      const accTop = accordionRef.current?.getBoundingClientRect().top ?? 0;
      const leftBottom = leftSectionRef.current?.getBoundingClientRect().bottom ?? 0;

      setStickyRight(titleTop <= 0 && leftBottom > 200);
const titleBottom = titleRef.current?.getBoundingClientRect().bottom ?? 0;
      if (accTop <= window.innerHeight * 0.7) {
  setShowFooterBar(true);
}

// Hide footer when title (top section) comes back into view
if (titleBottom >= 0) {
  setShowFooterBar(false);
}

    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full min-h-screen bg-white text-[#222]">
      <div className="sticky top-0 z-[60] bg-white border-b border-gray-200">
        <TopStrip />
        <div className="container mx-auto">
          <Header />
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto py-2 grid grid-cols-1 md:grid-cols-[4fr_3fr] gap-8">
        <div ref={leftSectionRef} className="flex flex-col gap-2">
          <div className='text-[10px] text-secondary-900'>Home | Sarees | GC 'Alpana' Handwoven Hand Batik Pure Silk with SilkMark Saree</div>
          <div className="grid grid-cols-2 gap-2">
            {mainImages.map((img, idx) => (
              <img key={idx} src={img} alt='' className="w-[340px] h-[500px] object-cover" />
            ))}
          </div>
          <div className="flex justify-center">
            <img src={banner} alt='happy' className="w-[620px] h-auto" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {extraImages.map((img, idx) => (
              <img key={idx} src={img} alt='' className="w-[340px] h-[500px] object-cover" />
            ))}
          </div>
        </div>

        <div ref={rightPanelRef} className={`mt-8 ml-8 ${stickyRight ? 'sticky top-0 self-start' : ''}`}>
          <h1 ref={titleRef} className="text-lg text-secondary-900 font-semibold mb-2">
            GC 'Ocean' Handwoven Hand Batik Pure Silk With Silkmark Saree
          </h1>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">View more from this artisan</p>
            <div className="my-2 flex gap-3 text-gray-500 cursor-pointer">
              <FaHeart className="hover:text-red-500" />
              <FaShareAlt className="hover:text-gray-700" />
            </div>
          </div>
          <hr className="border-gray-300 my-4" />

          <div className="flex items-center gap-3 mt-2">
            <span className="line-through text-gray-400 text-sm">₹9,450.00</span>
            <span className="text-[18px] text-[#222]">₹7,605.00</span>
          </div>
          <span className="text-[11px] text-gray-400 mt-[-4px] block">(Inclusive of all taxes)</span>

          <div className="flex items-center gap-4 mt-6 mb-10">
            <span className="text-sm">Quantity</span>
            <div className="flex items-center border rounded px-4 py-[6px] gap-4 text-[14px] min-w-[150px] justify-between">
              <button onClick={() => setQty(qty > 1 ? qty - 1 : 1)}><FaMinus size={12} /></button>
              <span>{qty}</span>
              <button onClick={() => setQty(qty + 1)}><FaPlus size={12} /></button>
            </div>
          </div>

          {!showFooterBar && (
            <div className="flex gap-3 mt-8 mb-4">
              <button className="bg-primary-900 text-white font-semibold px-6 py-2 rounded w-1/2 hover:brightness-110">ADD TO CART</button>
              <button className="bg-primary-900 text-white font-semibold px-6 py-2 rounded w-1/2 hover:brightness-110">BUY NOW</button>
            </div>
          )}

          <div ref={accordionRef} className="border-t text-secondary-900 text-lg my-2">
            {sections.map((section, idx) => (
              <AccordionSection key={idx} title={section.title} icon={section.icon} />
            ))}
          </div>
        </div>
      </div>

      <CustomerReviewsSection />
      <hr className="max-w-[1200px] mx-auto border-gray-300 my-16" />
      <YouMayLike />
      <RecentlyViewed />
      
      <div className="mx-auto">
        <Footer />
      </div>

      {showFooterBar && (
        <div className="fixed bottom-0 left-0 right-0 bg-white px-4 py-4 z-50 shadow-[0_-8px_20px_-5px_rgba(0,0,0,0.1)]">
          <div className="px-16 max-w-[1200px] mx-auto flex justify-between items-center">

            <div className="w-1/3">
              <span className="text-lg font-semibold">GC 'Ocean' Handwoven Hand Batik Pure Silk With ...</span>
            </div>

            <div className="w-1/3 flex flex-col items-center">
              <div className="flex items-baseline gap-2">
                <del className="text-gray-500 text-sm">₹8,450.00</del>
                <span className="text-lg text-[#222] font-bold">₹7,605.00</span>
              </div>
              <span className="text-xs text-gray-600">(Inclusive of all taxes)</span>
            </div>

            <div className="w-1/3 flex justify-end">
              <div className="flex gap-3 w-[300px]">
                <button className="bg-primary-900 text-white font-semibold px-4 py-2 w-1/2">ADD TO CART</button>
                <button className="bg-primary-900 text-white font-semibold px-4 py-2 w-1/2">BUY NOW</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
