import { useState } from "react";

export function useShowRed() {
  const [redButton, setRedButton] = useState(null);

  const showRed = (buttonId) => {
    setRedButton(buttonId);
    setTimeout(() => setRedButton(null), 1000);
  };

  return { redButton, showRed };
}