import React from "react";

export const fetchData = async () => {
  try {
    const res = await fetch("/friends");
    if (!res.ok) {
      throw new Error(`Network response was not ok: ${res.statusText}`);
    }

    const result = await res.json();

    return Object.entries(result.data || {}).sort((a, b) =>
      a[0].localeCompare(b[0])
    );
  } catch (error) {
    console.error("Error fetching content:", error);
    return [["Error", "Error loading content"]];
  }
};

export function RefreshBtn({ setContent, buttonText, setButtonText }) {
  const handleRefresh = async () => {
    setButtonText("Refreshing...");
    const data = await fetchData();
    setContent(data);
    setButtonText("Refresh ✅");

    setTimeout(() => {
      setButtonText("Refresh");
    }, 1000);
  };

  return (
    <button id="refreshBtn" onClick={handleRefresh}>
      {buttonText}
    </button>
  );
}

export default RefreshBtn;
