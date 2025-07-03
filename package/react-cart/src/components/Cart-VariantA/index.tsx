import { VscClose } from "react-icons/vsc";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      {/* Drawer */}
      <div className="absolute right-0 top-0 h-full w-full sm:w-[400px] bg-white shadow-lg z-[101] pointer-events-auto px-6 py-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-700 text-xl"
        >
          <VscClose />
        </button>

        {/* Content */}
        <div className="h-full flex flex-col justify-center items-center text-center">
          <h2 className="text-[22px] font-medium text-[#606060] mb-6">
            Your cart is empty
          </h2>

          <button className="bg-black text-white text-[13px] font-semibold uppercase tracking-wide px-8 py-[10px] mb-10">
            Keep Shopping
          </button>

          <div className="text-[14px] text-[#606060]">
            <p className="mb-[2px]">Have an account?</p>
            <span>
              <a href="/login" className="underline font-medium text-[#202020]">
                Log in
              </a>{' '}
              to check out faster.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
