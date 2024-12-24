import { useNavigate, useRouteError } from "react-router-dom";

function Error() {
  const navigate = useNavigate();
  const error = useRouteError(); // <Error /> is used as "errorElement" in "router", so it has access to the custom hook useRouteError()

  let message = "";

  if (
    error instanceof Object &&
    "data" in error &&
    typeof error["data"] === "string"
  )
    message = error.data;
  else if (
    error instanceof Object &&
    "message" in error &&
    typeof error["message"] === "string"
  )
    message = error.message;

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      {message && <p>{message}</p>}
      <button onClick={() => navigate(-1)}>&larr; Go back</button>
    </div>
  );
}

export default Error;
