import React, { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";

import Spinner from "../components/Spinner.jsx";

// Lazy loaded components
const Home = React.lazy(() => import("../pages/HomePage.jsx"));
const Cart = React.lazy(() => import("../pages/CartPage.jsx"));
const ProductsPage = React.lazy(() => import("../pages/ProductsPage.jsx"));
const CategoriesPage = React.lazy(() => import("../pages/CategoriesPage.jsx"));

import CategoryProductsListingPage from "../pages/CategoryProductsListingPage.jsx";
import DiscountedProductsListingPage from "../pages/DiscountedProductsPage.jsx";

const PageNotFound = React.lazy(() => import("../pages/PageNotFound.jsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      //User routes
      {
        path: "/",
        element: (
          <Suspense fallback={<Spinner />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: (
          <Suspense fallback={<Spinner />}>
            <Cart />
          </Suspense>
        ),
      },

      {
        path: "/categories",
        element: (
          <Suspense fallback={<Spinner />}>
            <CategoriesPage />
          </Suspense>
        ),
      },

      {
        path: "/products",
        element: (
          <Suspense fallback={<Spinner />}>
            <ProductsPage />
          </Suspense>
        ),
      },

      {
        path: "/category-item-listing/:category_id",
        element: (
          // <Suspense fallback={<Spinner />}>
          <CategoryProductsListingPage />
          // </Suspense>
        ),
      },

      {
        path: "/discounted-products-listing/:discount_id/:valid_until",
        element: (
          // <Suspense fallback={<Spinner />}>
          <DiscountedProductsListingPage />
          // </Suspense>
        ),
      },

      {
        path: "*",
        element: (
          <Suspense fallback={<Spinner />}>
            <PageNotFound />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
