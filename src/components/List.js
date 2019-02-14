import React, { memo } from "react";
import styled, { keyframes } from "styled-components";

const fadein = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const ListWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  background-color: inherit;
  padding: 1em 1em 0 1em;
`;

const Card = styled.div`
  opacity: 0;
  animation: ${fadein} 1s ease 0.2s 1 forwards;
  text-align: center;
  box-sizing: border-box;
  border-radius: 4px;
  margin: 0.5em;
  height: 100px;
  flex-basis: 100%;
`;

function List({ data = [] }) {
  return (
    <ListWrapper>
      {data.map((item, index) => (
        <Card key={item}>{`item ${item}`}</Card>
      ))}
    </ListWrapper>
  );
}

export default memo(List);
