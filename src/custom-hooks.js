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
 * @useDataLoader {function} hook providing data prop to list and setter functions
 */
export const useDataLoader = () => {
  const [data, setData] = useState([]);
  const [counter, setCounter] = useState(0);

  return {
    data,
    loadInitial: n => {
      if (n === "" || n === null) return;
      const list = [...Array(n)].map((_, index) => index);
      setCounter(list.length);
      setData(list);
    },
    loadMore: n => {
      const list = [...Array(n)].map((_, index) => counter + index);
      setCounter(list.length + counter);
      setData([...data, ...list]);
    }
  };
};

/*
 * @useSearch {function} hook providing input submission helpers and validation
 */
export const useSearch = () => {
  const [query, setQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [clearSearch, setClearSearch] = useState(false);

  return {
    query,
    searchQuery: q => {
      if (
        isNaN(q) ||
        (q.includes(".") && parseFloat(q) > Math.floor(parseFloat(q)))
      ) {
        // enforce integer only
        setErrorMessage("Input must be a whole, non-zero integer");
        setQuery(null);
      } else if (parseInt(q) <= 0) {
        // enforce greater than 0
        setErrorMessage("Input must be a positive non-zero integer");
        setQuery(null);
      } else {
        const searchFlag = parseInt(q) !== parseInt(query);
        setErrorMessage(null);
        setClearSearch(searchFlag);
        setQuery(parseInt(q));
      }
    },
    clearSearch,
    errorMessage
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
