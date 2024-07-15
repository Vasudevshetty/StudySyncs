import styles from "./styles/app.module.css";

const Loader = ({ white }) => (
  <div className={styles.loader}>
    <div
      className={styles.spinner}
      style={{ borderTopColor: white ? "white" : "#0096c7" }} // Adjust the color as needed
    ></div>
  </div>
);

export default Loader;
