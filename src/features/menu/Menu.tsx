import { useLoaderData } from "react-router-dom";
import MenuItem from "./MenuItem";
import { MenuItemType } from "./types";

function Menu() {
  const menu: MenuItemType[] = useLoaderData();
  return (
    <ul>
      {menu.map(menuItem => (
        <MenuItem key={menuItem.id} pizza={menuItem} />
      ))}
    </ul>
  );
}

export default Menu;
