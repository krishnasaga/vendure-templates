import type { JSX } from "react";

interface MegaMenuProps {
  section: string;
  onClose: () => void;
}

const MegaMenu = ({ section, onClose }: MegaMenuProps) => {
  const contentMap: Record<string, JSX.Element> = {
    Apparel: (
      <>
        <div>
          <h4 className="font-semibold mb-2">Women</h4>
          <ul className="space-y-1">
            <li>All Apparel</li>
            <li>New Arrivals</li>
            <li>Dresses & Jumpsuits</li>
            <li>Kurtas & Sets</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Men</h4>
          <ul className="space-y-1">
            <li>Kurtas</li>
            <li>Ties</li>
            <li>Shirts</li>
          </ul>
        </div>
        <div>
          <img src="https://via.placeholder.com/100x140" alt="Item" />
          <p className="text-sm mt-1">Tops</p>
        </div>
      </>
    ),
    Sarees: (
      <>
        <div>
          <h4 className="font-semibold mb-2">Styles</h4>
          <ul className="space-y-1">
            <li>Ajrakh Sarees</li>
            <li>Handloom Sarees</li>
          </ul>
        </div>
        <div>
          <img src="https://via.placeholder.com/100x140" alt="Saree" />
          <p className="text-sm mt-1">Elegant Styles</p>
        </div>
      </>
    ),
    // Add more sections as needed...
  };

  return (
    <div className="absolute left-0 right-0 top-full bg-white shadow-xl z-40 py-8 px-12 max-w-[1440px] mx-auto">
      <div className="flex justify-end mb-3">
        <button onClick={onClose} className="text-gray-500 text-xl">×</button>
      </div>
      <div className="grid grid-cols-3 gap-8 text-sm text-gray-800">
        {contentMap[section] || <p>No content for {section}</p>}
      </div>
    </div>
  );
};

export default MegaMenu;
