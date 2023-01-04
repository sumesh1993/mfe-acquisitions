import { useEffect } from "react";
import dynamic from "next/dynamic";

const useLoggedIn = dynamic(() => import("host/useLoggedIn"));

export default function CTWA() {
  const loggedIn = useLoggedIn();
  console.log("render CTWA", loggedIn);

  return <div>CTWA related content goes here</div>;
}
