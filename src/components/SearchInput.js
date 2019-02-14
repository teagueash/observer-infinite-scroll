import React, { memo } from "react";
import styled from "styled-components";

const SearchInputWrapper = styled.div`
  padding: 1.5em 0 1em 0;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 1024px) {
    padding: 4em 0 1em 0;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  border: 1px solid #dfe1e5;
  border-radius: 8px;
  height: 2em;
  width: 50%;
  background-color: #eee;
  transition: all 0.25s ease-out;
  &:hover {
    box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);
    border-color: rgba(223, 225, 229, 0);
  }
  &:focus-within {
    background-color: #fff;
    border-color: #dfe1e5;
  }
  @media (max-width: 767px) {
    width: 300px;
  }
`;

const StyledInput = styled.input`
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  flex-grow: 2;
  padding: 0 1em 0 1em;
  border: none
  font-size: 0.75em;
  background: none;
  transition: all 0.25s ease-out;
  &:focus {
    outline: none;
  }
`;

function SearchInput(props) {
  return (
    <SearchInputWrapper>
      <StyledForm noValidate onSubmit={e => e.preventDefault()}>
        <StyledInput
          type="text"
          placeholder="enter a whole number"
          value={props.inputValue}
          onChange={props.onInputChange}
          onKeyPress={props.onInputKeyPress}
          required
        />
      </StyledForm>
    </SearchInputWrapper>
  );
}

export default memo(SearchInput);
