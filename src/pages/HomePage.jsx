import React from "react";

import useFetch from "../hooks/UseFetch.jsx";
import Layout from "../components/Layout.jsx";
import Spinner from "../components/Spinner.jsx";

import Banner from "../components/home/banner/Banner.jsx";
import Categories from "../components/home/categories/Categories.jsx";
import Discounts from "../components/home/discounts/Discounts.jsx";
import TopSellers from "../components/home/TopSellerProducts.jsx";

import { homeFeed } from "../constants/ApiConstants.js";
import Featured from "../components/home/FeaturedProducts.jsx";

const HomePage = () => {
  const { data = {}, error, loading } = useFetch(homeFeed, "GET");

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
