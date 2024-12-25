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
    <form onSubmit={handleSubmit}>
      <input
        placeholder="search order number"
        type="search"
        value={searchId}
        onChange={handleChange}
        className="w-28 rounded-full bg-yellow-100 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-50 sm:w-64 sm:focus:w-72"
      />
      <Button className="ml-2 !py-2 !text-sm" disabled={false} type="submit">
        Search
      </Button>
    </form>
  );
}

export default SearchOrder;
