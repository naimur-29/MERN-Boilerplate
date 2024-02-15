import { Link } from "react-router-dom";
import UseStateHook from "../Hooks/UseStateHook";
import UseAuth from "../Hooks/UseAuth";

export default function Home() {
  const { state } = UseStateHook();
  const { loading, test } = UseAuth();

  // console.log(test);

  // console.log(state);
  return (
    <div className="homePageContainer bg-lime-300    ">
      <h1>home page </h1>
      <h1>home page </h1>
      <h1>home page </h1>
      <h1>home page </h1>
      <h1>home page </h1>
    </div>
  );
}
