import Loader from "./Loader";
import styles from "./styles/app.module.css";

function Description({ isLoading, content }) {
  if (isLoading)
    return (
      <div className={styles.descriptionContainer}>
        <Loader />
      </div>
    );
  return (
    <div className={styles.descriptionContainer}>
      <p className={styles.descriptionText}>{content}</p>
    </div>
  );
}

export default Description;
