import { createBrowserRouter } from "react-router";

import AppLayout from "../layout/AppLayout";
import About from "../pages/About";
import ErrorPage from "../pages/ErrorPage";
import App from "../App";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    Component: AppLayout,
    children: [
      { index: true, Component: App },
      { path: "about", Component: About },
      { path: "*", element: <h1>Page Not Found</h1> },
    ],
  },
]);

export default router;
