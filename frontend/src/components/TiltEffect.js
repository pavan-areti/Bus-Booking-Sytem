import { styled } from "styled-components";

export const TiltContainer = styled.div`
  position: relative;
  transition: all 0.6s ease-out;
  perspective: 1000px;

  &:hover {
    transition: all 0.3s linear;
    transform: scale(1.1);
  }
`;

export const TiltCard = styled.div`
  position: relative;
  transition: all 0.6s ease-out;
  transform: rotateX(0deg) rotateY(0deg);
  perspective: 1000px;
  transform-style: preserve-3d;
`;

export const AboveLayer = styled.div`
  width: 33.333%;
  height: 33.333%;
  position: absolute;
  z-index: 1;

  &:nth-child(1) {
    left: 0;
    top: 0;
  }
  &:nth-child(2) {
    left: 33.333%;
    top: 0;
  }
  &:nth-child(3) {
    left: 66.666%;
    top: 0;
  }
  &:nth-child(4) {
    left: 0;
    top: 33.333%;
  }
  &:nth-child(5) {
    left: 33.333%;
    top: 33.333%;
  }
  &:nth-child(6) {
    left: 66.666%;
    top: 33.333%;
  }
  &:nth-child(7) {
    left: 0;
    top: 66.666%;
  }
  &:nth-child(8) {
    left: 33.333%;
    top: 66.666%;
  }
  &:nth-child(9) {
    left: 66.666%;
    top: 66.666%;
  }
  &:nth-child(1):hover ~ ${TiltCard} {
    transform: rotateX(-20deg) rotateY(20deg);
  }
  &:nth-child(2):hover ~ ${TiltCard} {
    transform: rotateX(-20deg) rotateY(0deg);
  }
  &:nth-child(3):hover ~ ${TiltCard} {
    transform: rotateX(-20deg) rotateY(-20deg);
  }
  &:nth-child(4):hover ~ ${TiltCard} {
    transform: rotateX(0deg) rotateY(20deg);
  }
  &:nth-child(5):hover ~ ${TiltCard} {
    transform: rotateX(0deg) rotateY(0deg);
  }
  &:nth-child(6):hover ~ ${TiltCard} {
    transform: rotateX(0deg) rotateY(-20deg);
  }
  &:nth-child(7):hover ~ ${TiltCard} {
    transform: rotateX(20deg) rotateY(20deg);
  }
  &:nth-child(8):hover ~ ${TiltCard} {
    transform: rotateX(20deg) rotateY(0deg);
  }
  &:nth-child(9):hover ~ ${TiltCard} {
    transform: rotateX(20deg) rotateY(-20deg);
  }
`;
