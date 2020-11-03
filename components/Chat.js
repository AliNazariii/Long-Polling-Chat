import { useEffect, useRef, useState } from "react";
import { PORT } from "../pages/_app";
import styles from "../styles/chat.module.css";
import Message from "./Message";

export default function Chat({ info, signOut }) {
  const [messages, setMessages] = useState([]);
  const messageInput = useRef(null);
  const subscribe = async () => {
    await fetch(`http://localhost:${PORT}/subscribe?random=${Math.random()}`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        id: info.id,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          subscribe();
          return res.json();
        } else if (res.status === 401) {
          signOut(false);
          return;
        }
      })
      .then((res) => {
        setMessages((preMessages) => [
          ...preMessages,
          { name: res.name, content: res.content, id: res.id },
        ]);
        // console.log(res);
      })
      .catch((e) => console.log(`Error ${e}`));
  };

  useEffect(() => {
    subscribe();
    messageInput.current.focus();
  }, []);

  const sendMessage = async (event) => {
    event.preventDefault();
    if (messageInput.current.value.trim() === "") return;
    await fetch(`http://localhost:${PORT}/send`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        id: info.id,
      }),
      body: JSON.stringify({
        message: messageInput.current.value,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          setMessages((preMessages) => [
            ...preMessages,
            {
              name: info.name,
              content: messageInput.current.value,
              id: info.id,
            },
          ]);
        } else if (res.status === 401) {
          signOut(false);
        }
        messageInput.current.value = "";
        // console.log(res);
      })
      .catch((e) => console.log(`Error ${e}`));
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
      <form className={styles.FooterForm} onSubmit={sendMessage}>
        <input
          ref={messageInput}
          autoComplete="off"
          className={styles.MessageInput}
          type="text"
          name="input"
        />
        <img
          src="/ic_send.svg"
          className={styles.SendBtn}
          onClick={sendMessage}
        />
      </form>
    </div>
  );
}
