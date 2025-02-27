import { Col, Row, message } from "antd";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import { UserCard } from "../../components/UI/UserCard";
import { Button } from "../../components/UI/Button";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [userChanges, setUserChanges] = useState({});

  const dispatch = useDispatch();

  const handleFieldChange = (userId, field, value) => {
    setUserChanges((prevState) => ({
      ...prevState,
      [userId]: {
        ...prevState[userId],
        [field]: value,
      },
    }));
  };

  const getUsers = useCallback(async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/users/get-users", {});
      if (response.data.success) {
        message.success("users fetched succesfully");
        setUsers(response.data.data);
      } else {
        message.error(response.data.message);
      }
      dispatch(hideLoading());
    } catch (err) {
      dispatch(hideLoading());
      message.error(err.message);
    }
  }, [dispatch]);

  const onSave = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/users/update-access", {
        data: userChanges,
      });
      if (response.data.success) {
        message.success("users updated succesfully");
        getUsers();
      } else {
        message.error(response.data.message);
      }
      dispatch(hideLoading());
    } catch (err) {
      dispatch(hideLoading());
      message.error(err.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <div>
      <Button onClick={onSave}>Save</Button>

      <Row className="m-2">
        {users.map((user, i) => (
          <Col key={i} lg={8} xs={24} sm={24}>
            <UserCard
              user={user}
              userChanges={userChanges}
              setUserChanges={setUserChanges}
              handleFieldChange={handleFieldChange}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default AdminUsers;
