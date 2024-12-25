import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import { RootStateType } from "../store";
import Button from "./Button";
import LinkButton from "./LinkButton";

function Home() {
  const username = useSelector(
    (rootState: RootStateType) => rootState.user.username,
  );
  return (
    <div className="my-10 px-4 text-center sm:my-16">
      <h1 className="mb-8 text-xl font-semibold md:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {!username ? (
        <CreateUser />
      ) : (
        <Button type="button" sizeType="primary">
          <LinkButton
            className="text-stone-800 hover:text-stone-800 hover:no-underline"
            to="/menu"
          >
            Continue Ordering, {username}
          </LinkButton>
        </Button>
      )}
    </div>
  );
}

export default Home;
