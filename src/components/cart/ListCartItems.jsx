import React, { useEffect } from "react";

import useCartStore from "../../store/cartStore.js";

import CartItemInfo from "./CartItemInfoCard.jsx";

const ListCartItems = () => {
  const getCartItems = useCartStore((state) => state.getCartItems);
  const cartItems = useCartStore((state) => state.cartItems);

  // Fetch cart items
  useEffect(() => {
    // getCartItems();
  }, []);

  return (
    <div>
      {cartItems?.map((cartItem) => (
        <CartItemInfo
          key={cartItem?._id || cartItem?.product_id}
          {...cartItem}
        />
      ))}
    </div>
  );
};

export default ListCartItems;
