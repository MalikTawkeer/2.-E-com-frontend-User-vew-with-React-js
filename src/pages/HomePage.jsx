import React, { useEffect } from "react";

import useFetch from "../hooks/UseFetch.jsx";
import Layout from "../components/Layout.jsx";
import Spinner from "../components/Spinner.jsx";

import Banner from "../components/home/banner/Banner.jsx";
import Categories from "../components/home/categories/Categories.jsx";
import Discounts from "../components/home/discounts/Discounts.jsx";
import TopSellers from "../components/home/TopSellerProducts.jsx";
import Featured from "../components/home/FeaturedProducts.jsx";

import { homeFeed } from "../constants/ApiConstants.js";
import useCartStore from "../store/cartStore.js";

const HomePage = () => {
  const { data = {}, error, loading } = useFetch(homeFeed, "GET");

  const getCartItems = useCartStore((state) => state.getCartItems);
  const addAllItemsToCart = useCartStore((state) => state.addAllItemsToCart);

  useEffect(() => {
    addAllItemsToCart();
    getCartItems();
  }, []);

  return (
    <Layout>
      {loading && <Spinner />}
      {data && <Banner banners={data.banners} />}
      {data && <Categories categories={data.categories} />}
      {data && <Discounts discounts={data.discounts} />}
      {data && <TopSellers bestSellers={data.bestSellers} />}
      {data && <Featured featuredProducts={data.featured} />}
    </Layout>
  );
};

export default HomePage;
