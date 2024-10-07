import React from "react";

import useFetch from "../hooks/UseFetch.jsx";
import Layout from "../components/Layout.jsx";

import Banner from "../components/home/banner/Banner.jsx";
import Categories from "../components/home/categories/Categories.jsx";
import Discounts from "../components/home/discounts/Discounts.jsx";
import TopSellers from "../components/home/TopSellerProducts.jsx";

import { homeFeed } from "../constants/ApiConstants.js";
import Featured from "../components/home/FeaturedProducts.jsx";

const HomePage = () => {
  const { data, error, loading } = useFetch(homeFeed, "GET");

  return (
    <Layout>
      {data.banners && <Banner banners={data.banners} />}
      {data.categories && <Categories categories={data.categories} />}
      {data.discounts && <Discounts discounts={data.discounts} />}
      {data.bestSellers && <TopSellers bestSellers={data.bestSellers} />}
      {data.featured && <Featured featuredProducts={data.featured} />}
    </Layout>
  );
};

export default HomePage;
