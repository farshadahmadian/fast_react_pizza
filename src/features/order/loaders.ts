import type { Params } from "react-router-dom";

import { getOrder } from "../../services/apiRestaurant";
import { GetOrderType } from "./types";

// to get the params (/order/:orderId) useParams() hook can be used inside the component. "loader" function cannot be moved to the component "Order" because then it is not possible to export it. react router dom, passes an object to the "loader" function as argument which has the "params" property and the "request" property which is the HTTP request sent for data
export async function loader({ params }: { params: Params<"orderId"> }) {
  if (!params.orderId) return null;
  const order: GetOrderType = await getOrder(params.orderId);
  return order;
}
