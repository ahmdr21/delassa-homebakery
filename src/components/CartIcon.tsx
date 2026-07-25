import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FiShoppingCart } from "react-icons/fi";

export default function CartIcon() {
  const navigate = useNavigate();
  const { totalItems, cart, cartOpen, setCartOpen } = useCart();

  return (
    <button
      type="button"
      onClick={() => {
        if (cart.length === 0) {
          navigate("/menu");
          return;
        }
        setCartOpen(!cartOpen);
      }}
      className={`relative flex items-center justify-center rounded-full px-4 py-2 transition-all duration-300 shadow-sm ${
        cartOpen
          ? "bg-[#c38358] text-white hover:bg-[#a96d45]"
          : "bg-white/90 text-[#3b2b26] hover:bg-white hover:text-[#c38358]"
      }`}
    >
      <FiShoppingCart className="text-[20px] transition-colors duration-300" />
      {totalItems > 0 && (
        <span
          className={`absolute -top-1 -right-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full px-1.5 text-[11px] font-bold transition-colors duration-300 ${
            cartOpen ? "bg-white text-[#c38358]" : "bg-[#c38358] text-white"
          }`}
        >
          {totalItems}
        </span>
      )}
    </button>
  );
}
