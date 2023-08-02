import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { Button } from "./UI/Button";
import { Card, CardBody, CardHeading, CartData, CardItem } from "./UI/Card";

function Bus({ bus }) {
  const navigate = useNavigate();
  return (
    <Card className="m-2">
      <CardHeading>{bus.busName}</CardHeading>
      <CartData>
        <CardItem>From : {bus.from}</CardItem>
        <CardItem>To: {bus.to}</CardItem>
        <CardItem>Price: {bus.price}</CardItem>
        <CardItem>Date: {bus.date}</CardItem>
        <CardItem>Arrival: {bus.arrival}</CardItem>
        <CardItem>Departure: {bus.departure}</CardItem>
        <CardItem>Type: {bus.type}</CardItem>
      </CartData>

        <Button
          className="text-2x mt-4"
          onClick={() => {
            navigate(`/book/${bus._id}`);
          }}
        >
          Book Now
        </Button>
    </Card>
  );
}

export default Bus;
