import { Col, message, Row } from "antd";
import React, { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import Bus from "../components/Bus";
import { axiosInstance } from "../helpers/axiosInstance";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import { setBusesInStore } from "../redux/busesSlice";
import { useLocation } from "react-router-dom";

function Home() {
  // const { user } = useSelector((state) => state.users);
  const [buses, setBuses] = React.useState([]);
  const location = useLocation();
  const dispatch = useDispatch();
  
  const searchParams = new URLSearchParams(location.search);
  const from = searchParams.get('from') || '';
  const to = searchParams.get('to') || '';
  const date = searchParams.get('date') || '';

  //get buses
  const getBuses = useCallback(async () => {
    try {
      dispatch(showLoading());
      const response = await axiosInstance.post("/api/buses/get-buses", {});
      dispatch(hideLoading());
      if (response.data.success) {
        setBuses(response.data.data);
        dispatch(setBusesInStore(response.data.data));
      } else {
        message.error(response.data.message);
      }
    } catch (err) {
      dispatch(hideLoading());
      console.log(err);
    }
  }, [dispatch]);

  useEffect(() => {
    getBuses();
  }, [getBuses]);


  const filteredBuses = buses.filter((bus) => {
    const busDate = new Date(bus.date); // Assuming you have a date property in the bus object
    const searchDate = date !== "" ? new Date(date) : null;
    
    return (
      bus.from.toLowerCase().includes(from.toLowerCase()) &&
      bus.to.toLowerCase().includes(to.toLowerCase()) &&
      (!searchDate || busDate.toDateString() === searchDate.toDateString())
    );
  });


  return (
    <div>
      <div className=""></div>
      <div className="">
        <Row>
          {filteredBuses.map((bus, i) => (
            <Col key={i} lg={8} xs={24} sm={24} className="d-flex">
              <Bus bus={bus} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default Home;
