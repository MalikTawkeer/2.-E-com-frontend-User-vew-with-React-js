import React, { useEffect, useState } from "react";

import useCartStore from "../../store/cartStore";

const CartDetails = () => {
  const cartItems = useCartStore((state) => state.cartItems);

  const [price, setPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [deliveryCharges, setDeliveryCharges] = useState(30);

  //   Calculate total price
  const calculatePrice = () => {
    // Calculate total price
    const totalPrice = cartItems?.reduce((total, item) => {
      // Convert `price` to a number in case it's stored as a string
      const itemPrice = parseFloat(item.price);
      const itemTotal = item.quantity * itemPrice;
      return total + itemTotal;
    }, 0);
    setPrice(totalPrice);
    setTotalPrice(totalPrice);
  };

  useEffect(() => {
    calculatePrice();
  }, [cartItems]);

  return (
    <div className=" flex flex-col bg-gray-100 rounded-lg lg:px-5 px-2 py-5 h-fit">
      <h1 className=" text-2xl text-left font-bold text-gray-700 ">
        PRICE DETAILS
      </h1>

      <div className="border-b-2 border-gray-300 w-full py-2"></div>

      {/* Price */}
      <div className=" text-left flex gap-5 justify-between lg:gap-10 mt-5">
        <p className=" font-smeibold lg:text-xl text-gray-700">
          Price ({cartItems?.length} items)
        </p>
        <p className=" font-bold lg:text-xl text-gray-600">₹{price}</p>
      </div>

      {/* Delivery charges */}
      <div className=" text-left flex gap-5 justify-between lg:gap-10 mt-5">
        <p className=" font-smeibold lg:text-xl text-gray-700">
          Delivery Charges
        </p>
        <p className=" font-bold lg:text-xl text-gray-600">
          <strong className=" line-through font-body text-gray-400">{deliveryCharges}</strong>
          <strong className=" text-lg font-bold text-green-500 ml-1">Free</strong>
        </p>
      </div>

      {/* Total Price */}
      <div className=" text-left flex gap-5 justify-between lg:gap-10 mt-10">
        <p className=" font-bold lg:text-xl text-gray-700">Total Amount</p>
        <p className=" font-bold lg:text-xl text-gray-600">₹{totalPrice}</p>
      </div>

      <button className=" bg-blue-400 hover:bg-blue-300 hover:shadow-xl duration-300 rounded-xl text-white font-bold p-3 mt-10">
        Checkout
      </button>
    </div>
  );
};

export default CartDetails;
