import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./ui/Home";
import Menu from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import CreateOrder from "./features/order/CreateOrder";
import Order from "./features/order/Order";
import AppLayout from "./ui/AppLayout";
import { getMenu } from "./services/apiRestaurant";

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
    // layout route: a route without "path"
    element: <AppLayout />,
    children: [
      {
        // index: true,
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
        loader: getMenu,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
      },
      {
        path: "order/:orderId",
        element: <Order />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
