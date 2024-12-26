import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { getAnItemQuantity, removeItemFromCart } from "./cartSlice";

type DeleteItemPropsType = {
  id: string;
};

function DeleteItem({ id }: DeleteItemPropsType) {
  /* 
    calling the function "getAnItemQuantity(id)" returns the "selector callback function"
    and when the selector callback function is called, it returns the quantity of the
    current item if it exists in cart
  */
  const quantity = useSelector(getAnItemQuantity(id));
  const dispatch = useDispatch();
  function handleDeleteItem() {
    dispatch(removeItemFromCart(id));
  }

  return (
    <Button
      sizeType="small"
      type="button"
      disabled={false}
      onClick={handleDeleteItem}
    >
      Delete ({quantity})
    </Button>
  );
}

export default DeleteItem;
