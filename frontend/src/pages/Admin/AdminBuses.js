import { message, Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import BusForm from "../../components/BusForm";
import PageTitle from "../../components/PageTitle";
import { axiosInstance } from "../../helpers/axiosInstance";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import moment from "moment";
function AdminBuses() {
  const dispatch = useDispatch();
  const [showBusForm, setShowBusForm] = React.useState(false);
  const [buses, setBuses] = React.useState([]);
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
      title: "Bus Capacity",
      dataIndex: "busCapacity",
    },
    {
      title: "From",
      dataIndex: "from",
    },
    {
      title: "To",
      dataIndex: "to",
    },
    {
      title: "journey Date",
      dataIndex: "date",
      render: (date) => {
        return moment(date).format("DD-MM-YYYY");
      },
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (action, record) => {
        return (
          <div className="d-flex flex-row gap-4">
            <i className="ri-delete-bin-line "></i>
            <i className="ri-pencil-line"></i>
          </div>
        );
      },
    },
  ];
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
      <div className="d-flex justify-content-between">
        <PageTitle title="Buses" />
        <button
          className="btn btn-primary"
          onClick={() => {
            setShowBusForm(true);
          }}
        >
          Add Bus
        </button>
      </div>

      <Table
        columns={columns}
        dataSource={buses}
        pagination={{ pageSize: 5 }}
      />

      {showBusForm && (
        <BusForm
          showBusForm={showBusForm}
          setShowBusForm={setShowBusForm}
          type="add"
        />
      )}
    </div>
  );
}

export default AdminBuses;
