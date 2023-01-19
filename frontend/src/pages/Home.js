import { Col, message, Row } from 'antd';
import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Bus from '../components/Bus';
import { axiosInstance } from "../helpers/axiosInstance";
import { hideLoading, showLoading } from "../redux/alertsSlice";

function Home() {
  const {user} = useSelector(state => state.users)
  const [buses, setBuses] = React.useState([]);
  const dispatch = useDispatch();

    //get buses
    const getBuses = async () => {
      try {
        dispatch(showLoading());
        const response = await axiosInstance.post("/api/buses/get-buses", {});
        dispatch(hideLoading());
        if (response.data.success) {
          setBuses(response.data.data);
        } else {
          message.error(response.data.message);
        }
      } catch (err) {
        dispatch(hideLoading());
        console.log(err);
      }
    };
  
    useEffect(() => {
      getBuses();
    }, []);

  return (
    <div>
      <div className="">

      </div>
      <div className="">
        <Row>
          {buses.map((bus) => (
            <Col lg={12} xs={24} sm={24}>
                <Bus bus={bus} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  )
}

export default Home