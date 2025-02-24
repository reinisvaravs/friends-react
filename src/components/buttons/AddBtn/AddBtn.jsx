import { fetchData } from "../RefreshBtn/RefreshBtn";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const handleAdd = async (name, value, setContent) => {
  if (!name.trim() || !value.trim()) {
    console.error("Name or value is empty.");
    return;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/addfriend`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [name]: value }),
    });

    if (!res.ok) {
      console.error("Error adding person");
      return;
    }

    console.log("Added successfully!");

    // Fetch updated content and update UI
    const updatedContent = await fetchData();
    setContent(updatedContent);  // Refresh the card list after adding

  } catch (error) {
    console.error("Error:", error);
  }
};
