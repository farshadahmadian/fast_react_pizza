import { formatCurrency } from "../../utils/helpers";
import { CartItemType } from "../cart/types";

type OrderItemPropsType = {
  item: CartItemType,
  isLoadingIngredients: boolean,
  ingredients: string[]
}

function OrderItem({ item, isLoadingIngredients, ingredients }: OrderItemPropsType) {
  const { quantity, name, totalPrice } = item;

  return (
    <li>
      <div>
        <p>
          <span>{quantity}&times;</span> {name}
        </p>
        <p>{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}

export default OrderItem;
