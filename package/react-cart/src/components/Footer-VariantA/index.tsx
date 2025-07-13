import { FaFacebookF, FaInstagram, FaPinterestP, FaYoutube } from 'react-icons/fa';

const FooterVariantA = () => {
  return (
    <footer className="bg-footer-gray text-secondary-900 text-sm font-light relative overflow-hidden mt-20">
      {/* Top Section: Stay in Touch */}
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-center gap-6 px-4 md:px-10 pt-10 pb-8 text-white">
        <p className="font-semibold text-lg md:text-xl font-light">Stay in touch with us</p>
        <div className="border border-dotted border-white p-1 max-w-[270px] w-full">
          <div className="bg-white px-4 py-2 w-full flex items-center justify-between">
            <span className="text-base text-secondary-900 mx-auto font-semibold flex-1 text-center">
              SIGN UP
            </span>
            <span className="text-xl text-primary-900 pl-4">
              →
            </span>
          </div>
        </div>
      </div>

      {/* Torn White Background Section */}
      <div className="flex justify-center px-4 md:px-10">
        <div
          className="w-full max-w-[1200px] min-h-[320px] bg-no-repeat bg-center"
          style={{
            backgroundImage:
              "url('https://d2gansr34f2te0.cloudfront.net/footer_bg_page.png')",
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% 100%',
          }}
        >
          <div className="pt-20 pb-10 px-6 md:px-12">
            <div className="grid grid-cols-5 gap-8 gap-12">
              {/* Explore */}
              <div className="border-r border-dotted border-gray-700">
                <h4 className="text-base font-semibold mb-3">Explore</h4>
                <ul className="space-y-2">
                  <li>About us</li>
                  <li>Partner onboarding</li>
                  <li>News and events</li>
                  <li>Work with us</li>
                  <li>Bulk Order</li>
                  <li>Return Order</li>
                  <li>Blogs</li>
                </ul>
              </div>

              {/* Help */}
              <div className="border-r border-dotted border-gray-700">
                <h4 className="text-base font-semibold mb-3">Help</h4>
                <ul className="space-y-2">
                  <li>Privacy and terms of use</li>
                  <li>Shipping and cancellation</li>
                  <li>FAQ’s</li>
                </ul>
              </div>

              {/* Connect */}
              <div className="border-r border-dotted border-gray-700">
                <h4 className="text-base font-semibold mb-3">Connect with us</h4>
                <ul className="space-y-2">
                  <li>Contact us</li>
                  <li>079-88888888</li>
                  <li>+91 9999 000 000</li>
                  <li>pastelcfe@pastel.org</li>
                  <li>Store locator</li>
                </ul>
              </div>

              {/* Categories */}
              <div>
                <h4 className="text-base font-semibold mb-3">Categories</h4>
                <ul className="space-y-2">
                  <li>Apparel</li>
                  <li>Home decor</li>
                  <li>Accessories</li>
                  <li>Gift and toys</li>
                </ul>
              </div>

              {/* Images Section */}
              <div className="flex gap-6 pt-16">
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

      {/* Footer Bottom Outside Torn Area */}
      <div className="max-w-[1200px] mx-auto flex flex-row justify-between items-center pt-6 pb-10 text-s text-white font-semibold gap-4">
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