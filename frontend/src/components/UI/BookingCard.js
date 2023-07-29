import React from "react";
import { Card, CardHeading, CardItem, CartData } from "./Card";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";

const BookingCard = (props) => {
  const navigate = useNavigate();

  const { busName, busNumber, date, to, from, seats, _id } = props;

  return (
    <Card className="m-2">
      <CardHeading>{busName}</CardHeading>
      <CartData>
        <CardItem>From : {from}</CardItem>
        <CardItem>To: {to}</CardItem>
        <CardItem>Seats: {seats}</CardItem>
        <CardItem>Date: {date}</CardItem>
        {/* <CardItem>Arrival: {bus.arrival}</CardItem> */}
        {/* <CardItem>Departure: {bus.departure}</CardItem> */}
        <CardItem>Number: {busNumber}</CardItem>
      </CartData>

      <Button
        className="text-2x mt-4"
        onClick={() => {
          navigate(`/book/${_id}`);
        }}
      >
        Book Now
      </Button>
    </Card>
  );
};

export default BookingCard;
