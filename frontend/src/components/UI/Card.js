import { styled } from "styled-components";

export const Card = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 2rem;
  color: white;
  background: var(--color-grey-dark);
  border-radius: 1.5rem;
`;

export const CardHeading = styled.p`
  padding: 0rem 1rem 1rem 2rem;
  margin-bottom: 2rem;

  border-bottom: 1px solid var(--color-primary);

  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  font-size: 2.5rem;
  text-transform: uppercase;
`;

export const CardData = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

export const CardItem = styled.li`
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  font-size: 1.5rem;
  list-style: none;
`;

export const CardBody = styled.div``;
