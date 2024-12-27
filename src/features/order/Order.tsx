import { useFetcher, useLoaderData, useNavigation } from "react-router-dom";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import { GetOrderType } from "./types";
import OrderItem from "./OrderItem";
import { useEffect } from "react";
import { MenuItemType } from "../menu/types";
import Button from "../../ui/Button";

function Order() {
  // fetcher will be used to call the "loader" function of the route "/menu"
  const fetcher = useFetcher();
  // for each new data fetching, useFetcher() must be called again to get a new object
  // priorityUpdater will be user to call the "action" function of the route "/order/:id".
  const priorityUpdater = useFetcher();
  const navigation = useNavigation();
  const order: GetOrderType = useLoaderData();
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  const isLoadingIngredients = navigation.state === "loading";

  function getCurrentIngredients(menu: MenuItemType[] | null, pizzaId: string) {
    if (!menu) return [];
    const foundItem = menu.find((menuItem) => menuItem.id === pizzaId);

    if (!foundItem) return [];
    else return foundItem.ingredients;
  }

  function handleAddPriority() {
    if (!priorityUpdater.data && priorityUpdater.state === "idle") {
      priorityUpdater.submit(`/order/${id}`);
    }
  }

  useEffect(() => {
    // fetching data from another route, using its "loader" function (fetching the menu, without going to the route /menu)
    if (!fetcher.data && fetcher.state === "idle") fetcher.load("/menu");
  }, [fetcher]);

  return (
    <div className="space-y-8 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Order # {id} status</h2>

        <div className="space-x-2">
          {priority && (
            <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-red-50">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-green-50">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5">
        <p>
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="divide-y divide-stone-200 border-b border-t">
        {cart.map((cartItem) => (
          <OrderItem
            key={cartItem.pizzaId}
            item={cartItem}
            ingredients={getCurrentIngredients(fetcher?.data, cartItem.pizzaId)}
            isLoadingIngredients={isLoadingIngredients}
          />
        ))}
      </ul>

      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium text-stone-600">
          Order Price: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-stone-600">
            Priority Price: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>

        {/* useFetcher() Form does not make the browser to navigate.
            it submits the form and revalidates the page (automatically
            re-renders the page, so in the related "action" function (updateOrderAction) there is no need to call redirect(). but without calling redirect(), there will be no navigation so the "navigation" object does not change, and therefore navigation.state will not be updated, so <Loader /> will not get rendered)
        */}
        {!priority && (
          <priorityUpdater.Form
            method="PATCH"
            className="text-right"
            action={`/order/${id}`}
          >
            <input type="hidden" name="order" value={JSON.stringify(order)} />
            <Button type="submit" sizeType="small" onClick={handleAddPriority}>
              Add Priority
            </Button>
          </priorityUpdater.Form>
        )}
      </div>
    </div>
  );
}

export default Order;
