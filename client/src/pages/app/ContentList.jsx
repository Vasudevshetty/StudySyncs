import styles from "./styles/app.module.css";

export default function ContentList({ content, handleClick }) {
  return (
    <ul className={styles.contentList}>
      {content.map((item) => (
        <li
          key={item}
          className={styles.contentListItem}
          onClick={() => handleClick(`${item}`)}
        >
          {typeof item === "string" ? item.toUpperCase() : `Semester ${item}`}
        </li>
      ))}
    </ul>
  );
}
