import { MouseEvent, ReactNode } from "react";

type SizeType = "small" | "primary" | "secondary" | "round";

type ButtonPropsType = {
  children: ReactNode;
  disabled?: boolean;
  type: "button" | "reset" | "submit";
  sizeType: SizeType;
  className?: string;
  onClick?: (event: MouseEvent) => void;
};

type StylesType = Record<SizeType, string>;

function Button({
  children,
  disabled = false,
  type,
  sizeType,
  className = "",
  onClick = () => {},
}: ButtonPropsType) {
  const base =
    "inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 active:ring-0 active:ring-offset-0 disabled:cursor-not-allowed disabled:bg-yellow-400";

  const styles: StylesType = {
    primary: `${base} px-4 py-3 md:px-6 md:py-4`,
    small: `${base} text-xs px-4 py-2 md:px-5 md:py-2.5`,
    round: `${base} text-xs px-3 py-2 md:px-3.5 md:py-2.5`,
    secondary:
      "inline-block text-sm rounded-full border-2 border-stone-300 font-semibold uppercase tracking-wide text-stone-400 transition-colors duration-300 hover:bg-stone-300 focus:bg-stone-300 focus:outline-none focus:ring focus:ring-stone-200 focus:text-stone-800 hover:text-stone-800 focus:ring-offset-2 active:ring-0 active:ring-offset-0 disabled:cursor-not-allowed disabled:bg-stone-100 disabled:hover:text-stone-400 px-4 py-2.5 md:px-6 md:py-3.5",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={`${styles[sizeType]} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
