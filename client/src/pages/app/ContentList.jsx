import styles from "./styles/app.module.css";

export default function ContentList({ content, handleClick }) {
  if (!content.length) return <div>No Courses available</div>;

  return (
    <ul className={styles.contentList}>
      {content.map((item) => (
        <li
          key={item._id}
          className={styles.contentListItem}
          onClick={() =>
            typeof item.name !== "undefined"
              ? handleClick(`${item.name}`)
              : handleClick(`Semester ${item.number}`)
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
