import React from "react";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, Form, Input, Row } from "antd";

function UserProfile() {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const params = useParams();

  const getUserData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/get-user-info-by-id",
        {
          userId: params.userId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        setUser(response.data.data);
        console.log(user);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <Layout>
      {user && (
        <div>
          <h1 className="page-title">User Profile</h1>
          <hr />
          <h1 className="card-title mt-2 mb-2">General Information</h1>
          <hr />
          <Row gutter={20}>
            <Col span={8} xs={24} sm={24} lg={8}>
              <h1 className="abnormal-text">
                <b>Name : </b>
                {user.name}
              </h1>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}>
              <h1 className="abnormal-text">
                <b>Email : </b>
                {user.email}
              </h1>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={8} xs={24} sm={24} lg={8}>
              <h1 className="abnormal-text">
                <b>Created at : </b>
                {user.createdAt}
              </h1>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}>
              <h1 className="abnormal-text">
                <b>Updated at : </b>
                {user.updatedAt}
              </h1>
            </Col>
          </Row>
        </div>
      )}
    </Layout>
  );
}

export default UserProfile;
