import React, { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";

import Spinner from "../components/Spinner.jsx";

// Lazy loaded components
const Home = React.lazy(() => import("../pages/HomePage.jsx"));
const Cart = React.lazy(() => import("../pages/CartPage.jsx"));

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
