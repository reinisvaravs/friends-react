import { useShowRed } from "./ShowRed";
import { fetchData } from "./RefreshBtn";
const API_BASE_URL = import.meta.env.VITE_API_URL;


function AddBtn({ name, value, setContent, setName, setValue }) {
  const { redButton, showRed } = useShowRed();

  const handleAdd = async () => {
    if (!name.trim() || !value.trim()) {
      console.error("Name or value is empty.");
      showRed("addBtn");
      setName("");
      setValue("");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/friends`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [name]: value }),
      });

      if (!res.ok) {
        console.error("Error adding person");
        showRed("addBtn");
        return;
      }

      const updatedContent = await fetchData(); 
      setContent(updatedContent); 
      setName("");
      setValue("");
    } catch (error) {
      console.error("Error:", error);
      showRed("addBtn");
    }
  };

  return (
    <button
      id="addBtn"
      onClick={handleAdd}
      style={{ background: redButton === "addBtn" ? "red" : "" }}
    >
      Add
    </button>
  );
}

export default AddBtn;
