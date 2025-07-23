const StarIcon = () => (
  <svg
    className="w-3 h-3 text-orange-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
    ></path>
  </svg>
);


const CustomerReviewsSection = () => {
  return (
    <div className="max-w-[1200px] mx-auto mt-16 mb-24">
      <div className="flex justify-between items-center">
        
        {/* Left Side: Title and Review Prompt */}
        <div>
          <h2 className="text-2xl font-semibold text-secondary-900 font-light mb-3">
            Customer Reviews
          </h2>
          <div className="flex items-center gap-3">
            <div className="flex">
              {/* Creates 5 empty stars */}
              {Array.from({ length: 5 }).map((_, index) => (
                <StarIcon key={index} />
              ))}
            </div>
            <span className="text-[12px] text-gray-600">
              Be the first to write a review
            </span>
          </div>
        </div>

        {/* Right Side: Action Buttons */}
        <div className="flex items-center gap-4">
          <button className="border border-gray-400 text-secondary-900 font-semibold text-xs tracking-widest px-6 py-3 hover:bg-primary-900 hover:text-white transition-colors">
            WRITE A REVIEW
          </button>
          <button className="border border-gray-400 text-secondary-900 font-semibold text-xs tracking-widest px-6 py-3 hover:bg-primary-900 hover:text-white transition-colors">
            ASK A QUESTION
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerReviewsSection;