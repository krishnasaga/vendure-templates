import type { JSX } from "react";
import ProductCard from "./ProductCard";
import {
  apparelCategories,
  apparelProductCards,
  sareesCategories,
  sareesProductCards,
  homeCategories,
  homeProductCards,
  newCategories,
  newProductCards,
  accessoriesCategories,
  accessoriesProductCards,
  accessoriesPriceLinks,
  artisanGroups,
  artisanProductCards,
  toysCategories,
  toysProductCards
} from "./data";


const MenuContent = ({ section }: { section: string }): JSX.Element => {
  const contentMap: Record<string, JSX.Element> = {
    Apparel: (
      <ul className="grid grid-cols-6 gap-y-[2.4rem] gap-x-[2rem] list-none text-secondary-900 leading-[26px]">
        {apparelCategories.map((category, index) => (
          <li key={index}>
            <h4 className="text-[16px] font-semibold text-secondary-900 cursor-pointer mb-2">{category.heading}</h4>
            <ul className="text-[14px]">
              {category.items.map((item, idx) => (
                <li key={idx} className="hover:font-semibold cursor-pointer text-secondary-900">{item}</li>
              ))}
            </ul>
          </li>
        ))}
        {apparelProductCards.map((card, idx) => (
          <li key={`card-${idx}`} className="col-span-1">
            <ProductCard {...card} />
          </li>
        ))}
      </ul>
    ),

    Sarees: (
      <ul className="grid grid-cols-6 gap-y-[2.4rem] gap-x-[2rem] list-none text-secondary-900 leading-[26px]">
        {sareesCategories.map((category, index) => (
          <li key={index}>
            <h4 className="text-[16px] font-semibold text-secondary-900 cursor-pointer mb-2">{category.heading}</h4>
            <ul className="text-[14px]">
              {category.items.map((item, idx) => (
                <li key={idx} className="hover:font-semibold cursor-pointer text-secondary-900">{item}</li>
              ))}
            </ul>
          </li>
        ))}
        {sareesProductCards.map((card, idx) => (
          <li key={`saree-card-${idx}`} className="col-span-1">
            <ProductCard {...card} />
          </li>
        ))}
      </ul>
    ),

    Home: (
      <ul className="grid grid-cols-6 gap-y-[2.4rem] gap-x-[2rem] list-none text-secondary-900 leading-[26px]">
        <li>
          {homeCategories
            .filter((c) => c.heading === "Home Decor" || c.heading === "Collections")
            .map((category, index) => (
              <div key={index} className="mb-2">
                <h4 className="text-[16px] font-semibold text-secondary-900 cursor-pointer mb-2">{category.heading}</h4>
                <ul className="text-[14px]">
                  {category.items.map((item, idx) => (
                    <li key={idx} className="hover:font-semibold cursor-pointer text-secondary-900">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
        </li>
        {homeCategories
          .filter((c) => c.heading !== "Home Decor" && c.heading !== "Collections")
          .map((category, index) => (
            <li key={index}>
              <h4 className="text-[16px] font-semibold text-secondary-900 cursor-pointer mb-2">{category.heading}</h4>
              <ul className="text-[14px]">
                {category.items.map((item, idx) => (
                  <li key={idx} className="hover:font-semibold cursor-pointer text-secondary-900">{item}</li>
                ))}
              </ul>
            </li>
          ))}
        {homeProductCards.map((card, idx) => (
          <li key={`home-card-${idx}`} className="col-span-1">
            <ProductCard {...card} />
          </li>
        ))}
      </ul>
    ),

    New: (
      <ul className="grid grid-cols-6 gap-y-[2.4rem] gap-x-[2rem] list-none text-secondary-900 leading-[26px]">
        {newCategories.map((category, index) => (
          <li key={index}>
            <h4 className="text-[16px] font-semibold text-secondary-900 cursor-pointer mb-2">{category.heading}</h4>
            <ul className="text-[14px]">
              {category.items.map((item, idx) => (
                <li key={idx} className="hover:font-semibold cursor-pointer text-secondary-900">{item}</li>
              ))}
            </ul>
          </li>
        ))}
        {newProductCards.map((card, idx) => (
          <li key={`new-card-${idx}`} className="col-span-1">
            <ProductCard {...card} />
          </li>
        ))}
      </ul>
    ),

    Accessories: (
      <ul className="grid grid-cols-6 gap-y-[2.4rem] gap-x-[2rem] list-none text-secondary-900 leading-[26px]">
        <li className="col-span-1">
          {accessoriesCategories.filter(c => c.heading === "Fashion Jewellery" || c.heading === "Bags").map((category, index) => (
            <div key={index} className="mb-4">
              <h4 className="text-[16px] font-semibold text-secondary-900 cursor-pointer mb-2">{category.heading}</h4>
              <ul className="text-[14px]">
                {category.items.map((item, idx) => (
                  <li key={idx} className="hover:font-semibold cursor-pointer text-secondary-900">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </li>
        <li className="col-span-1">
          {accessoriesCategories.filter(c => c.heading === "Silver Jewellery" || c.heading === "Collections").map((category, index) => (
            <div key={index} className="mb-4">
              <h4 className="text-[16px] font-semibold text-secondary-900 cursor-pointer mb-2">{category.heading}</h4>
              <ul className="text-[14px]">
                {category.items.map((item, idx) => (
                  <li key={idx} className="hover:font-semibold cursor-pointer text-secondary-900">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </li>
        <li className="col-span-1">
          {accessoriesCategories.filter(c => c.heading === "Other Accessories").map((category, index) => (
            <div key={index}>
              <h4 className="text-[16px] font-semibold text-secondary-900 cursor-pointer mb-2">{category.heading}</h4>
              <ul className="text-[14px]">
                {category.items.map((item, idx) => (
                  <li key={idx} className="hover:font-semibold cursor-pointer text-secondary-900">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </li>
        <ul className="text-[14px]">
          {accessoriesPriceLinks.map((item, idx) => (
            <li key={`price-${idx}`} className="text-[16px] font-semibold cursor-pointer text-secondary-900">{item}</li>
          ))}
        </ul>
        {accessoriesProductCards.map((card, idx) => (
          <li key={`card-${idx}`} className="col-span-1">
            <ProductCard {...card} />
          </li>
        ))}
      </ul>
    ),

   Artisans: (
  <div className="grid grid-cols-6 gap-x-[2rem] gap-y-[2.4rem] text-secondary-900 leading-[26px]">
    {artisanGroups.map((group, colIdx) => (
      <div key={colIdx} className="text-[14px] space-y-[1rem]">
        {group.map((category, idx) => (
          <div key={idx}>
            <h4 className="text-[16px] font-semibold text-secondary-900 cursor-pointer mb-2">
              {category.heading}
            </h4>
            <ul className="space-y-[6px]">
              {category.items.map((item, itemIdx) => (
                <li
                  key={itemIdx}
                  className="hover:font-semibold cursor-pointer text-secondary-900"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    ))}
    
    {/* Product cards should also be wrapped properly */}
    {artisanProductCards.map((card, idx) => (
      <div key={idx} className="col-span-1">
        <ProductCard {...card} />
      </div>
    ))}
  </div>
),


    Gift_and_Toys: (
      <ul className="grid grid-cols-6 gap-y-[2.4rem] gap-x-[2rem] list-none text-secondary-900 leading-[26px]">
        {toysCategories.map((category, index) => (
          <li key={index}>
            <h4 className="text-[16px] font-semibold text-secondary-900 cursor-pointer mb-2">{category.heading}</h4>
            <ul className="text-[14px]">
              {category.items.map((item, idx) => (
                <li key={idx} className="hover:font-semibold cursor-pointer text-secondary-900">{item}</li>
              ))}
            </ul>
          </li>
        ))}
        {toysProductCards.map((card, idx) => (
          <li key={`toy-card-${idx}`} className="col-span-1">
            <ProductCard {...card} />
          </li>
        ))}
      </ul>
    )
  };

  return contentMap[section] || <p>No content for {section}</p>;
};

export default MenuContent;
