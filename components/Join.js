import { PORT } from "../pages/_app";
import styles from "../styles/join.module.css";

export default function Join({ setinfo }) {
  const join = async (event) => {
    event.preventDefault();
    await fetch(`http://localhost:${PORT}/join`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        name: event.target["input"].value,
      }),
    })
      .then((res) =>
        setinfo({
          id: res.headers.get("id"),
          name: event.target["input"].value,
        })
      )
      .catch((e) => console.log(e));
  };

  return (
    <div className={styles.JoinWrapper}>
      <form className={styles.JoinForm} onSubmit={join}>
        <input
          autoComplete="off"
          placeholder="Enter your name"
          className={styles.NameInput}
          type="text"
          name="input"
        />
        <input className={styles.JoinBtn} type="submit" value="Join Chat" />
      </form>
    </div>
  );
}
