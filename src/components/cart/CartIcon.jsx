import React from "react";
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

import useCartStore from "../../store/cartStore";

const CartIcon = () => {
  const navigate = useNavigate();
  const cartItems = useCartStore((state) => state.cartItems);

  const handleCartClick = () => {
    navigate("/cart");
  };

  return (
    <div
      onClick={handleCartClick}
      className=" hover:cursor-pointer hover:border border-black"
    >
      <div className=" relative">
        <PiShoppingCartSimpleFill size={40} />
        {cartItems?.length > 0 && (
          <p className=" absolute top-2 font-bold text-white left-4 text-sm rounded-full px-[2px] bg-red-600">
            {cartItems?.length === 1 ||
              (cartItems?.length <= 9 && <strong>0</strong>)}
            {cartItems?.length}
          </p>
        )}
      </div>
    </div>
  );
};

export default CartIcon;
