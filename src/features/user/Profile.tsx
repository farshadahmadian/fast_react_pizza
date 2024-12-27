import { useSelector } from "react-redux";
import { RootStateType } from "../../store";
import { Link } from "react-router-dom";
import { updateUserLocalStorage } from "./utils";

function Profile() {
  const user = useSelector((rootState: RootStateType) => rootState.user);
  updateUserLocalStorage(user);

  return (
    <div>
      <h1 className="mb-10 mt-6 text-xl font-semibold">
        Welcome, <span className="italic">{user.username}</span>
      </h1>
      {user.orderIds.length > 0 ? (
        <>
          <p className="mb-4">Here is your orders list:</p>
          <ul>
            {user.orderIds.map((orderId) => (
              <li key={orderId} className="mb-1">
                <Link
                  className="text-blue-400 underline"
                  to={`/order/${orderId}`}
                >
                  {orderId}
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>You do not have any order</p>
      )}
    </div>
  );
}

export default Profile;
