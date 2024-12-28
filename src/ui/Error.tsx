import { useRouteError } from "react-router-dom";

import LinkButton from "./LinkButton";

function Error() {
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
    <div className="px-4 py-3">
      <h1 className="mt-6">Something went wrong 😢</h1>
      {message && <p>{message}</p>}
      <LinkButton to="-1">&larr;Go back</LinkButton>
    </div>
  );
}

export default Error;
