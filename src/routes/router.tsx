import { createBrowserRouter } from "react-router";

import AppLayout from "../layout/AppLayout";
import AboutPage from "../pages/AboutPage";
import CoinDetailsPage from "../pages/CoinDetailsPage";
import ErrorPage from "../pages/ErrorPage";
import NotFound from "../pages/NotFound";
import App from "../App";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    Component: AppLayout,
    children: [
      { index: true, Component: App },
      { path: "about", Component: AboutPage },
      { path: "coin/:id", Component: CoinDetailsPage },
      { path: "*", Component: NotFound },
    ],
  },
]);

export default router;
