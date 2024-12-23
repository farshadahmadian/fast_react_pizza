import { CartItemType } from "../cart/types";

export type OrderStatusType = "delivery";

export type OrderType = {
  id: string;
  customer: string;
  phone: string;
  address: string;
  priority: boolean;
  estimatedDelivery: string;
  cart: CartItemType[];
  position: string;
  orderPrice: number;
  priorityPrice: number;
  status: OrderStatusType;
};
