import React, { useRef } from "react";
import styled from "styled-components";
import { useObserver } from "../custom-hooks";

const SentinelDiv = styled.div`
  width: 100%;
  height: 3em;
  background: transparent;
`;

function Sentinel(props) {
  const target = useRef();
  useObserver({
    target,
    // argument destructures IntersectionObserverEntry.isIntersecting
    onIntersect: ([{ isIntersecting }]) => {
      if (isIntersecting) {
        props.callback();
      }
    }
  });

  return <SentinelDiv ref={target} />;
}

export default Sentinel;
