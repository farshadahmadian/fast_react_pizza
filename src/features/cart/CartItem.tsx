import { formatCurrency } from "../../utils/helpers";
import DeleteItem from "./DeleteItem";
import { CartItemType } from "./types";
import UpdateItemQuantity from "./UpdateItemQuantity";

type CartItemPropsType = {
  item: CartItemType;
};

function CartItem({ item }: CartItemPropsType) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="flex items-center justify-between py-3">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between gap-4 sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <div className="flex gap-4 sm:gap-8">
          <UpdateItemQuantity id={pizzaId} quantity={quantity} />
          <DeleteItem id={pizzaId} />
        </div>
      </div>
    </li>
  );
}

export default CartItem;
