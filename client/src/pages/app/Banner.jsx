import styles from "./styles/app.module.css";

function Banner({ img }) {
  return (
    <div className={styles.banner}>
      <div
        className={styles.bannerBg}
        style={{
          backgroundImage: `url(/img/${img})`,
        }}
      >

      </div>
    </div>
  );
}

export default Banner;
