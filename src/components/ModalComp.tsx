import styles from "./ModalComp.module.css";

export type TModalProps = {
  showModal: boolean;
  toggleModal: React.Dispatch<React.SetStateAction<boolean>>;
  score: number;
  emoji: string;
  onRetry: () => void;
};

const ModalComp = ({
  showModal,
  toggleModal,
  score,
  emoji,
  onRetry,
}: TModalProps) => {
  return (
    <section
      className={styles.final_result}
      style={{ visibility: showModal ? "visible" : "hidden" }}
    >
      <button onClick={() => toggleModal(false)} className={styles.final_btn}>
        X
      </button>
      <div className={styles.final_container}>
        <h2>Final Score</h2>
        <span className={styles.final_score}>{score}</span>
        <span className={styles.final_icon + " final_icon animate__delay-1s"}>
          {emoji}
        </span>
        <button onClick={onRetry} className={styles.retry_btn}>
          🔁 Retry Game
        </button>
      </div>
    </section>
  );
};

export default ModalComp;
