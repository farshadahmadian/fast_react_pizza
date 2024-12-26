import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "../../store";
import Button from "../../ui/Button";
import { updateName } from "./userSlice";
import { useNavigate } from "react-router-dom";
import { updateUserLocalStorage } from "./utils";
import { updateCartLocalStorage } from "../cart/utils";

function Username() {
  const username = useSelector(
    (rootState: RootStateType) => rootState.user.username,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(updateName(""));
    updateUserLocalStorage({ username: "" });
    updateCartLocalStorage({ cart: [] });
    navigate("/");
  }

  if (!username) return null;

  return (
    <div className="col-start-2 row-start-1 flex items-center gap-2 justify-self-end">
      <div className="text-sm font-semibold md:block">{username}</div>
      <Button type="button" sizeType="round" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}

export default Username;
