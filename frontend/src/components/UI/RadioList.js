import { styled } from "styled-components";

export const RadioList = styled.div`
  display: flex;
  justify-content: center;

  background: var(--color-primary);
  font-size: 1.5rem;
  text-align: center;

  margin-bottom: 2rem;

  & > * {
    flex: 1;
  }
`;

export const RadioButton = styled.div`
  width: 100%;

  & > input {
    display: none;
  }

  & > input:checked + label {
    background: var(--color-secondary);
  }
  & > label {
    padding: 1rem;
    width: 100%;
    height: 100%;
  }
`;

// export const RadioItem = ``;
