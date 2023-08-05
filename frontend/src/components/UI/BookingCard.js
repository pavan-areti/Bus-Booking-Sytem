import React from "react";
import { Card, CardHeading, CardItem, CardData } from "./Card";
import { Button, ButtonsGroup } from "./Button";
import { useNavigate } from "react-router-dom";

export const BookingCard = (props) => {
  const navigate = useNavigate();

  const {
    busName,
    busNumber,
    date,
    to,
    from,
    arrival,
    departure,
    seats,
    _id,
    amount,
    busId,
  } = props.data;

  const { handleDelete } = props;

  const seatsformat = seats.map((seat) => {
    return seat + ",";
  });
  return (
    <Card className="m-2">
      <CardHeading>{busName}</CardHeading>
      <CardData>
        <CardItem>From : {from}</CardItem>
        <CardItem>To: {to}</CardItem>
        <CardItem>Arrival: {arrival}</CardItem>
        <CardItem>Departure: {departure}</CardItem>
        <CardItem>Seats: {seatsformat}</CardItem>
        <CardItem>Date: {date}</CardItem>
        <CardItem>Number: {busNumber}</CardItem>
        <CardItem>Amount: {amount}</CardItem>
      </CardData>

      <ButtonsGroup>
        <Button
          className="text-2x mt-4"
          onClick={() => {
            navigate(`/book/${busId}`);
          }}
        >
          View
        </Button>
        <Button
          className="text-2x mt-4"
          onClick={() => {
            handleDelete(_id);
          }}
          $inputColor="var(--color-secondary)"
        >
          Delete
        </Button>
      </ButtonsGroup>
    </Card>
  );
};
