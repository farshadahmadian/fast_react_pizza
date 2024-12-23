import { Outlet, useNavigation } from "react-router-dom";
import CartOverview from "../features/cart/CartOverview";
import Header from "./Header";
import Loader from "./Loader";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="layout">
      {isLoading && <Loader />}
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
