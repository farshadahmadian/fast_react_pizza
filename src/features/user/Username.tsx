import { useSelector } from "react-redux";
import { RootStateType } from "../../store";
import Button from "../../ui/Button";
import LinkButton from "../../ui/LinkButton";

function Username() {
  const username = useSelector(
    (rootState: RootStateType) => rootState.user.username,
  );

  if (!username) return null;

  return (
    <div className="col-start-2 row-start-1 flex items-center gap-2 justify-self-end">
      <Button type="button" sizeType="round">
        <LinkButton
          className="!text-xs text-stone-800 hover:text-stone-800 hover:no-underline"
          to="/profile"
        >
          profile
        </LinkButton>
      </Button>
    </div>
  );
}

export default Username;
