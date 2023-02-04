import { Button, Form, Input } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { hideLoading, showLoading } from "../redux/alertsSlice";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/user/register", values);
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="authentication">
      <div className="authentication-form card p-4">
        <h1 className="card-title">Nice to meet you</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Name" name="name">
            <Input type="text" placeholder="Name" name="name"></Input>
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" placeholder="Email" name="email"></Input>
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input
              placeholder="Password"
              name="password"
              type="password"
            ></Input>
          </Form.Item>
          <Button
            className="primary-button my-2"
            htmlType="submit"
            name="submit"
          >
            REGISTER
          </Button>
          <Link to="/Login" className="anchor mt-2">
            CLICK HERE TO LOGIN
          </Link>
        </Form>
      </div>
    </div>
  );
}

export default Register;
