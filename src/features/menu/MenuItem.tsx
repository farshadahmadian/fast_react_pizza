import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { MenuItemType } from "./types";

type MenuItemPropsType = {
  pizza: MenuItemType;
};

function MenuItem({ pizza }: MenuItemPropsType) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex flex-grow flex-col">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-end justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}
          <Button type="button" sizeType="small" disabled={soldOut}>
            add to cart
          </Button>
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
