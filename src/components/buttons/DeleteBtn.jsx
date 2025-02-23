import { fetchData } from "./RefreshBtn";
import { useShowRed } from "../sideFunctions/ShowRed";
const API_BASE_URL = import.meta.env.VITE_API_URL;

export const handleDelete = async (name, setContent, showRed, setName) => {
  if (!name.trim()) {
    console.error("Name field is empty.");
    showRed(name);
    setName("");
    return;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/friends`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Error deleting:", errorData.error);
      showRed(name);
      setName("");
      return;
    }

    const updatedContent = await fetchData();
    setContent(updatedContent);
    setName("");
  } catch (error) {
    console.error("Error deleting person:", error);
    showRed(name);
    setName("");
  }
};

// ✅ Keep DeleteBtn as a component that works with input values
function DeleteBtn({ name, setContent, setName }) {
  const { redButton, showRed } = useShowRed();

  return (
    <button
      id="deleteBtn"
      onClick={() => handleDelete(name, setContent, showRed, setName)}
      style={{ background: redButton === name ? "red" : "" }}
    >
      Delete
    </button>
  );
}

export default DeleteBtn;
