import { useLoaderData } from "react-router-dom";
import MenuItem from "./MenuItem";
import { MenuItemType } from "./types";

function Menu() {
  const menu: MenuItemType[] = useLoaderData();
  return (
    <ul className="divide-y divide-stone-200 px-2">
      {menu.map((menuItem) => (
        <MenuItem key={menuItem.id} pizza={menuItem} />
      ))}
    </ul>
  );
}

export default Menu;
