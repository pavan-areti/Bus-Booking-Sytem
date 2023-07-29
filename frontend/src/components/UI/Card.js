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

  font-size: 2.5rem;
  text-transform: uppercase;
`;

export const CartData = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

export const CardItem = styled.li`
  font-size: 1.5rem;
  list-style: none;
`;

export const CardBody = styled.div``;
