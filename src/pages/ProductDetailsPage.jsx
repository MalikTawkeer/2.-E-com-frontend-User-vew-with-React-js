import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import calculateDiscountedPrice from "../utils/calculate.discounted.price.js";
import useFetch from "../hooks/UseFetch.jsx";
import { getProductDetailsByProdId } from "../constants/ApiConstants";

import Layout from "../components/Layout.jsx";
import ImageSwipper from "../components/product details/ImageSwipper.jsx";
import useCartStore from "../store/cartStore.js";
import useAuthStore from "../store/authStore.js";
import Spinner from "../components/Spinner.jsx";

const Details = () => {
  const { product_id } = useParams();

  const [isExtended, setIsExtended] = useState(false);
  const [deviceType, setDeviceType] = useState(""); // Calculte device viewports

  const { data, error, loading } = useFetch(
    `${getProductDetailsByProdId}${product_id}`
  );

  // Store funcs and states
  const token = useAuthStore((state) => state.token);
  const cartItems = useCartStore((state) => state.cartItems);
  const isLoading = useCartStore((state) => state.loading);
  const isError = useCartStore((state) => state.error);
  const getCartItems = useCartStore((state) => state.getCartItems);
  const removeItemFromCart = useCartStore((state) => state.removeItemFromCart);
  const addItemToCart = useCartStore((state) => state.addItemToCart);
  const updateCartItemQuantity = useCartStore(
    (state) => state.updateCartItemQuantity
  );

  useEffect(() => {
    const checkDevice = () => {
      if (window.innerWidth <= 768) {
        setDeviceType("mobile");
      } else {
        setDeviceType("laptop");
      }
    };

    // Check on mount
    checkDevice();
    getCartItems();

    // Add event listener to check on window resize
    window.addEventListener("resize", checkDevice);

    // Cleanup the event listener on unmount
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  // Check item alredy exists into a cart
  const [alredyExists, setExists] = useState(
    cartItems?.some((item) =>
      token
        ? item?.product_id?._id === product_id
        : item?.product_id === product_id
    )
  );

  const [cartId, setCartId] = useState(null);

  // Check item is in cart or not
  useEffect(() => {
    let existingItem = [];

    if (token)
      existingItem = cartItems?.find(
        (item) => item?.product_id?._id === product_id
      );

    if (!token)
      existingItem = cartItems?.find((item) => item?.product_id === product_id);

    if (existingItem)
      setCartId(token ? existingItem?._id : existingItem?.product_id);
  }, []);

  const toggleDescription = () => {
    setIsExtended(!isExtended);
  };

  // Handle add to cart
  const handleAddToCartClick = async (e) => {
    // Prevent the click from propagating to the parent div
    e.stopPropagation();

    // Calculate discounted price

    const res = await addItemToCart({
      product_id: data?.productInfo?._id,
      quantity: 1,
      price: data?.productInfo?.discount
        ? calculateDiscountedPrice(
            data?.productInfo?.price,
            data?.productInfo?.discount
          )
        : data?.productInfo?.price,
      name: data?.productInfo?.name,
      product_images: data?.productInfo?.product_images,
      description: data?.productInfo?.description,
    });
    if (res === "added locally") {
      getCartItems();
      setExists(true);
      return;
    }

    alert(res?.data?.message);
    setExists(true);
    getCartItems();
  };

  // Remove item from cart
  const handleRemoveItemFromCart = async (e) => {
    // Prevent the click from propagating to the parent div
    e.stopPropagation();

    const res = await removeItemFromCart(token ? cartId : product_id);

    if (res === true) {
      setExists(false);
      alert("Item removed from cart");
      return;
    }

    getCartItems();

    alert(res?.data?.message);
    if (res?.data?.message === "Item removed successfully!") setExists(false);
  };

  return (
    <Layout>
      <div className=" flex flex-col lg:flex-row bg-gray-50 gap-2 mt-5 py-4">
        {loading && (
          <div className="flex flex-col lg:flex-row lg:gap-3 bg-gray-50  mt-5 py-4 px-2 items-center  justify-center">
            <Skeleton height={230} width={300} />

            <div>
              <Skeleton
                height={230}
                width={deviceType === "mobile" ? 300 : 600}
              />
            </div>
          </div>
        )}

        {/* Image slides */}
        {data && !loading && (
          <div className=" lg:w-1/2">
            {data?.productInfo?.product_images && (
              <ImageSwipper
                product_images={data?.productInfo?.product_images}
              />
            )}
          </div>
        )}

        {/* Product Details */}
        {data && !loading && (
          <div className=" lg:w-1/2  py-2 px-1 lg:px-10 ">
            <p className=" text-left font-bold text-gray-800 text-lg lg:text-3xl">
              {data?.productInfo?.name.slice(0, 1).toUpperCase() +
                data?.productInfo?.name.slice(
                  1,
                  data?.productInfo?.name.length
                )}
            </p>
            <p className=" text-left text-gray-700 font-sans text-xs mt-[1px]">
              ({data?.productInfo?.sales_count}) People buy this product
            </p>

            {data?.averageRating && (
              <p className=" text-left text-gray-700 font-sans text-xs mt-[1px] flex gap-0 items-center">
                <span className=" font-bold text-lg">
                  {data?.averageRating}
                </span>
                <svg
                  class="w-5 h-5 text-yellow-300 ms-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>

                <span className=" ml-4 font-bold text-gray-600">
                  {data?.ratingCount} Ratings
                </span>
              </p>
            )}

            {/* Orginal and Discount Price */}
            <div className=" flex flex-row flex-wrap gap-2 justify-between items-center">
              <div className=" flex flex-wrap justify-center items-center gap-2 lg:gap-5">
                <p
                  className={` ${
                    data?.productInfo?.discount
                      ? " line-through text-gray-400"
                      : ""
                  } font-bold  text-lg text-left lg:mt-4 mt-1`}
                >
                  ₹{data?.productInfo?.price}
                </p>

                {data?.productInfo?.discount && (
                  <p className=" font-bold text-gray-600 text-2xl text-left lg:mt-4 mt-1">
                    ₹
                    {calculateDiscountedPrice(
                      data?.productInfo?.price,
                      data?.productInfo?.discount
                    )}
                  </p>
                )}

                {data?.productInfo?.discount && (
                  <p className=" text-sm font-bold text-gray-100 bg-[#4352ff] px-1   rounded-lg text-left lg:mt-4 mt-1">
                    <span className=" font-thin">Discount</span>{" "}
                    {data?.productInfo?.discount?.value}
                    <span>
                      {data?.productInfo?.discount?.discount_type ===
                      "percentage"
                        ? "%"
                        : "₹"}
                    </span>
                  </p>
                )}
              </div>

              <button
                onClick={
                  alredyExists ? handleRemoveItemFromCart : handleAddToCartClick
                }
                className={` ${
                  !alredyExists
                    ? "bg-[#2497f2] hover:bg-[#227ec9]"
                    : " bg-red-500 hover:bg-red-400"
                }  text-white font-bold shadow-lg text-sm rounded-lg px-3  duration-300 py-2`}
              >
                {isLoading ? (
                  <Spinner color="white" />
                ) : alredyExists ? (
                  "Remove from cart"
                ) : (
                  "Add to cart"
                )}
              </button>
            </div>

            {/* DESCRIPTION */}
            <div>
              <h1 className=" text-left font-bold text-gray-600 mt-1 lg:mt-4">
                Descripion:
              </h1>
              <p className=" text-left">
                {isExtended
                  ? data?.productInfo?.description
                  : `${data?.productInfo?.description.substring(0, 140)}${
                      data?.productInfo?.description?.length > 140 ? "..." : ""
                    }`}
              </p>

              {data?.productInfo?.description.length > 100 && (
                <button
                  onClick={toggleDescription}
                  className=" text-blue-500 font-bold hover:text-blue-400 duration-200"
                >
                  {isExtended ? "Show less" : "Show more"}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Details;
