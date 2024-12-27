import { useSelector } from "react-redux";
import { RootStateType } from "../store";
import Home from "./Home";
import Header from "./Header";
import { ReactNode } from "react";

type ProtectedRoutePropsType = {
  children: ReactNode;
};

function ProtectedRoute({ children }: ProtectedRoutePropsType) {
  const isLoggedIn = useSelector(
    (rootState: RootStateType) => rootState.user.username !== "",
  );
  if (!isLoggedIn)
    return (
      <>
        <Header />
        <Home />
      </>
    );

  return children;
}

export default ProtectedRoute;
