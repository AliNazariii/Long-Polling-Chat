import styles from "../styles/message.module.css";

export default function Message({ name, content, isOut }) {
  return (
    <div
      className={styles.MessageWrapper}
      style={{
        justifyContent: isOut ? "flex-end" : "flex-start",
      }}
    >
      <div
        className={styles.Message}
        style={{
          borderRadius: isOut ? "10px 10px 0 10px" : "10px 10px 10px 0 ",
          backgroundColor: isOut ? "#46c680" : "#f3f3f4",
          color: isOut ? "#ffffff" : "#3f3f4a",
        }}
      >
        {isOut ? null : <h4 className={styles.Sender}>{name}</h4>}
        <p className={styles.Sender}>{content}</p>
      </div>
    </div>
  );
}
