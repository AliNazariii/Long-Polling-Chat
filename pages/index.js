import { useState } from "react";
import Join from "../components/Join";
import Chat from "../components/Chat";

export default function index() {
  const [info, setInfo] = useState(false);
  return info ? (
    <Chat info={info} signOut={setInfo} />
  ) : (
    <Join setinfo={setInfo} />
  );
}
