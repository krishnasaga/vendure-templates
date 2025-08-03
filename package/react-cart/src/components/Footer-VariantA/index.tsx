import React, { useState } from 'react';
import { FaFacebookF, FaInstagram, FaPinterestP, FaYoutube } from 'react-icons/fa';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md'; // <-- Add this import

const sections = [
  {
    key: 'explore',
    title: 'Explore',
    items: [
      'About us',
      'Partner onboarding',
      'News and events',
      'Work with us',
      'Bulk Order',
      'Return Order',
      'Blogs',
    ],
  },
  {
    key: 'help',
    title: 'Help',
    items: [
      'Privacy and terms of use',
      'Shipping and cancellation',
      'FAQ’s',
    ],
  },
  {
    key: 'connect',
    title: 'Connect with us',
    items: [
      'Contact us',
      '079-88888888',
      '+91 9999 000 000',
      'pastelcfe@pastel.org',
      'Store locator',
    ],
  },
  {
    key: 'categories',
    title: 'Categories',
    items: [
      'Apparel',
      'Home decor',
      'Accessories',
      'Gift and toys',
    ],
  },
];

const FooterVariantA = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const handleToggle = (key: string) => {
    setOpenSection(openSection === key ? null : key);
  };

  return (
    <footer className="bg-footer-gray text-secondary-900 text-sm font-light relative overflow-hidden mt-20" data-component="Footer-VariantA">
      {/* Top Section: Stay in Touch */}
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-center gap-6 px-4 md:px-10 pt-10 pb-8 text-white">
        <p className="font-semibold text-lg md:text-xl font-light text-center">Stay in touch with us</p>
        <div className="border border-dotted border-white p-1 w-full max-w-[270px]">
          <div className="bg-white px-4 py-2 flex items-center justify-between">
            <span className="text-base text-secondary-900 mx-auto font-semibold flex-1 text-center">
              SIGN UP
            </span>
            <span className="text-xl text-primary-900 pl-4">→</span>
          </div>
        </div>
      </div>

      {/* Torn White Background Section */}
      <div className="flex justify-center px-4 md:px-10">
        <div
          className="w-full max-w-[1200px] bg-no-repeat bg-center"
          style={{
            backgroundImage: "url('https://d2gansr34f2te0.cloudfront.net/footer_bg_page.png')",
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% 100%',
          }}
        >
          <div className="pt-10 pb-10 px-4 sm:px-6 md:px-12">
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
              {sections.map((section) => (
                <div
                  key={section.key}
                  className="border-b md:border-b-0 md:border-r border-dotted border-gray-700 pb-4 md:pb-0"
                >
                  {/* Mobile: clickable header with arrow */}
                  <button
                    className="w-full flex items-center justify-between md:hidden font-semibold text-base mb-3"
                    onClick={() => handleToggle(section.key)}
                  >
                    <span>{section.title}</span>
                    {openSection === section.key ? (
                      <MdArrowDropUp className="text-xl" />
                    ) : (
                      <MdArrowDropDown className="text-xl" />
                    )}
                  </button>
                  {/* Desktop: static header */}
                  <h4 className="hidden md:block text-base font-semibold mb-3">{section.title}</h4>
                  {/* Mobile: collapsible list */}
                  <ul
                    className={`space-y-2 md:block ${openSection === section.key ? 'block' : 'hidden'} md:!block`}
                  >
                    {section.items.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Images - hidden on mobile, visible on tablet and up */}
              <div className="hidden sm:flex sm:justify-start justify-center sm:flex-row flex-col items-center gap-4 pt-4 md:pt-16">
                <img
                  src="https://d2gansr34f2te0.cloudfront.net/sarees/saree1.png"
                  alt="Product 1"
                  className="w-[80px] h-[80px] object-cover"
                />
                <img
                  src="https://d2gansr34f2te0.cloudfront.net/sarees/saree1.png"
                  alt="Product 2"
                  className="w-[80px] h-[80px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center pt-6 pb-10 text-s text-white font-semibold gap-4 px-4">
        <div>2024 pastel.org | pastel is a non-profit Organisation.</div>
        <div>pastel products are certified by: Genuine Handmade Products</div>
        <div className="flex gap-6 text-base">
          <FaFacebookF />
          <FaInstagram />
          <FaPinterestP />
          <FaYoutube />
        </div>
      </div>
    </footer>
  );
};

export default FooterVariantA;
