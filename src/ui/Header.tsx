import { Link, useLocation } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";
import Logout from "../features/user/Logout";
import { useSelector } from "react-redux";
import { RootStateType } from "../store";

function Header() {
  const isLoggedIn = useSelector(
    (rootState: RootStateType) => rootState.user.username !== "",
  );
  const location = useLocation();
  return (
    <header
      className={`grid ${isLoggedIn ? "min-h-16 grid-cols-[auto_auto] grid-rows-2" : ""} items-center gap-2 border-b border-stone-200 bg-yellow-500 px-4 py-5 font-semibold uppercase sm:px-4 sm:py-3 md:flex md:items-center md:justify-between md:px-6`}
    >
      {/* Link is a react-router-dom Component and works only if Header component is a component used as the "element" prop of a "route" or it is a child of (nested in) a route component. the value of "to" (/) will append to the path of that route component */}
      <Link to="/" className="row-start-1 tracking-widest">
        Fast React Pizza Co.
      </Link>
      {isLoggedIn && (
        <>
          <SearchOrder />
        </>
      )}
      {location.pathname === "/profile" ? <Logout /> : <Username />}
    </header>
  );
}

export default Header;
