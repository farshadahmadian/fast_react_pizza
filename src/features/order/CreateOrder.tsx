import { Form, useActionData, useNavigation } from "react-router-dom";
import { CartItemType } from "../cart/types";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "../../store";
import { updateName } from "../user/userSlice";
import { ChangeEvent, useState } from "react";
import { updateUserLocalStorage } from "../user/utils";

const fakeCart: CartItemType[] = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  // const newOrderId = useActionData();
  // const navigate = useNavigate();
  const user = useSelector((rootState: RootStateType) => rootState.user);
  const [newFullName, setNewFullName] = useState(user.username);
  const dispatch = useDispatch();
  const actionData = useActionData();

  const navigation = useNavigation();
  const isLoading = navigation.state === "loading"; // when redirecting to /order/newOrder.id (sending a GET request to API to get the newly created order)
  const isSubmitting = navigation.state === "submitting"; // when sending a POST request to the API to create a new order
  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;

  function handleSubmit() {
    // default action must NOT be prevented, because a POST request must be sent to the current url (/order/new) just to get the form data, using the browser API formData() method. After that, a POST request must be sent to the API to create the new order. Then there must be a redirection to /order/newOrder.id by sending a response to the browser. As soon as route changes to /order/newOrder.id a GET request is sent to the API to get the status of the newly created order.

    // event.preventDefault();
    dispatch(updateName(newFullName));
    updateUserLocalStorage({ ...user, username: newFullName });
    // if event default action is prevented, we can return "newOrder.id" instead of redirect(), from the route "action" function, then use the hook useActionData() in this component to get the "id" and use useNavigate() in this component to navigate to /order/newOrderId (because navigate() or redirect() works even with event.preventDefault()) But the problem is that, by event.preventDefault() the POST request to the "form action" (/order/new) cannot be sent. so browser API formData() returns undefined, therefore the POST request to the API to create a new order will be sent by "undefined" instead of the "user data + cart". The API will return "undefined" instead of the "new order id", and navigate() makes the browser to navigate to /order/undefined which results in an <Error /> page. redirect() and navigate() send response to the browser so that it can redirect or navigate to a new url and fetch() sends an HTTP request to a server so they work when event.preventDefault(), but event.preventDefault() prevents the response from being sent to the browser to go to the "action" attribute of the form (which is the current url /order/new)

    // console.log(newOrderId);
    // console.log(`/order/${newOrderId}`);
    // navigate(`/order/${newOrderId}`);
  }

  /* 
    using react-router-dom "action", it is possible to get the data submited in form without using any states and submit handler (action.tsx)
  */
  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      {/* in order to use react router action to send POST requests to the API,
      the component <Form /> from react-router-dom library must be used instead of the JSX element <form>
      
      the route "action" function is called as soon as a POST, DELETE, or PATCH request is sent to the route,
      e.g. /order/new (so, method must be "POST", "DELETE" or "PATCH" to trigger the "action" function)
      */}
      <Form onSubmit={handleSubmit} method="POST" action="/order/new">
        <div className="label-input-container">
          <label>Full Name</label>
          <input
            defaultValue={user.username}
            value={newFullName}
            className="input"
            type="text"
            name="customer"
            required
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setNewFullName(event.target.value)
            }
          />
        </div>

        <div className="label-input-container sm:grid sm:grid-cols-[8rem_1fr]">
          <label>Phone number</label>
          <div className="flex-grow">
            <input className="input w-full" type="tel" name="phone" required />
          </div>
          {actionData?.phone && (
            <p className="top-0 col-start-2 mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
              {actionData.phone}
            </p>
          )}
        </div>

        <div className="label-input-container">
          <label>Address</label>
          <div className="flex-grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              required
            />
          </div>
        </div>

        <div className="label-input-container mb-12 gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="flex-grow font-medium" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          {/* after the form is submitted, besides the form data (name, address,
          phone, priority), the "cart" value is needed to send the POST request
          to the API to create a new order. To get all the data easily without using 
          states and submit handler, react-router-dom "action" can be used to get the 
          submitted data ("cart" value can be submitted as the value of a hidden input)
          and then, when all the required data for sending the POST request to the API 
          is ready, the POST request can be sent using fetch function (createOrder(order))
          and the response received from the server, which is the new order, can be used 
          to render <Order /> when routing to /order/:orderId if orderId === newOrder.id */}
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button
            sizeType="primary"
            type="submit"
            disabled={isLoading || isSubmitting}
          >
            {isSubmitting
              ? "Placing the order ..."
              : isLoading
                ? "Redirecting to created order ..."
                : "Order now"}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default CreateOrder;
