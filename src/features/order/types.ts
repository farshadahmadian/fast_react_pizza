import { CartItemType } from "../cart/types";

export type OrderStatusType = "delivery";

export type OrderFormType = {
  customer: string;
  phone: string;
  address: string;
  priority: string;
  cart: CartItemType[];
  position: GeolocationCoordinates | null;
};

export type PostOrderType = Omit<OrderFormType, "priority"> & {
  priority: boolean;
};

export type FullOrderType = PostOrderType & {
  id: string;
  estimatedDelivery: string;
  orderPrice: number;
  priorityPrice: number;
  status: OrderStatusType;
  createdAt: string;
};

export type GetOrderType = Omit<
  FullOrderType,
  "phone" | "customer" | "address"
>;
