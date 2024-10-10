import React from "react";
import { useParams } from "react-router-dom";

import Layout from "../components/Layout.jsx";

import DiscountedProductListing from "../components/DiscountedItemListing.jsx";

const Listing = () => {
  const { discount_id, valid_until } = useParams();

  return (
    <Layout>
      {/* Search bar */}

      {/* Filters */}

      <DiscountedProductListing
        discount_id={discount_id}
        valid_until={valid_until}
      />
    </Layout>
  );
};

export default Listing;
