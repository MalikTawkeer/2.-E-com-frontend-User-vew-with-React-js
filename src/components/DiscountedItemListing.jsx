import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import { Link } from "react-router-dom";

import ProductInfoCard from "./ProductInfoCard.jsx";
import Spinner from "./Spinner.jsx";
import CountDownTimer from "./CountDownTimer.jsx";

import {
  apiBaseUrl,
  getProductsByDiscountId,
} from "../constants/ApiConstants.js";

const Listing = ({ discount_id, valid_until }) => {
  const { ref, inView } = useInView();

  // Painated api call
  const fetchProducts = async ({ pageParam = 1 }) => {
    const { data } = await axios.get(
      `${apiBaseUrl}${getProductsByDiscountId}${discount_id}?page=${pageParam}&limit=10`
    );

    return data;
  };

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: [`discounted_items-${discount_id}`],
    queryFn: ({ pageParam = 1 }) => fetchProducts({ pageParam }),
    getNextPageParam: (lastPage) => {
      return lastPage.currentPage < lastPage.totalPages
        ? lastPage.currentPage + 1
        : undefined;
    },
    staleTime: 0, // Data becomes stale immediately after fetching
    cacheTime: 0, // Data is removed from cache immediately once the component unmounts
  });

  React.useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [hasNextPage, inView]);

  return (
    <div className=" mt-5">
      <CountDownTimer valid_until={valid_until} />

      <div className="flex flex-wrap lg:justify-start justify-center lg:gap-10 gap-2 mt-2 lg:mt-5">
        {status === "success" && data?.pages[0].products?.length === 0 && (
          <div className=" flex flex-col justify-center items-center  w-full">
            <p className=" font-bold text-red-400 my-10 text-center">
              OOPS!!, No products available for this category!
            </p>

            <Link
              to={"/"}
              className=" bg-blue-500 py-1 px-2 rounded-lg text-lg text-white"
            >
              Explore other Products
            </Link>
          </div>
        )}

        {isLoading &&
          Array.from({ length: 10 }, (_, index) => (
            <Skeleton height={230} width={180} />
          ))}

        {status === "success" &&
          !isLoading &&
          data?.pages?.map((page) => {
            return page?.products?.map((product) => (
              <ProductInfoCard key={product._id} {...product} />
            ));
          })}
      </div>

      {/* Loading Spinner */}
      {isFetchingNextPage && <Spinner />}

      {/* Intersection Observer */}
      <div ref={ref} className=" mt-5"></div>
    </div>
  );
};

export default Listing;
