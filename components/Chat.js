import { useEffect, useRef, useState } from "react";
import { PORT } from "../pages/_app";
import styles from "../styles/chat.module.css";
import Message from "./Message";

export default function Chat({ info, signOut }) {
  const [messages, setMessages] = useState([]);
  const messageInput = useRef(null);
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
        setMessages((preMessages) => [
          ...preMessages,
          { name: res.name, content: res.content, id: res.id },
        ]);
        console.log(res);
      })
      .then(() => subscribe())
      .catch((e) => {
        console.log(e);
        signOut(false);
      });
  };

  useEffect(() => {
    subscribe();
  }, []);

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
      .then(() => {
        messageInput.current.value = "";
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className={styles.ChatWrapper}>
      <div className={styles.MessagesList}>
        {messages.map((message) => (
          <Message
            key={Math.random()}
            content={message.content}
            name={message.name}
            isOut={message.id === info.id}
          />
        ))}
      </div>
      <form className={styles.MessageForm} onSubmit={sendMessage}>
        <input
          ref={messageInput}
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
