import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./ui/Home";
import Menu from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import CreateOrder from "./features/order/CreateOrder";
import Order from "./features/order/Order";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";
import Loader from "./ui/Loader";
import { loader as menuLoader } from "./features/menu/loaders";
import { loader as orderLoader } from "./features/order/loaders";

// for data loading, data actions and data fetching in React Router Dom, createBrowserRouter() is required

/* 
  child:
  <AppLayout><Home /></AppLayout>

  nested route:
  (1)
  <route to="/" element={<AppLayout />}>
    <route to="menu" element={<Menu />} />
  </route>

  (2)
  {
    element: <AppLayout />,
    children: [
      {
        path: "/menu",
        element: <Menu />,
      }
    ]
  }
*/
const router = createBrowserRouter([
  {
    // if an error happens in rendering a component of a route, e.g. throwing an exception instance in <Menu /> and not catching that exception instance, it is possible to render an errorElement instead of that component. The error (exception) bubbles up to the wraping route, therefore this errorElement can be defined in parent route.

    // layout route: a route without "path"
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        // index: true,
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
        // if the app starts with localhost:port/menu directly (the first HTTP request that requests for index.html), hydration happens. During the hydration, <Loader /> will be re-rendered
        hydrateFallbackElement: <Loader />,
        // HydrateFallback: Loader,
        errorElement: <Error />,
        //if an exception occurs, <Error /> will be rendered instaed of <Menu />
        loader: menuLoader,
      },
      {
        path: "/cart",
        // if an exception is thrown, it will bubble up and finds the nearest errorElement of a "parent" route in AppLayout. <Error /> will be rendered instead of the "AppLayout"
        element: <Cart />,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
      },
      {
        path: "order/:orderId",
        element: <Order />,
        loader: orderLoader,
        hydrateFallbackElement: <Loader />,
        errorElement: <Error />,
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
]);

function App() {
  return (
    // in case of the routing "localhost:port/ ===> localhost:port/menu" there will be no hydration, so "hydrateFallbackElement" will not be rendered. "Suspense" does not work either because data fetching by react router DOM starts as soon as routing begins (before componentDidMount) and since component is not mounted, it is not "suspended" either. To render <Loader /> in this case, navigation.state can be used in "AppLayout" component because "navigation" object has been created as the app has already started before, by rendering the homepage (localhost:port/)
    // <Suspense fallback={<Loader />}>
    <RouterProvider router={router} />
    // </Suspense>
  );
}

export default App;
