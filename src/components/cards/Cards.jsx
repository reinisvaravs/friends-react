import styles from "./Cards.module.css";
import firebaseLogo from "../../assets/firebaseLogo.png";
import { fetchData } from "../buttons/RefreshBtn/RefreshBtn";
import { useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { handleDelete } from "../buttons/DeleteBtn/DeleteBtn";

function Cards({ content, setContent, setName }) {
  useEffect(() => {
    const loadData = async () => {
      const data = await fetchData();
      setContent(data);
    };
    loadData();
  }, [setContent]);

  return (
    <div className={styles.cardDiv}>
      {Array.isArray(content) && content.length > 0 ? (
        content.map(([key, value]) => (
          <div className={styles.card} key={key}>
            <div className={styles.cardHeader}>
              <button
                onClick={() => handleDelete(key, setContent, () => {}, setName)}
              >
                <FaTrashAlt className={styles.trashIcon} />
              </button>
            </div>
            <div className={styles.cardBody}>
              <p>
                <b>{key}</b>
              </p>
              <p>{value}</p>
            </div>
            <div className={styles.cardFooter}>
              <button className={styles.likeButton}>Like 0</button>
              <button className={styles.commentButton}>Comment 0</button>
            </div>
          </div>
        ))
      ) : (
        <img
          src={firebaseLogo}
          alt="Loading..."
          className={styles.firebaseLogo}
        />
      )}
    </div>
  );
}

export default Cards;
