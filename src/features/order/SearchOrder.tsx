import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";

function SearchOrder() {
  const [searchId, setSearchId] = useState("");
  const navigate = useNavigate();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchId(event.target.value);
  }

  function handleSubmit(event: FormEvent) {
    // prevent from creating a new navigation object and reloading the page
    event.preventDefault();
    if (!searchId.trim()) return;
    navigate(`/order/${searchId}`);
    setSearchId("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="col-span-2 col-start-1 row-start-2 flex gap-2"
    >
      <input
        placeholder="search order #"
        type="search"
        value={searchId}
        onChange={handleChange}
        className="flex-grow rounded-full bg-yellow-100 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-50 sm:w-64 sm:focus:w-72"
      />
      <Button
        sizeType="round"
        disabled={false}
        type="submit"
        className="tracking-widest"
      >
        Search
      </Button>
    </form>
  );
}

export default SearchOrder;
