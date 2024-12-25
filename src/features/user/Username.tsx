import { useSelector } from "react-redux";
import { RootStateType } from "../../store";

function Username() {
  const username = useSelector(
    (rootState: RootStateType) => rootState.user.username,
  );

  if (!username) return null;

  return (
    <div className="hidden text-sm font-semibold md:block">{username}</div>
  );
}

export default Username;
