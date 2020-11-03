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
          backgroundColor: isOut ? "#00a9d3" : "#686868",
        }}
      >
        {isOut ? null : <h4 className={styles.Sender}>{name}</h4>}
        <p className={styles.Sender}>{content}</p>
      </div>
    </div>
  );
}
