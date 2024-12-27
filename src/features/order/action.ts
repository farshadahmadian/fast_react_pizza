import { redirect } from "react-router-dom";
import { createOrder, updateOrder } from "../../services/apiRestaurant";
import { ReactRouterDomRequestType } from "../../type";
import { FullOrderType, OrderFormType, PostOrderType } from "./types";
import store from "../../store";
import { clearCart } from "../cart/cartSlice";
import { updateUserLocalStorage } from "../user/utils";
import { updateCartLocalStorage } from "../cart/utils";
import { updateUserData, UserStateType } from "../user/userSlice";

export async function updateOrderAction(obj: ReactRouterDomRequestType) {
  if (!obj.params.orderId) return;
  /* 
    When the form in "Order" component is submited, a PATCH request will be sent 
    to the "form action attribute (/order/id)". this request, containing the
    submitted form data, along with the "params" will be passed as an object (obj)
    to the "route action function"
  */
  /*
  console.log(obj);
  const formData = await obj.request.formData();
  const data = Object.fromEntries(formData);
  const order: FullOrderType = JSON.parse(data.order.toString());
  console.log(order);
  */
  await updateOrder(obj.params.orderId, { priority: true });

  /* 
    redirect() is not needed because react router dom will re-fetch
    the data when "priority" is updated and re-renders the page. redirect() is used to cause navigation which mutates the navigattion object and updates navigation.state from "idle" to "loading or submitting" which will render <Loader />
  */
  return redirect(`/order/${obj.params.orderId}`);
}

type FormErrorsType = {
  phone?: string;
};

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str: string) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

/*
  as soons as the <Form> in createOrder.tsx is submited, this function will be called 
  because it is the "action" function for the route /order/new. react-router-dom passes
  the object {params:{}, request:{}} as the argument when calls this function. request.url shows
  that the request is sent to the current url "localhost:port/order/new" and then the browser API
  gets the submited data using formData(). So, "loader" functions are called as soon as a GET
  request is sent to the related route, e.g. /order/:id or /menu, but "action" functions are
  triggered as soon as a POST, PATCH or DELETE request is sent to the route, e.g. /order/new
*/
export async function action(obj: ReactRouterDomRequestType) {
  // formData() is a function from the browser API
  const formData = await obj.request.formData();
  const data = Object.fromEntries(formData);
  /* 
  this function is used to get the data submited by form without
  using states and submit handler. "cart" can be received as the 
  value of a "hidden input"
  */
  type ConvertedDataType = OrderFormType & {
    user: UserStateType;
  };

  const convertedData = {
    ...data,
    cart: JSON.parse(data.cart.toString()),
    user: JSON.parse(data.user.toString()),
    priority: data.priority,
  } as ConvertedDataType;

  const order: PostOrderType = {
    ...convertedData,
    priority: convertedData.priority === "on",
  };

  const errors: FormErrorsType = {};
  if (!isValidPhone(convertedData.phone)) {
    errors.phone = "Please enter a correct phone number!";
  }
  if (Object.keys(errors).length > 0) return errors;

  const newOrder: FullOrderType = await createOrder(order);
  /* 
  redirect() can be "returned" from a route "loader" or "action" function to
  send a Response with a status code (default is 302 Found) to the browser
  so that redirection to a route happens, e.g. `/order/${newOrder.id}`
  */
  const response = redirect(`/order/${newOrder.id}`);
  store.dispatch(clearCart());
  store.dispatch(
    updateUserData({
      phone: newOrder.phone,
      address: newOrder.address,
      id: newOrder.id,
    }),
  );
  updateUserLocalStorage({
    username: newOrder.customer,
    address: newOrder.address,
    phone: newOrder.phone,
    position: newOrder.position,
    status: "idle",
    error: null,
    orderIds: [...convertedData.user.orderIds, newOrder.id],
  });
  updateCartLocalStorage({ cart: [] });
  return response;
  // return newOrder.id;
}

/* 
  1) filling out the form in the route /order/new and submiting the form, must send a
  "POST, "DELETE", or "PATCH" request to the nearest url (/order/new) so that "action"
  function is called. So, this request is only to call the action function. This
  function receives the "params" and "request" from react-router-dom.
  2) using the received "request: Request" object and the browser API function formData(),
  the data submitted in form can be received easily without using "states" and "submit handler"
  3) the "cart" object can be passed to the "value"of a hidden input by value={JSON.stringify(cart)}
  4) the received data from formData() can be converted to a JS object
  5) This object (order: PostOrderType) has the data type that createOrder() function needs to send
  the POST request to the API
  6) API responds by sending another object (newOrder: FullOrderType) which adds some more properties
  such as "estimatedDelivery" and "createdAt", and "id" to the received oreder object
  7) the received "id" is used to send a "response: Response" to the browser to make the browser redirect
  to order/newOrder.id
  8) as soon as the route changes from order/new to order/:orderId (a new GET request is sent), the "loader"
  function of the route /order/:orderId is called because of this GET request. This function calls getOrder(orderId)
  which sends a GET request to api/order/orderId and when the response is received, the <Order /> is rendered and
  shows the status of the newly created order
*/
