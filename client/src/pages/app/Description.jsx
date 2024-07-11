import styles from "./styles/app.module.css";

function Description({ content }) {
  return (
    <div className={styles.descriptionContainer}>
      <p className={styles.descriptionText}>{content}</p>
    </div>
  );
}

export default Description;
