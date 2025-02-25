import React, { useState } from "react";
import styles from "./BottomMenu.module.css";
import { handleAdd } from "../buttons/AddBtn/AddBtn";
import { IoIosArrowDown } from "react-icons/io";

function BottomMenu({ setContent }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [cardColor, setCardColor] = useState("white");
  const [colorChoice, setColorChoice] = useState("White")

  const handleNewCard = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSubject("");
    setText("");
  };

  const handlePublish = async () => {
    closeModal();
    await handleAdd(subject, text, setContent);
  };

  const handleColorChoice = () => {
    
  }

  return (
    <div className={styles.container}>
      <button onClick={handleNewCard} className={styles.addBtn}>
        +
      </button>
      {isModalOpen && (
        <div className={styles.popup}>
          <div className={styles.cardHeader}>
            <button className={styles.closeButton} onClick={closeModal}>
              x
            </button>
            <button
              className={`${styles.publichButton} ${
                subject.length > 0 ? styles.active : ""
              }`}
              onClick={handlePublish}
              disabled={subject.length === 0}
            >
              Publish
            </button>
          </div>
          <div className={styles.cardBody}>
            <input
              placeholder="Subject"
              className={styles.nameInput}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <textarea
              placeholder="Write something..."
              className={styles.valueInput}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div className={styles.cardFooter}>
            <button onClick={handleColorChoice}>
              <div></div>
              <p>{colorChoice}</p>
              <IoIosArrowDown className={styles.arrow} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BottomMenu;
