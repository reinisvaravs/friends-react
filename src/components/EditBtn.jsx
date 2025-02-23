import { fetchData } from "./RefreshBtn";
import { useShowRed } from "./ShowRed";

function EditBtn({
  name,
  value,
  setContent,
  setButtonText,
  setName,
  setValue,
}) {
  const { redButton, showRed } = useShowRed();

  const handleEdit = async () => {
    if (!name.trim() || !value.trim()) {
      console.error("Name or value is empty.");
      showRed("editBtn");
      setName("");
      setValue("");
      return;
    }

    try {
      const res = await fetch("/changevalue", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, newValue: value }),
      });

      if (!res.ok) {
        const data = await res.json();
        console.error("Error editing person:", data.error);
        showRed("editBtn");
        setName("");
        setValue("");
        return;
      }

      const updatedContent = await fetchData(); 
      setContent(updatedContent);  
      setName("");
      setValue("");
    } catch (error) {
      console.error("Error editing person:", error);
      showRed("editBtn");
    }
  };

  return (
    <button
      id="editBtn"
      onClick={handleEdit}
      style={{ background: redButton === "editBtn" ? "red" : "" }}
    >
      Edit
    </button>
  );
}

export default EditBtn;
