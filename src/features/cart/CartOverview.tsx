import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { RootStateType } from "../../store";
// import { useEffect, useState } from "react";
import { getTotalPizzasNum, getTotalPizzasPrice } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  // const cart = useSelector((rootState: RootStateType) => rootState.cart.cart);
  // const [totalItemsNum, setTotalItemsNum] = useState(0);
  // const [totalItemsPrice, setTotalItemsPrice] = useState(0);

  // useEffect(() => {
  //   function getTotalPizzasNum() {
  //     return cart.reduce((accu, cartItem) => {
  //       return (accu += cartItem.quantity);
  //     }, 0);
  //   }

  //   function getTotalPizzasPrice() {
  //     return cart.reduce((accu, cartItem) => {
  //       return (accu += cartItem.totalPrice);
  //     }, 0);
  //   }

  //   setTotalItemsNum(getTotalPizzasNum());
  //   setTotalItemsPrice(getTotalPizzasPrice());
  // }, [cart]);

  // instead of syncing UI with the store state (cart), using useEffect() and useState(), the whole logic can be implemented in useSelector(selectorFunction) selectorFunction. But, 2 separate useSelector() calls are required because returning a reference value, e.g. an object or array, from useSelector() creates a new reference on each render. The other solution is memoization

  // const totals = useSelector((rootState: RootStateType) => {
  //   function getTotalPizzasNum() {
  //     return rootState.cart.cart.reduce((accu, cartItem) => {
  //       return (accu += cartItem.quantity);
  //     }, 0);
  //   }

  //   function getTotalPizzasPrice() {
  //     return rootState.cart.cart.reduce((accu, cartItem) => {
  //       return (accu += cartItem.totalPrice);
  //     }, 0);
  //   }

  //   const totalItemsNum = getTotalPizzasNum();
  //   const totalItemsPrice = getTotalPizzasPrice();
  //   return { totalItemsNum, totalItemsPrice };
  // });

  const totalItemsNum = useSelector(getTotalPizzasNum);
  const totalItemsPrice = useSelector(getTotalPizzasPrice);

  if (!totalItemsNum) return null;

  return (
    <div className="flex items-center justify-between bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold uppercase text-stone-300 sm:space-x-6">
        <span>{totalItemsNum} pizzas</span>
        <span>{formatCurrency(totalItemsPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
