import { Link } from "react-router-dom";
import styles from "./styles/app.module.css";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Link to="/">Home</Link>
    </div>
  );
}

export default Sidebar;
