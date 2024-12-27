import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";
import { updateName, initialUserData, logout } from "./userSlice";
import { updateUserLocalStorage } from "./utils";
import { updateCartLocalStorage } from "../cart/utils";
import { clearCart } from "../cart/cartSlice";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    const isConfirmed = confirm(
      "All your data will be deleted. Are you sure you want to logout?",
    );
    if (!isConfirmed) return;
    dispatch(updateName(""));
    updateUserLocalStorage(initialUserData);
    updateCartLocalStorage({ cart: [] });
    dispatch(clearCart());
    dispatch(logout());
    navigate("/");
  }
  return (
    <Button type="button" sizeType="round" onClick={handleLogout}>
      Logout
    </Button>
  );
}

export default Logout;
