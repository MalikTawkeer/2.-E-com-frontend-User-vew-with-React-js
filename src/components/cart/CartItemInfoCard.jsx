import React, { useEffect, useState, useRef } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoRemoveCircleOutline } from "react-icons/io5";
import { RiDeleteBin2Line } from "react-icons/ri";

import Spinner from "../Spinner";

import useCartStore from "../../store/cartStore";
import useAuthStore from "../../store/authStore";

const CartItem = ({
  _id,
  quantity,
  name = "",
  description = "",
  product_images = [],
  price,
  product_id,
}) => {
  const [itemQuantity, setItemQuantity] = useState(quantity || 0);
  const isInitialRender = useRef(true); // Track if it's the first render

  const removeItemFromCart = useCartStore((state) => state.removeItemFromCart);
  const getCartItems = useCartStore((state) => state.getCartItems);
  const updateCartItemQuantity = useCartStore(
    (state) => state.updateCartItemQuantity
  );
  const loading = useCartStore((state) => state.loading);
  const token = useAuthStore((state) => state.token);

  // local states
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdatingQnty, setIsUpdatingQnty] = useState(false);

  // Remove item from cart
  const handleRemoveFromCart = async (itemId) => {
    setIsDeleting(true);
    const res = await removeItemFromCart(itemId);
    await getCartItems();
    setIsDeleting(false);
  };

  // Increment | Decrement cart item quantity
  const handleUpdateQuantity = async (quantity) => {
    setIsUpdatingQnty(true);
    const res = await updateCartItemQuantity(
      token ? _id : product_id,
      quantity
    );
    await getCartItems();
    setIsUpdatingQnty(false);
  };

  // Watch changes in itemQuantity, Call handle updateCartItemQuantity
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false; // Skip the first run
    } else {
      handleUpdateQuantity(itemQuantity); // Call when `itemQuantity` changes after initial render
    }
  }, [itemQuantity, _id]);

  return (
    <div className=" flex flex-row justify-between bg-gray-200 rounded-lg my-2 px-2 py-3 lg:px-5 lg:py-4 lg:w-[500px] md:w-[300px] w-full">
      {/* image and increment decrement btns */}
      <div className=" flex flex-col justify-center">
        <img
          width={120}
          height={120}
          src={
            token ? product_id?.product_images[0]?.url : product_images[0]?.url
          }
          alt={token ? product_id?.name : name}
        />

        <div className=" flex flex-row bg-white justify-center items-center gap-2 py-2 mt-2 rounded-xl">
          {/* Decrement / remove button */}
          <button
            disabled={loading}
            onClick={() => {
              if (itemQuantity === 1)
                handleRemoveFromCart(token ? _id : product_id);
              else {
                // Validate quantity
                if (itemQuantity === 0) {
                  alert("Quantity can't be negative!");
                  return;
                }

                // Decrement quantity

                setItemQuantity((prev) => prev - 1);
              }
            }}
            className=" font-bold text-gray-600 text-xl lg:text-3xl"
          >
            {isDeleting ? (
              <Spinner size={20} />
            ) : itemQuantity === 1 ? (
              <RiDeleteBin2Line color="red" />
            ) : (
              <IoRemoveCircleOutline size={18} />
            )}
          </button>

          <p
            className={`font-semibold lg:text-xl ${
              !isUpdatingQnty ? "border" : null
            }  border-gray-400 px-2 `}
          >
            {isUpdatingQnty ? <Spinner size={16} /> : itemQuantity}
          </p>

          {/* Increment button */}
          <button
            disabled={loading}
            onClick={() => {
              // Validate quantity
              if (itemQuantity === 0) {
                alert("Quantity can't be negative!");
                return;
              }

              // Increment item quantity
              setItemQuantity((prev) => prev + 1);
            }}
            className=" font-bold text-gray-600 text-xl lg:text-xl"
          >
            <IoIosAddCircleOutline size={18} />
          </button>
        </div>
      </div>

      {/* Other info */}
      <div>
        <p className=" text-gray-900 font-bold text-xl lg:text-3xl">
          {token
            ? product_id?.name?.slice(0, 1)?.toUpperCase() +
              product_id?.name?.slice(1)
            : name?.slice(0, 1)?.toUpperCase() + name?.slice(1)}
        </p>
        <p className=" text-gray-700 font-semibold text-xl lg:text-2xl">
          {price}
        </p>
        <p className=" text-black font-body text-xl">
          {token
            ? product_id?.description?.slice(0, 20)
            : description?.slice(0, 20)}
        </p>
      </div>
    </div>
  );
};

export default CartItem;
