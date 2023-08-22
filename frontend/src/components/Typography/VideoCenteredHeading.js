import { styled } from "styled-components";

export const VideoCenteredHeading = styled.h2`
  font-size: clamp(20px, 8vw, 100px);
  text-align: center;
  font-weight: 700;
  color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 6;
`;
