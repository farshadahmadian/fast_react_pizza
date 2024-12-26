import { Link } from "react-router-dom";
import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "../../store";
import { clearCart, getCart } from "./cartSlice";
import { updateCartLocalStorage } from "./utils";
import EmptyCart from "./EmptyCart";

function Cart() {
  const username = useSelector(
    (rootState: RootStateType) => rootState.user.username,
  );
  const cart = useSelector(getCart);
  const dispatch = useDispatch();

  function handleClearCart() {
    const isConfirmed = confirm("Are you sure?");
    if (!isConfirmed) return;
    dispatch(clearCart());
    updateCartLocalStorage({ cart: [] });
  }

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>
      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>

      <ul className="mt-3 divide-y divide-stone-200 border-b">
        {cart.map((cartItem) => (
          <CartItem key={cartItem.pizzaId} item={cartItem} />
        ))}
      </ul>

      <div className="mt-6 space-x-2">
        {cart.length > 0 && (
          <>
            <Button sizeType="primary" type="button">
              <Link to="/order/new">Order pizzas</Link>
            </Button>

            <Button
              disabled={!cart.length}
              onClick={handleClearCart}
              type="reset"
              sizeType="secondary"
            >
              Clear cart
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
