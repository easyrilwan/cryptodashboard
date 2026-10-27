import { createBrowserRouter } from "react-router";

import AppLayout from "../layout/AppLayout";
import AboutPage from "../pages/AboutPage";
import CoinDetailsPage from "../pages/CoinDetailsPage";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    Component: AppLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "about", Component: AboutPage },
      { path: "coin/:id", Component: CoinDetailsPage },
      { path: "*", Component: NotFound },
    ],
  },
]);

export default router;
