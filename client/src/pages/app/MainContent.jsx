import styles from "./styles/app.module.css";

function MainContent() {
  return (
    <div className={styles.mainContent}>
      <Banner />
    </div>
  );
}

export default MainContent;

function Banner() {
  return (
    <div className={styles.banner}>
      <div className={styles.bannerBg}></div>
    </div>
  );
}
