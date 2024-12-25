import { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";

type LinkButtonPropsType = {
  children: ReactNode;
  to: string;
  className?: string;
};

function LinkButton({ children, to, className = "" }: LinkButtonPropsType) {
  const navigate = useNavigate();

  const classNames = `text-sm text-blue-500 hover:text-blue-600 hover:underline ${className}`;

  if (to === "-1")
    return (
      <button className={classNames} onClick={() => navigate(-1)}>
        {children}
      </button>
    );

  return (
    <Link className={classNames} to={to}>
      {children}
    </Link>
  );
}

export default LinkButton;
