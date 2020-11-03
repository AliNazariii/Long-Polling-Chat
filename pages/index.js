import { Fragment, useState } from "react";
import styles from "../styles/index.module.css";
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
