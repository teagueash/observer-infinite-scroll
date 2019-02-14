import { useState } from "react";

export const useInputValue = (initialValue = "") => {
  const [inputValue, setInputValue] = useState(initialValue);

  return {
    inputValue,
    changeInput: e => setInputValue(e.target.event),
    clearInput: () => setInputValue(""),
    keyInput: (e, callback) => {
      if (e.which === 13 || e.keyCode === 13) {
        return true;
      }
      return false;
    }
  };
};
