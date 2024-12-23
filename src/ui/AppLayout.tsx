import { Outlet } from "react-router-dom";
import CartOverview from "../features/cart/CartOverview";
import Header from "./Header";

function AppLayout() {
  return (
    <div>
      <Header />
      <main>
        {/* <Outlet /> to render the content of a nested route (child component) inside another route (parent component) as a view */}
        <Outlet />
      </main>
      <CartOverview />
    </div>
  );
}

export default AppLayout;
