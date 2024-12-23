import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      {/* Link is a react-router-dom Component and works only if Header component is a component used as the "element" prop of a "route" or it is a child of (nested in) a route component. the value of "to" (/) will append to the path of that route component */}
      <Link to="/">Fast React Pizza Co.</Link>

      <p>John Doe</p>
    </header>
  );
}

export default Header;
