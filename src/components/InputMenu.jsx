import React, { useEffect, useState } from "react";
import AddBtn from "./AddBtn";
import DeleteBtn, { handleDelete } from "./DeleteBtn";
import EditBtn from "./EditBtn";
import RefreshBtn, { fetchData } from "./RefreshBtn";
import firebaseLogo from "../assets/firebaseLogo.png";
import { FaTrashAlt } from "react-icons/fa";

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
      <h1 className="heading1">CRUD - NODE.JS - FIREBASE</h1>
      <div className="inputs-div">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="name"
          className="nameInput"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="value"
          className="valueInput"
        />
      </div>
      <div className="buttons-div">
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

      <div className="sort-buttons">
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
            <div className="item" key={index}>
              {content.length > 0 && (
                <button onClick={() => handleDelete(key, setContent, () => {}, setName)}>
                  <FaTrashAlt className="trash-icon" />
                </button>
              )}
              <li>
                <b>{key}</b>: {value}
              </li>
            </div>
          ))
        ) : (
          <img src={firebaseLogo} alt="Loading..." id="loadingLogo" />
        )}
      </ul>
    </>
  );
}

export default InputMenu;
