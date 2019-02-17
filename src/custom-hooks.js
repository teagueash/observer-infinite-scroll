import { useState, useEffect } from "react";

/*
 * @useObserver {function} hook providing observer to sentinel component
 */
export const useObserver = ({ target, onIntersect }) => {
  useEffect(() => {
    const observer = new IntersectionObserver(onIntersect);
    if (!target) return;

    observer.observe(target.current);

    return () => {
      observer.unobserve(target.current);
    };
  });
};

/*
 * @useSearch {function} hook providing input submission helpers and validation
 */
export const useSearch = () => {
  const [data, setData] = useState([]);
  const [counter, setCounter] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);

  // helper function to apply validation and conditionally return an integer
  const validateQuery = q => {
    if (q % 1 !== 0) {
      // enforce integer only
      setErrorMessage("Input must be a whole, non-zero integer");
      return false;
    } else if (parseInt(q) <= 0) {
      // enforce greater than 0
      setErrorMessage("Input must be a positive non-zero integer");
      return false;
    } else {
      setErrorMessage(null);
      return parseInt(q);
    }
  };

  return {
    data,
    errorMessage,
    loadInitial: q => {
      const validatedQ = validateQuery(q);
      // query is valid, perform operation
      if (validatedQ) {
        const list = [...Array(validatedQ)].map((_, index) => index);
        setCounter(list.length);
        setData(list);
        return;
      }
      setCounter(0);
      setData([]);
    },
    loadMore: q => {
      const validatedQ = validateQuery(q);
      // query is valid, perform operation
      if (validatedQ) {
        const list = [...Array(validatedQ)].map((_, index) => counter + index);
        setCounter(list.length + counter);
        setData([...data, ...list]);
        return;
      }
      setCounter(0);
      setData([]);
    }
  };
};

/*
 * @useInputValue {function} hook providing input logic to input component
 */
export const useInputValue = (initialValue = "") => {
  const [inputValue, setInputValue] = useState(initialValue);

  return {
    inputValue,
    changeInput: e => {
      setInputValue(e.target.value);
    },
    keyInput: (e, callback) => {
      if (e.which === 13 || e.keyCode === 13) {
        callback(inputValue);
        return true;
      }
      return false;
    }
  };
};
