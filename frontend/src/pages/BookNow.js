import React, { useEffect } from "react";
import { Col, message, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../helpers/axiosInstance";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import { useParams } from "react-router-dom";
import SeatSelection from "../components/SeatSelection";

function BookNow() {
  const [bus, setBus] = React.useState([]);
  const dispatch = useDispatch();
  const params = useParams();
  //get buses
  const getBus = async () => {
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
  };

  useEffect(() => {
    getBus();
  }, []);

  return (
    <div>
      {bus && (
        <Row>
          <Col lg={12} sm={24}>
            <h1 className="text-uppercase text-primary">{bus.busName}</h1>
            <hr />
            <div className="text-2x">From - {bus.from}</div>
            <div className="text-2x">To - {bus.to}</div>
            <div className="text-2x">Date - {bus.date}</div>
            <div className="text-2x">Departure - {bus.departure}</div>
            <div className="text-2x">Arrival - {bus.arrival}</div>
            <div className="text-2x">Price - {bus.price}</div>
          </Col>
          <Col lg={12} sm={24}>
            <SeatSelection />
          </Col>
        </Row>
      )}
    </div>
  );
}

export default BookNow;
