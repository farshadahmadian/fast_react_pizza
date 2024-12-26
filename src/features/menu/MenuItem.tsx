import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { MenuItemType } from "./types";
import {
  addItemToCart,
  getAnItemQuantity,
  increaseItemQuantity,
} from "../cart/cartSlice";
import { updateCartLocalStorage } from "../cart/utils";
import { RootStateType } from "../../store";
import { useEffect } from "react";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";

type MenuItemPropsType = {
  pizza: MenuItemType;
};

function MenuItem({ pizza }: MenuItemPropsType) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();
  const cart = useSelector((rootState: RootStateType) => rootState.cart);
  const quantity = useSelector(getAnItemQuantity(id));

  function handleClick() {
    const foundItem = cart.cart.find(
      (cartItem) => cartItem.pizzaId === pizza.id,
    );

    if (foundItem) {
      dispatch(increaseItemQuantity(id));
    } else {
      dispatch(addItemToCart(pizza));
    }
  }

  function isItemInCart() {
    const foundItem = cart.cart.find((cartItem) => cartItem.pizzaId === id);
    return foundItem;
  }

  useEffect(() => {
    updateCartLocalStorage(cart);
  }, [cart]);

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex flex-grow flex-col">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-end justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}
          {!soldOut && (
            <div className="flex items-center gap-4 sm:gap-8">
              {isItemInCart() && (
                <>
                  <UpdateItemQuantity quantity={quantity} id={id} />
                  <DeleteItem id={id} />
                </>
              )}
              {!isItemInCart() && (
                <Button
                  onClick={handleClick}
                  type="button"
                  sizeType="small"
                  disabled={soldOut}
                >
                  add to cart
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
