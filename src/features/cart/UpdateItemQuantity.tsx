import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { decreaseItemQuantity, increaseItemQuantity } from "./cartSlice";

type UpdateItemQuantityPropsType = {
  id: string;
  quantity: number | undefined;
};

function UpdateItemQuantity({ id, quantity }: UpdateItemQuantityPropsType) {
  const dispatch = useDispatch();

  function handleIncrease() {
    dispatch(increaseItemQuantity(id));
  }

  function handleDecrease() {
    dispatch(decreaseItemQuantity(id));
  }

  return (
    <div className="flex items-center gap-1 sm:gap-2">
      <Button onClick={handleDecrease} type="button" sizeType="round">
        -
      </Button>
      <span className="text-xs font-medium sm:text-sm">{quantity}</span>
      <Button onClick={handleIncrease} type="button" sizeType="round">
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
