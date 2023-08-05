import React from "react";
import { Col, Input, message, Modal, Row } from "antd";
import Form from "antd/es/form/Form";
import { axiosInstance } from "../helpers/axiosInstance";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertsSlice";

function BusForm({
  showBusForm,
  setShowBusForm,
  type,
  selectedBus,
  getData,
  setSelectedBus,
}) {
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      let response = null;
      if (type === "add") {
        response = await axiosInstance.post("/api/buses/add-bus", {
          ...values,
        });
      } else {
        response = await axiosInstance.post("/api/buses/edit-bus", {
          ...values,
          id: selectedBus._id,
        });
      }
      if (response.data.success) {
        message.success(response.data.message);
        setShowBusForm(false);
      } else {
        message.error(response.data.message);
      }
      getData();
      setShowBusForm(false);
      dispatch(hideLoading());
      setSelectedBus(null);
    } catch (err) {
      dispatch(hideLoading());
      console.log(err);
    }
  };
  return (
    <div>
      <Modal
        title="Add Bus"
        width={750}
        open={showBusForm}
        onCancel={() => {
          setSelectedBus(null);
          setShowBusForm(false);
        }}
        footer={null}
      >
        <Form
          layout="vertical"
          className="mt-3"
          onFinish={onFinish}
          initialValues={selectedBus}
        >
          <Row gutter={[10, 10]}>
            <Col lg={24} xs={24}>
              <Form.Item label="Bus Name" name="busName">
                <Input placeholder="Enter Bus Name" />
              </Form.Item>
            </Col>
            <Col lg={12} xs={24}>
              <Form.Item label="Bus Number" name="busNumber">
                <Input placeholder="Enter Bus Name" />
              </Form.Item>
            </Col>
            <Col lg={12} xs={24}>
              <Form.Item label="Bus Capacity" name="busCapacity">
                <Input placeholder="Enter Bus capacity" />
              </Form.Item>
            </Col>
            <Col lg={12} xs={24}>
              <Form.Item label="From" name="from">
                <Input placeholder="from" />
              </Form.Item>
            </Col>
            <Col lg={12} xs={24}>
              <Form.Item label="To" name="to">
                <Input placeholder="to" />
              </Form.Item>
            </Col>
            <Col lg={8} xs={24}>
              <Form.Item label="Date" name="date">
                <Input placeholder="Date" type="date" />
              </Form.Item>
            </Col>
            <Col lg={8} xs={24}>
              <Form.Item label="Arrival" name="arrival">
                <Input placeholder="Arrival" type="time" />
              </Form.Item>
            </Col>
            <Col lg={8} xs={24}>
              <Form.Item label="Departure" name="departure">
                <Input placeholder="Departure" type="time" />
              </Form.Item>
            </Col>
            <Col lg={12} xs={24}>
              <Form.Item label="Type" name="type">
                <Input placeholder="Type" />
              </Form.Item>
            </Col>
            <Col lg={12} xs={24}>
              <Form.Item label="Price" name="price">
                <Input placeholder="price" />
              </Form.Item>
            </Col>
          </Row>

          <div className="d-flex justify-content-end">
            <button className="btn btn-primary" type="submit">
              {type === "add" ? "Add Bus" : "Edit Bus"}
            </button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}

export default BusForm;
