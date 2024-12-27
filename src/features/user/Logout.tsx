import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";
import { EMPTY_USER, initialUserData, logout } from "./userSlice";
import { resetUserLocalStorage } from "./utils";
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
    resetUserLocalStorage(EMPTY_USER);
    console.log(initialUserData);
    updateCartLocalStorage({ cart: [] });
    dispatch(logout());
    dispatch(clearCart());
    navigate("/");
  }
  return (
    <Button type="button" sizeType="round" onClick={handleLogout}>
      Logout
    </Button>
  );
}

export default Logout;
