import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

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
      />
      <button type="submit">Seach</button>
    </form>
  );
}

export default SearchOrder;
