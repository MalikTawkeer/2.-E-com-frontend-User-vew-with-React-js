import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import useFetch from "../hooks/UseFetch.jsx";
import { getProductDetailsByProdId } from "../constants/ApiConstants";

import Layout from "../components/Layout.jsx";
import ImageSwipper from "../components/product details/ImageSwipper.jsx";
import AddToCartButton from "../components/AddToCartButton.jsx";

const Details = () => {
  const [isExtended, setIsExtended] = useState(false);
  const { product_id } = useParams();

  const { data, error, loading } = useFetch(
    `${getProductDetailsByProdId}${product_id}`
  );

  const toggleDescription = () => {
    setIsExtended(!isExtended);
  };

  const calculateDiscountedPrice = (orginalPrice, discount = {}) => {
    let newPrice = "";

    // Handle units case
    if (discount?.discount_type === "units") {
      newPrice = orginalPrice - discount?.value;

      return newPrice;
    }

    // Handle percentage case
    if (discount?.discount_type === "percentage") {
      newPrice = orginalPrice - (orginalPrice * discount?.value) / 100;

      return newPrice;
    }
  };

  // Calculte device viewports
  const [deviceType, setDeviceType] = useState("");

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

    // Add event listener to check on window resize
    window.addEventListener("resize", checkDevice);

    // Cleanup the event listener on unmount
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

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

              <AddToCartButton />
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
