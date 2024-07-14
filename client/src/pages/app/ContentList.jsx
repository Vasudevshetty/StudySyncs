import Loader from "./Loader";
import styles from "./styles/app.module.css";

export default function ContentList({ content, handleClick, isLoading }) {
  if (isLoading)
    return (
      <div className={styles.contentList}>
        <Loader />
      </div>
    );
  if (!content.length)
    return <div className={styles.contentList}>No Courses available</div>;

  return (
    <ul className={styles.contentList}>
      {content.map((item) => (
        <li
          key={item._id}
          className={styles.contentListItem}
          onClick={() =>
            typeof item.name !== "undefined"
              ? handleClick(`${item.slug}`)
              : handleClick(`${item.number}`)
          }
        >
          {typeof item.name !== "undefined"
            ? item.name.toUpperCase()
            : `Semester ${item.number}`}
        </li>
      ))}
    </ul>
  );
}
