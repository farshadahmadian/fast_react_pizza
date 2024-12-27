import { FormEvent, useState } from "react";
import Button from "../../ui/Button";
import { useDispatch } from "react-redux";
import { updateName, initialUserData } from "./userSlice";
import { useNavigate } from "react-router-dom";
import { updateUserLocalStorage } from "./utils";

function CreateUser() {
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!fullName.trim()) return;
    dispatch(updateName(fullName));
    updateUserLocalStorage({ ...initialUserData, username: fullName });
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
