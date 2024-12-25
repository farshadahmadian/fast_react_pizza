import { FormEvent, useState } from "react";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { updateName } from "./userSlice";
import { useNavigate } from "react-router-dom";
import { updateUserLocalStorage } from "./utils";
import { RootStateType } from "../../store";

function CreateUser() {
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((rootState: RootStateType) => rootState.user);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!fullName.trim()) return;
    dispatch(updateName(fullName));
    updateUserLocalStorage({ ...user, username: fullName });
    setFullName("");
    navigate("/menu");
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-4 text-sm text-stone-600 md:text-base">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        type="text"
        placeholder="Your full name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        className="input mb-8 w-72"
      />

      {fullName !== "" && (
        <div>
          <Button sizeType="primary" type="submit" disabled={false}>
            Start ordering
          </Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
