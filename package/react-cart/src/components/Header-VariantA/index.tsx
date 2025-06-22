
const HeaderVariantA = () => {
    return <div className="w-full"><header className="px-6 py-3 flex justify-between items-center border-b border-gray-200">
  <div className="flex flex-col items-start">
    <div className="flex items-center space-x-2">
      <h1 className="text-2xl tracking-widest font-light">Logo</h1>
    </div>
    <p className="text-xs tracking-wide text-gray-600 mt-1 border-t border-gray-400 pt-1">
      WORK | ARTISTIC | STYLISH | ETHICAL | SUSTAINABLE
    </p>
  </div>
  <div className="flex flex-col items-end space-y-1">
    <p className="text-sm text-gray-600 flex items-center space-x-1">
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 5h2l3.6 7.59-1.35 2.44A1 1 0 008 17h12M16 5l-4 0m0 0l-4 0m4 0v12" />
      </svg>
      <span>079-99999999 / +91 99999999999</span>
    </p>

    <div className="flex space-x-4 text-gray-700 text-xl">
      <button aria-label="Search"><i className="fas fa-search"></i></button>
      <button aria-label="User"><i className="fas fa-user"></i></button>
      <button aria-label="Wishlist"><i className="fas fa-heart"></i></button>
      <button aria-label="Cart"><i className="fas fa-shopping-bag"></i></button>
    </div>
  </div>


</header>
  {/* Uncomment the following line to add a search input field */}
<nav className="w-full border-b border-gray-200 bg-white">
  <ul className="flex justify-between space-x-8 py-3 text-sm font-medium text-gray-700">
    <li className="group relative">
      <button className="flex items-center space-x-1">
        <span>Apparel</span>
        <svg className="w-3 h-3 group-hover:rotate-180 transition-transform" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.065l3.71-3.835a.75.75 0 111.08 1.04l-4.25 4.4a.75.75 0 01-1.08 0l-4.25-4.4a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
        </svg>
      </button>
    </li>
    <li className="group relative">
      <button className="flex items-center space-x-1">
        <span>Sarees</span>
        <svg className="w-3 h-3 group-hover:rotate-180 transition-transform" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.065l3.71-3.835a.75.75 0 111.08 1.04l-4.25 4.4a.75.75 0 01-1.08 0l-4.25-4.4a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
        </svg>
      </button>
    </li>
    <li className="group relative">
      <button className="flex items-center space-x-1">
        <span>Home</span>
        <svg className="w-3 h-3 group-hover:rotate-180 transition-transform" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.065l3.71-3.835a.75.75 0 111.08 1.04l-4.25 4.4a.75.75 0 01-1.08 0l-4.25-4.4a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
        </svg>
      </button>
    </li>
    <li className="group relative">
      <button className="flex items-center space-x-1">
        <span>New</span>
        <svg className="w-3 h-3 group-hover:rotate-180 transition-transform" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.065l3.71-3.835a.75.75 0 111.08 1.04l-4.25 4.4a.75.75 0 01-1.08 0l-4.25-4.4a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
        </svg>
      </button>
    </li>
    <li className="group relative">
      <button className="flex items-center space-x-1">
        <span>Accessories</span>
        <svg className="w-3 h-3 group-hover:rotate-180 transition-transform" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.065l3.71-3.835a.75.75 0 111.08 1.04l-4.25 4.4a.75.75 0 01-1.08 0l-4.25-4.4a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
        </svg>
      </button>
    </li>
    <li className="group relative">
      <button className="flex items-center space-x-1">
        <span>Artisans</span>
        <svg className="w-3 h-3 group-hover:rotate-180 transition-transform" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.065l3.71-3.835a.75.75 0 111.08 1.04l-4.25 4.4a.75.75 0 01-1.08 0l-4.25-4.4a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
        </svg>
      </button>
    </li>
    <li className="group relative">
      <button className="flex items-center space-x-1">
        <span>Gift and Toys</span>
        <svg className="w-3 h-3 group-hover:rotate-180 transition-transform" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.065l3.71-3.835a.75.75 0 111.08 1.04l-4.25 4.4a.75.75 0 01-1.08 0l-4.25-4.4a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
        </svg>
      </button>
    </li>
    <li className="group relative">
      <button className="flex items-center space-x-1 text-red-600">
        <span>Sale</span>
        <svg className="w-3 h-3 group-hover:rotate-180 transition-transform" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.065l3.71-3.835a.75.75 0 111.08 1.04l-4.25 4.4a.75.75 0 01-1.08 0l-4.25-4.4a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
        </svg>
      </button>
    </li>
  </ul>
</nav>

</div>
};

export default HeaderVariantA;
