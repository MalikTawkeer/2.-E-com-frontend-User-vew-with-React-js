import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdRemove } from "react-icons/md";
import { MdAdd } from "react-icons/md";

import Spinner from "./Spinner.jsx";

import calculateDisPrice from "../utils/calculate.discounted.price.js";
import DiscountIcon from "../assets/DiscountIcon.jsx";

import useCartStore from "../store/cartStore.js";
import useAuthStore from "../store/authStore.js";

const Card = ({
  _id,
  name,
  price,
  discount,
  description,
  product_images = [{}],
  stock,
}) => {
  const navigate = useNavigate();

  const token = useAuthStore((state) => state.token);

  const cartItems = useCartStore((state) => state.cartItems);
  const addItemToCart = useCartStore((state) => state.addItemToCart);
  const getCartItems = useCartStore((state) => state.getCartItems);
  const removeItemFromCart = useCartStore((state) => state.removeItemFromCart);
  const loading = useCartStore((state) => state.loading);
  const error = useCartStore((state) => state.error);

  // Local loading states
  const [isAdding, setIsAdding] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  // Check item alredy exists into a cart
  const [alredyExists, setExists] = useState(
    cartItems?.some((item) =>
      token ? item?.product_id?._id === _id : item?.product_id === _id
    )
  );

  const [cartId, setCartId] = useState(null);

  // Check item is in cart or not
  useEffect(() => {
    let existingItem = [];

    if (token)
      existingItem = cartItems?.find((item) => item?.product_id?._id === _id);

    if (!token)
      existingItem = cartItems?.find((item) => item?.product_id === _id);

    if (existingItem)
      setCartId(token ? existingItem?._id : existingItem?.product_id);
  }, []);

  // Add item to cart
  const handleAddToCartClick = async (e) => {
    // Prevent the click from propagating to the parent div
    e.stopPropagation();

    setIsAdding(true);

    // Calculate discounted price
    if (discount);
    const res = await addItemToCart({
      product_id: _id,
      quantity: 1,
      price: discount ? calculateDisPrice(price, discount) : price,
      name,
      product_images,
      description,
    });
    if (res === "added locally") {
      getCartItems();
      setExists(true);
      setIsAdding(false);
      return;
    }

    alert(res?.data?.message);
    setExists(true);
    getCartItems();
    setIsAdding(false);
  };

  // Remove item from cart
  const handleRemoveItemFromCart = async (e) => {
    // Prevent the click from propagating to the parent div
    e.stopPropagation();

    setIsRemoving(true);

    const res = await removeItemFromCart(token ? cartId : _id);

    if (res === true) {
      setExists(false);
      setIsRemoving(false);
      alert("Item removed from cart");
      return;
    }

    getCartItems();

    alert(res?.data?.message);
    if (res?.data?.message === "Item removed successfully!") setExists(false);

    setIsRemoving(false);
  };

  return (
    <div
      onClick={() => navigate(`/product-details/${_id}`)}
      className=" flex flex-col items-center bg-gray-50 py-2 rounded-lg h-[250px] hover:shadow-lg duration-500 cursor-pointer"
    >
      <div className="relative">
        {" "}
        {/* Ensure the parent div has 'relative' for absolute positioning inside */}
        <img
          src={product_images[0]?.url}
          className="w-44 h-44 rounded-md hover:scale-105 duration-500"
          loading="lazy"
          alt={name}
        />
        {discount && (
          <div className="absolute left-3 top-0 bottom-0">
            {/* Position discount icon on top left */}
            <DiscountIcon /> {/* Icon */}
            <div className="absolute top-8 left-0 w-full h-full flex justify-center items-start">
              {" "}
              {/* Align discount value properly */}
              <span className="bg-red-500 text-white text-sm font-bold px-2 rounded-full">
                {discount?.value}
                {discount?.discount_type === "percentage" ? "%" : "₹"} OFF
              </span>
            </div>
          </div>
        )}
      </div>

      <p className=" font-sans font-semibold text-lg lg:text-xl px-2 mt-2">
        {name?.slice(0, 1).toUpperCase() + name?.slice(1, name?.length)}
      </p>
      <p className=" text-sm px-2 mt-1">
        {description?.length > 30
          ? description?.substring(1, 30) + "..."
          : description}
      </p>

      <div className=" flex flex-row gap-6 justify-between items-center px-2 py-2 mt-3">
        <p className=" font-mono font-semibold text-gray-500 text-lg lg:text-xl">
          {"₹" + price}
        </p>

        <button
          onClick={
            alredyExists ? handleRemoveItemFromCart : handleAddToCartClick
          }
          className={`z-10 outline px-4 py-2 font-bold rounded-lg duration-500 ${
            alredyExists
              ? "bg-red-500 text-white hover:bg-red-600 outline-red-500"
              : "bg-blue-500 text-white hover:bg-blue-600 outline-blue-500"
          }`}
          disabled={loading} // Disable button while loading
        >
          {isAdding || isRemoving ? (
            <Spinner color={isAdding ? "white" : "white"} /> // Show spinner while adding or removing
          ) : alredyExists ? (
            <MdRemove size={20} />
          ) : (
            <MdAdd size={20} />
          )}
        </button>
      </div>
    </div>
  );
};

export default Card;
