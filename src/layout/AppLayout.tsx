import { Outlet } from "react-router";

import Header from "../components/Header";

export default function AppLayout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
