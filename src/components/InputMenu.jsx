import React, { useEffect, useState } from "react";
import AddBtn from "./buttons/AddBtn";
import DeleteBtn, { handleDelete } from "./buttons/DeleteBtn";
import EditBtn from "./buttons/EditBtn";
import RefreshBtn, { fetchData } from "./buttons/RefreshBtn";
import firebaseLogo from "../assets/firebaseLogo.png";
import { FaTrashAlt } from "react-icons/fa";
import contentStyles from "./Content.module.css";
import buttonStyles from "./buttons/Buttons.module.css"

function InputMenu() {
  const [content, setContent] = useState([]);
  const [buttonText, setButtonText] = useState("Refresh");
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [sortOption, setSortOption] = useState("name");

  useEffect(() => {
    const loadData = async () => {
      setButtonText("Loading...");
      const data = await fetchData();
      setContent(data);
      setButtonText("Refresh");
    };
    loadData();
  }, []);

  useEffect(() => {
    setContent((prevContent) =>
      [...prevContent].sort((a, b) => {
        if (sortOption === "name") {
          return a[0].localeCompare(b[0]);
        } else if (sortOption === "value") {
          return a[1].localeCompare(b[1]);
        }
        return 0;
      })
    );
  }, [sortOption]);

  return (
    <>
      <h1 className={contentStyles.heading1}>PADLET.COM CLONE</h1>
      <h2 className={contentStyles.heading2}>html5, css3, javascript, react.js, vite, node.js, express.js, firebase
      </h2>
      <div className={contentStyles.inputsDiv}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="name"
          className={contentStyles.nameInput}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="value"
          className={contentStyles.valueInput}
        />
      </div>
      <div className={buttonStyles.buttonsDiv}>
        <AddBtn
          name={name}
          value={value}
          setName={setName}
          setValue={setValue}
          setContent={setContent}
          setButtonText={setButtonText}
        />
        <EditBtn
          name={name}
          value={value}
          setName={setName}
          setValue={setValue}
          setContent={setContent}
          setButtonText={setButtonText}
        />
        <DeleteBtn name={name} setName={setName} setContent={setContent} />
        <RefreshBtn
          setContent={setContent}
          buttonText={buttonText}
          setButtonText={setButtonText}
        />
      </div>

      <div className={buttonStyles.sortButtons}>
        <button onClick={() => setSortOption("name")}>
          Sort by Name (A-Z)
        </button>
        <button onClick={() => setSortOption("value")}>
          Sort by Value (A-Z)
        </button>
      </div>

      <ul id="content">
        {Array.isArray(content) && content.length > 0 ? (
          content.map(([key, value], index) => (
            <div className={contentStyles.item} key={index}>
              {content.length > 0 && (
                <button
                  onClick={() =>
                    handleDelete(key, setContent, () => {}, setName)
                  }
                >
                  <FaTrashAlt className={contentStyles.trashIcon} />
                </button>
              )}
              <li>
                <b>{key}</b>: {value}
              </li>
            </div>
          ))
        ) : (
          <img src={firebaseLogo} alt="Loading..." className={contentStyles.loadingLogo} />
        )}
      </ul>
    </>
  );
}

export default InputMenu;
