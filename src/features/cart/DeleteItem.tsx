import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { removeItemFromCart } from "./cartSlice";

type DeleteItemPropsType = {
  id: string;
};

function DeleteItem({ id }: DeleteItemPropsType) {
  /* 
    calling the function "getAnItemQuantity(id)" returns the "selector callback function"
    and when the selector callback function is called, it returns the quantity of the
    current item if it exists in cart
  */
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
      Delete
    </Button>
  );
}

export default DeleteItem;
