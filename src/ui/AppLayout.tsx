import { Outlet, useNavigation } from "react-router-dom";
import CartOverview from "../features/cart/CartOverview";
import Header from "./Header";
import Loader from "./Loader";

function AppLayout() {
  // navigation is an object for the current route and "navigation.state" shows the state of the navigation for the current route. So, it is for all the routes and since all the routes are nested in AppLayout, navigation.state can be used in AppLayout to always get the navigation state of the current route regardless of which route it is
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}
      <Header />
      <div className="overflow-auto">
        <main className="mx-auto max-w-3xl">
          {/* <Outlet /> to render the content of a nested route (child component) inside another route (parent component) as a view */}
          <Outlet />
        </main>
      </div>
      <CartOverview />
    </div>
  );
}

export default AppLayout;
