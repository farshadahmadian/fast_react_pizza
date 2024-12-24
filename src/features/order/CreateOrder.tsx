import { Form, useActionData, useNavigation } from "react-router-dom";
import { CartItemType } from "../cart/types";

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
  const actionData = useActionData();

  const navigation = useNavigation();
  const isLoading = navigation.state === "loading"; // when redirecting to /order/newOrder.id (sending a GET request to API to get the newly created order)
  const isSubmitting = navigation.state === "submitting"; // when sending a POST request to the API to create a new order
  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;

  /* 
    using react-router-dom "action", it is possible to get the data
    submited in form without using any states and submit handler (action.tsx)
  */

  return (
    <div>
      <h2>Ready to order? Let's go!</h2>

      {/* in order to use react router action to send POST requests to the API,
      the component <Form /> from react-router-dom library must be used instead of the JSX element <form>
      
      the route "action" function is called as soon as a POST, DELETE, or PATCH request is sent to the route,
      e.g. /order/new (so, method must be "POST", "DELETE" or "PATCH" to trigger the "action" function)
      */}
      <Form method="POST" action="/order/new">
        <div>
          <label>First Name</label>
          <input type="text" name="customer" required />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input type="tel" name="phone" required />
          </div>
          {actionData?.phone && <p>{actionData.phone}</p>}
        </div>

        <div>
          <label>Address</label>
          <div>
            <input type="text" name="address" required />
          </div>
        </div>

        <div>
          <input
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
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
          <button disabled={isLoading || isSubmitting}>
            {isSubmitting
              ? "Placing the order"
              : isLoading
              ? "Redirecting to created order"
              : "Order now"}
          </button>
        </div>
      </Form>
    </div>
  );
}

export default CreateOrder;
