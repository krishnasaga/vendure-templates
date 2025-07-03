// File: Header-VariantA/menu.tsx
import { useEffect, useRef } from "react";
import type { JSX } from "react";
import MenuContent from "./menu/MenuContent";

interface MegaMenuProps {
  section: string;
  onClose: () => void;
}

const MegaMenu = ({ section, onClose }: MegaMenuProps): JSX.Element => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className="absolute left-0 right-0 top-full bg-white z-40 h-[400px] px-10 pb-[2.2rem] max-w-[1200px] mx-auto overflow-y-auto overflow-x-hidden"
    >
      <button
        onClick={onClose}
        className="absolute top-0 right-2 text-gray-500 text-2xl hover:text-gray-700"
      >
        ×
      </button>
      <div className="text-sm mt-8">
        <MenuContent section={section} />
      </div>
    </div>
  );
};

export default MegaMenu;
