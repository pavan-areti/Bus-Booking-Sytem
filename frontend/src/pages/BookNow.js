import React, { useEffect, useCallback } from "react";
import { Col, message, Row } from "antd";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../helpers/axiosInstance";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import { useParams } from "react-router-dom";
import SeatSelection from "../components/SeatSelection";
import "../resources/bus.css";
import StripeCheckout from "react-stripe-checkout";

function BookNow() {
  const [bus, setBus] = React.useState([]);
  const [selectedSeats, setSelectedSeats] = React.useState([]);
  const dispatch = useDispatch();
  const params = useParams();

  //get buses
  const getBus = useCallback(async () => {
    try {
      dispatch(showLoading());
      const response = await axiosInstance.post("/api/buses/get-bus", {
        id: params.id,
      });
      dispatch(hideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        setBus(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (err) {
      dispatch(hideLoading());
      console.log(err);
    }
  }, [dispatch, params.id]);

  const bookNow = async (paymentDetails) => {
    try {
      dispatch(showLoading());
      const response = await axiosInstance.post("/api/bookings/book-seats", {
        bus: params.id,
        seats: selectedSeats,
        transactionId: paymentDetails.id,
        totalAmount: paymentDetails.amount / 100,
      });
      dispatch(hideLoading());

      if (response.data.success) {
        setSelectedSeats([]);
        message.success(response.data.message);
        getBus();
      } else {
        message.error(response.data.message);
      }

      dispatch(hideLoading());
    } catch (err) {
      dispatch(hideLoading());
      console.log(err);
    }
  };
  const onToken = async (token) => {
    try {
      dispatch(showLoading());
      const response = await axiosInstance.post("/api/bookings/make-payment", {
        token,
        amount: selectedSeats.length * bus.price * 100,
      });

      if (response.data.success) {
        message.success(response.data.message);
        bookNow(response.data.data);
      } else {
        message.error(response.data.message);
      }
      dispatch(hideLoading());
    } catch (err) {
      dispatch(hideLoading());
      console.log(err);
    }
  };

  useEffect(() => {
    getBus();
  }, [getBus]);

  return (
    <div>
      {bus && (
        <Row gutter={20}>
          <Col lg={12} sm={24}>
            <h1 className="text-uppercase text-primary">{bus.busName}</h1>
            <hr />
            <div className="text-2x">From - {bus.from}</div>
            <div className="text-2x">To - {bus.to}</div>
            <div className="text-2x">Date - {bus.date}</div>
            <div className="text-2x">Departure - {bus.departure}</div>
            <div className="text-2x">Arrival - {bus.arrival}</div>
            <div className="text-2x">Price - {bus.price}</div>
            <hr />
            <div>
              <h1 className="text-uppercase text-primary">Selected Seats</h1>
              <hr />
              <div className="text-2x">{selectedSeats.join(", ")}</div>
            </div>
            <hr />
            <div>
              <h1 className="text-uppercase text-primary">Price</h1>
              <hr />
              <div className="text-2x">{selectedSeats.length * bus.price}</div>
            </div>
            {/* book now button */}
            <hr />
            <div>
              <StripeCheckout
                token={onToken}
                amount={selectedSeats.length * bus.price * 100}
                currency="INR"
                billingAddress
                stripeKey="pk_test_51MSJ5DSAVoTBcwGh6ypswSlYBkAQAjfI75eFAe38mYqJAzYTC5N2CuvSiuSb4MuzzJ6Zd4GW4YQjlxkOGKodOR7b00uVNzC8Py"
              >
                <button
                  className={`btn btn-primary btn-block ${
                    selectedSeats.length === 0 && "btn-disabled"
                  }}`}
                  disabled={selectedSeats.length === 0}
                >
                  Book Now
                </button>
              </StripeCheckout>
            </div>
          </Col>
          <Col lg={12} sm={24}>
            <SeatSelection
              selectedSeats={selectedSeats}
              setSelectedSeats={setSelectedSeats}
              bus={bus}
            />
          </Col>
        </Row>
      )}
    </div>
  );
}

export default BookNow;
