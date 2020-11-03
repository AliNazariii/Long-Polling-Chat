import { useEffect, useState } from "react";
import { PORT } from "../pages/_app";
import styles from "../styles/chat.module.css";

export default function Chat({ info }) {
  const [messages, setMessages] = useState([]);
  const subscribe = async () => {
    await fetch(`http://localhost:${PORT}/subscribe`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        id: info.id,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setMessages([...messages, { name: res.name, content: res.content }])
        console.log(res)
      }
      )
      .then(() => subscribe())
      .catch((e) => console.log(e));
  };

  subscribe();

  const sendMessage = async (event) => {
    event.preventDefault();
    await fetch(`http://localhost:${PORT}/send`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        id: info.id,
      }),
      body: JSON.stringify({
        message: event.target["input"].value,
      }),
    })
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  };

  return (
    <div className={styles.ChatWrapper}>
      <div className={styles.MessagesList}>
        {messages.map((message) => (
          <p key={Math.random()}>{message.content}</p>
        ))}
      </div>
      <form className={styles.MessageForm} onSubmit={sendMessage}>
        <input
          autoComplete="off"
          className={styles.MessageInput}
          type="text"
          name="input"
        />
        <input className={styles.SendBtn} type="submit" value="Send" />
      </form>
    </div>
  );
}
