import React, { useEffect, useRef } from "react";

import cart_empty from "../assets/cart_empty.png";
import Layout from "../components/Layout";
import CartItemListing from "../components/cart/ListCartItems";
import CartDetails from "../components/cart/CartInfoDetails";

import useCartStore from "../store/cartStore";
import Spinner from "../components/Spinner";

const Cart = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const loading = useCartStore((state) => state.loading);
  let fetchLoader = useCartStore((state) => state.fetchLoader);
  const error = useCartStore((state) => state.error);
  const addAllItemsToCart = useCartStore((state) => state.addAllItemsToCart);
  const getCartItems = useCartStore((state) => state.getCartItems);

  useEffect(() => {
    addAllItemsToCart();
    getCartItems();
  }, []);

  // // Loading items
  if (fetchLoader)
    return (
      <div>
        <Spinner />
        <h1 className=" font-body text-gray-400 mt-1 text-center">
          Hang on, fetching cart
        </h1>
      </div>
    );

  // Error
  if (error && !loading)
    return (
      <h1 className=" font-bold text-red-400 text-lg py-5 lg:text-xl mt-1 text-center">
        Oops!! Somthing went wrong, please try later.
      </h1>
    );

  // Empty cart
  if (!error && !loading && !cartItems && !cartItems?.length === 0)
    return (
      <div className=" flex justify-center items-center">
        <img src={cart_empty} />
      </div>
    );

  return (
    <Layout>
      <div>
        <div className=" flex lg:flex-row flex-col justify-evenly">
          {cartItems?.length > 0 && <CartItemListing />}

          {cartItems?.length > 0 && <CartDetails />}
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
