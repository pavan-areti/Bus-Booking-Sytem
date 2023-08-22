import React from "react";
import { styled } from "styled-components";

const LightsContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 2;
  top: 10px;
`;

const LeftLight = styled.div`
  position: absolute;
  width: 36rem;
  height: 36rem;
  background-color: #fc2424;
  filter: blur(100px);
  border-radius: 50%;

  left: 10px;
`;

const RightLight = styled.div`
  position: absolute;
  width: 360px;
  height: 360px;
  background-color: #005bff;
  filter: blur(100px);
  border-radius: 50%;

  right: 10px;
  bottom: 10px;
`;

const CornerLights = () => {
  return (
    <LightsContainer>
      <LeftLight />
      <RightLight />
    </LightsContainer>
  );
};

export default CornerLights;
