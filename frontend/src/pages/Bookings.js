import React, { useCallback, useEffect, useState } from "react";
import { axiosInstance } from "../helpers/axiosInstance";
import { useSelector } from "react-redux";
import { Table, message } from "antd";

const Bookings = () => {
  const { user } = useSelector((state) => state.users);
  const [bookings, setBookings] = useState([]);
  // bus
  // :
  // {_id: '63c6394dd54265a53c911c27', busNumber: '765', busName: 'asdfer', busCapacity: 40, from: 'Bhimavaram, Andhra Pradesh', …}
  // createdAt
  // :
  // "2023-01-19T12:57:25.963Z"
  // seats
  // :
  // (2) [1, 2]
  // status
  // :
  // "Pending"
  // totalAmount
  // :
  // 200
  // transactionId
  // :
  // "123456789"
  // updatedAt
  // :
  // "2023-01-19T12:57:25.963Z"
  // user
  // :
  // "63c6348666136bd78dad526d"
  // __v
  // :
  // 0
  // _id
  // :
  // "63c93e35c06b964dda656d2b"

  const CancelBooking = async (id) => {
    try {
      const response = await axiosInstance.post(
        "/api/bookings/cancel-booking",
        {
          bookingId: id,
        }
      );

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
      busName: booking.bus.busName,
      busNumber: booking.bus.busNumber,
      date: booking.bus.date,
      to: booking.bus.to,
      from: booking.bus.from,
      seats: booking.seats,
      _id: booking._id,
    };
  });

  const columns = [
    {
      title: "Bus Name",
      dataIndex: "busName",
    },
    {
      title: "Bus Number",
      dataIndex: "busNumber",
    },
    {
      title: "Travel Date",
      dataIndex: "date",
    },
    {
      title: "Departure",
      dataIndex: "from",
    },
    {
      title: "Arrival",
      dataIndex: "to",
    },
    {
      title: "seats",
      dataIndex: "seats",
      render: (seats) => {
        return seats.map((seat) => {
          return <> {seat},</>;
        });
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (action, record) => {
        return (
          <div className="d-flex flex-row gap-4">
            <i
              className="ri-delete-bin-line "
              role="button"
              onClick={() => {
                CancelBooking(record._id);
              }}
            ></i>
            <i className="ri-eye-line" role="button" onClick={() => {}}></i>
          </div>
        );
      },
    },
  ];

  const getUserBookings = useCallback(async () => {
    const res = await axiosInstance.post("/api/bookings/user-bookings", {
      user: user,
    });
    setBookings(res.data.data);
  }, [user]);

  useEffect(() => {
    getUserBookings();
  }, [getUserBookings]);

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default Bookings;
