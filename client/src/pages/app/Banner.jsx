import Loader from "./Loader";
import styles from "./styles/app.module.css";

function Banner({ img, title, isLoading }) {
  if (isLoading)
    return (
      <div className={styles.banner}>
        <Loader white />
      </div>
    );

  return (
    <div className={styles.banner}>
      <h1 className={styles.bannerTitle}>
        {title.split(" ").map((word, index) => (
          <span key={index}>
            {word}
            {index % 3 == 0 && <br />}
          </span>
        ))}
      </h1>
      <div
        className={styles.bannerBg}
        style={{
          backgroundImage: `url(/img/${img})`,
        }}
      ></div>
    </div>
  );
}

export default Banner;
