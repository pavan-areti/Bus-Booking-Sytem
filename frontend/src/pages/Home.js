import { Col, message, Row } from "antd";
import React, { useEffect, useCallback } from "react";
import Bus from "../components/Bus";
import { axiosInstance } from "../helpers/axiosInstance";
import { useLocation } from "react-router-dom";
import useStore from "../stores/store";

function Home() {
  // const { user } = useSelector((state) => state.users);
  const {showLoading,hideLoading} = useStore((state)=>state.alertsSlice)
  const {setBusesInStore} = useStore((state)=>state.busesSlice)
  const [buses, setBuses] = React.useState([]);
  const location = useLocation();
  
  const searchParams = new URLSearchParams(location.search);
  const from = searchParams.get('from') || '';
  const to = searchParams.get('to') || '';
  const date = searchParams.get('date') || '';

  //get buses
  const getBuses = useCallback(async () => {
    try {
      showLoading();
      const response = await axiosInstance.post("/api/buses/get-buses", {});
      hideLoading();
      if (response.data.success) {
        setBuses(response.data.data);
        setBusesInStore(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (err) {
      hideLoading();
      console.log(err);
    }
  }, [hideLoading, setBusesInStore, showLoading]);

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

  console.log(filteredBuses)
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
