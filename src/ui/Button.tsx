import { ReactNode } from "react";

type ButtonPropsType = {
  children: ReactNode;
  disabled: boolean;
  type: "button" | "reset" | "submit";
  className?: string;
};

function Button({ children, disabled, type, className = "" }: ButtonPropsType) {
  return (
    <button
      disabled={disabled}
      type={type}
      className={`inline-block rounded-full bg-yellow-400 px-4 py-3 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 active:ring-0 active:ring-offset-0 disabled:cursor-not-allowed disabled:bg-yellow-400 sm:px-6 sm:py-4 ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
