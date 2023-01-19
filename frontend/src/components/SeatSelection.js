import { Col, Row } from "antd";
import React from "react";

const SeatSelection = ({ selectedSeats, setSelectedSeats, bus }) => {
  const capacity = bus.busCapacity;

  //select or unselect seat
  const selectOrUnselectSeat = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((item) => item !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };
  return (
    <div>
      <div className="bus-container">
        <Row gutter={[10, 10]}>
          {Array.from(Array(capacity).keys()).map((seat) => {
            let seatclass = '';
            if (selectedSeats.includes(seat + 1)) {
                seatclass = 'selected-seat';
            }
            else if (bus.seatsBooked?.includes(seat + 1)) {
                seatclass = 'booked-seat';
            }

            return <Col span={6} key={seat}>
              <div
                className = {`seat ${seatclass}`}
                onClick={() => {
                  selectOrUnselectSeat(seat + 1);
                }}
              >
                {seat + 1}
              </div>
            </Col>;
          })}
        </Row>
      </div>
    </div>
  );
};

export default SeatSelection;
