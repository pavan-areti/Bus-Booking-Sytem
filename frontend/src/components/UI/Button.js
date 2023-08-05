import { styled } from "styled-components";

export const ButtonsGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;

  & > * {
    flex: 1;
  }
`;

// eslint-disable-next-line no-undef
export const Button = styled.div`
  background-color: ${(props) => props.$inputColor || "var(--color-primary)"};
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  font-size: 1.5rem;
  cursor: pointer;
`;
