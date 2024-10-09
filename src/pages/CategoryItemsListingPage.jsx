import React from "react";
import { useParams } from "react-router-dom";

import Layout from "../components/Layout.jsx";

import CateItemListing from "../components/category item listing/CategoryItemListing";

const Listing = () => {
  const { category_id } = useParams();

  return (
    <Layout>
      {/* Search bar */}

      {/* Filters */}

      <CateItemListing category_id={category_id} />
    </Layout>
  );
};

export default Listing;
