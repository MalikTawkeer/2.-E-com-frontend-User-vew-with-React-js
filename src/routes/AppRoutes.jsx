import React, { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

import App from "../App.jsx";
import Spinner from "../components/Spinner.jsx";
import AuthLayout from "../components/AuthLayout.jsx";

// Lazy loaded components
const Home = React.lazy(() => import("../pages/HomePage.jsx"));
const Cart = React.lazy(() => import("../pages/CartPage.jsx"));
const ProductsPage = React.lazy(() => import("../pages/ProductsPage.jsx"));
const ProductsDetailsPage = React.lazy(() =>
  import("../pages/ProductDetailsPage.jsx")
);
const CategoriesPage = React.lazy(() => import("../pages/CategoriesPage.jsx"));
import CategoryProductsListingPage from "../pages/CategoryProductsListingPage.jsx";
import DiscountedProductsListingPage from "../pages/DiscountedProductsPage.jsx";
import ShowOrders from "../pages/ShowOrdersPage.jsx";
import CustomerProfilePage from "../pages/CustomerProfilePage.jsx";

const PageNotFound = React.lazy(() => import("../pages/PageNotFound.jsx"));
const LoginPage = React.lazy(() => import("../pages/LoginPage.jsx"));
const SignupPage = React.lazy(() => import("../pages/SignupPage.jsx"));
const ForgotPassPage = React.lazy(() => import("../pages/ForgotPassPage.jsx"));
const PasswordResetPage = React.lazy(() =>
  import("../pages/PasswordResetPage.jsx")
);

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
        path: "/product-details/:product_id",
        element: (
          <Suspense fallback={<Spinner />}>
            <ProductsDetailsPage />
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
        path: "/orders",
        element: (
          <Suspense fallback={<Spinner />}>
            <ShowOrders />
          </Suspense>
        ),
      },

      {
        path: "/customer-profile",
        element: (
          <Suspense fallback={<Spinner />}>
            <CustomerProfilePage />
          </Suspense>
        ),
      },

      {
        path: "/login",
        element: (
          <Suspense fallback={<Spinner />}>
            <LoginPage />
          </Suspense>
        ),
      },

      {
        path: "/signup",
        element: (
          <Suspense fallback={<Spinner />}>
            <SignupPage />
          </Suspense>
        ),
      },

      {
        path: "/forgot-pass",
        element: (
          <Suspense fallback={<Spinner />}>
            <ForgotPassPage />
          </Suspense>
        ),
      },

      {
        path: "/reset-pass/:token",
        element: (
          <Suspense fallback={<Spinner />}>
            <PasswordResetPage />
          </Suspense>
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
