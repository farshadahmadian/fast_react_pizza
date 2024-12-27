import { Link, useLocation } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";
import Logout from "../features/user/Logout";

function Header() {
  const location = useLocation();
  return (
    <header className="grid grid-cols-[auto_auto] grid-rows-2 items-center gap-2 border-b border-stone-200 bg-yellow-500 px-4 py-3 font-semibold uppercase md:flex md:items-center md:justify-between md:px-6">
      {/* Link is a react-router-dom Component and works only if Header component is a component used as the "element" prop of a "route" or it is a child of (nested in) a route component. the value of "to" (/) will append to the path of that route component */}
      <Link to="/" className="row-start-1 tracking-widest">
        Fast React Pizza Co.
      </Link>
      <SearchOrder />
      {location.pathname === "/profile" ? <Logout /> : <Username />}
    </header>
  );
}

export default Header;
