import React, { memo } from "react";
import styled from "styled-components";
import { useInputValue, useSearch, useDataLoader } from "./custom-hooks";
import SearchInput from "./components/SearchInput";
import Sentinel from "./components/Sentinel";
import List from "./components/List";

const AppContainer = styled.div`
  font-family: Avenir;
  font-size: 1.25rem;
  padding-top: 1em;
  height: 100vh;
  background-color: #fafafa;
`;

const AppHeader = styled.div`
  text-align: center;
  margin: 0 0.5em 0 0.5em;
`;

const ItemCounter = styled.div`
  text-align: center;
  color: #0b6e4f;
  position: fixed;
  width: 150px;
  border: 1px solid #eee;
  line-height: 1em;
  margin-left: 1em;
  padding: 1em;
  top: 1em;
  font-size: 0.75em;

  @media (max-width: 1024px) {
    left: 0;
    right: 0;
    width: 250px;
    margin: 0 auto;
    top: 3.5em;
  }

  @media (max-width: 466px) {
    left: 0;
    right: 0;
    width: 250px;
    margin: 0 auto;
    top: 5em;
  }
`;

const ErrorMsg = styled.div`
  text-align: center;
  color: #904e55;
`;

/**
 * Basic container holding configuration for infinite scroll
 * @useInputValue {function} hook providing input logic to input component
 * @useSearch {function} hook providing input submission helpers and validation
 * @useDataLoader {function} hook providing data prop to list and setter functions
 */
function App() {
  const { inputValue, changeInput, keyInput } = useInputValue();
  const { errorMessage, query, searchQuery } = useSearch();
  const { data, loadInitial, loadMore } = useDataLoader();
  const injectedSearchQuery = () => {
    searchQuery(inputValue);
    loadInitial(query);
  };
  return (
    <AppContainer>
      <AppHeader>Enter the number of elements to render per batch</AppHeader>
      <ItemCounter>Number of items rendered so far: {data.length}</ItemCounter>

      <SearchInput
        inputValue={inputValue}
        onInputChange={changeInput}
        onButtonClick={injectedSearchQuery}
        onInputKeyPress={event => keyInput(event, injectedSearchQuery)}
      />
      {errorMessage ? (
        <ErrorMsg>Error: {errorMessage}</ErrorMsg>
      ) : (
        <List data={data} />
      )}
      {query && <Sentinel callback={() => loadMore(query)} />}
    </AppContainer>
  );
}

export default memo(App);
