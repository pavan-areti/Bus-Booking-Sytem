import React, { useCallback, useEffect, useState } from "react";
// import { axiosInstance } from "../helpers/axiosInstance";
import { useSelector } from "react-redux";
import { Col, Row, message } from "antd";
import axios from "axios";
import { BookingCard } from "../components/UI/BookingCard";
import { RadioButton, RadioList } from "../components/UI/RadioList";

const Bookings = () => {
  const [filter, setFilter] = useState("all");
  const { user } = useSelector((state) => state.users);

  const [bookings, setBookings] = useState([]);

  const CancelBooking = async (id) => {
    try {
      const response = await axios.post("/api/bookings/cancel-booking", {
        bookingId: id,
      });

      if (response.data.success) {
        message.success(response.data.message);
        getUserBookings();
      } else {
        message.error(response.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const dataSource = bookings.map((booking) => {
    return {
      busName: booking.bus?.busName,
      busNumber: booking.bus?.busNumber,
      busId: booking.bus?._id,
      date: booking.bus?.date,
      to: booking.bus?.to,
      arrival: booking.bus?.arrival,
      departure: booking.bus?.departure,
      from: booking.bus?.from,
      seats: booking.seats,
      amount: booking.totalAmount,
      _id: booking._id,
    };
  });

  const currentDate = new Date();

  const completedBuses = [];
  const notCompletedBuses = [];

  dataSource.forEach((bus) => {
    const completionDate = new Date(bus.date);

    if (completionDate < currentDate) {
      completedBuses.push(bus);
    } else {
      notCompletedBuses.push(bus);
    }
  });

  const getUserBookings = useCallback(async () => {
    const res = await axios.post("/api/bookings/user-bookings", {
      user: user,
    });
    setBookings(res.data.data);
  }, [user]);

  useEffect(() => {
    getUserBookings();
  }, [getUserBookings]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredBuses =
    filter === "completed"
      ? completedBuses
      : filter === "notCompleted"
      ? notCompletedBuses
      : dataSource;

  return (
    <div>
      <RadioList>
        <RadioButton>
          <input
            type="radio"
            id="all"
            value="all"
            checked={filter === "all"}
            onChange={handleFilterChange}
          />
          <label htmlFor="all">All Buses</label>
        </RadioButton>
        <RadioButton>
          <input
            type="radio"
            id="notCompleted"
            value="notCompleted"
            checked={filter === "notCompleted"}
            onChange={handleFilterChange}
          />
          <label htmlFor="notCompleted">Upcoming</label>
        </RadioButton>
        <RadioButton>
          <input
            type="radio"
            id="completed"
            value="completed"
            checked={filter === "completed"}
            onChange={handleFilterChange}
          />
          <label htmlFor="completed">Completed</label>
        </RadioButton>
      </RadioList>
      <Row>
        {filteredBuses.map((data, i) => (
          <Col key={i} lg={8} xs={24} sm={24} className="d-flex">
            <BookingCard
              data={data}
              handleDelete={CancelBooking}
              className="m-2"
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Bookings;
