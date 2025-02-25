import styles from "./Cards.module.css";
import firebaseLogo from "../../assets/firebaseLogo.png";
import { fetchData } from "../buttons/RefreshBtn/RefreshBtn";
import { useEffect, useState } from "react";
import { FaTrashAlt, FaRegHeart, FaHeart } from "react-icons/fa";
import { handleDelete } from "../buttons/DeleteBtn/DeleteBtn";

function Cards({ content, setContent, setName }) {
  const [likes, setLikes] = useState({}); // Store likes for each card

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchData();
      setContent(data);
    };
    loadData();
  }, [setContent]);

  const handleIsLiked = (key) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [key]: {
        isLiked: !prevLikes[key]?.isLiked,
        likeCount: prevLikes[key]?.isLiked
          ? prevLikes[key].likeCount - 1
          : (prevLikes[key]?.likeCount || 0) + 1,
      },
    }));
  };

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
              <p className={styles.name}>
                <b>{key}</b>
              </p>
              <p className={styles.value}>{value}</p>
            </div>
            <div className={styles.cardFooter}>
              <button
                className={likes[key]?.isLiked ? styles.liked : styles.notLiked}
                onClick={() => handleIsLiked(key)}
              >
                {likes[key]?.isLiked ? <FaHeart /> : <FaRegHeart />}
                <p>{likes[key]?.likeCount || 0}</p>
              </button>
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
