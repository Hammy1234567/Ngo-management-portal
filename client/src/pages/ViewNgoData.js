import Layout from "../components/Layout";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Input, Row } from "antd";
import { TimePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import NgoForm from "../components/NgoForm";
import moment from "moment";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

function ViewNgoData() {
  const { user } = useSelector((state) => state.user);
  const [ngo, setNgo] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();
  const getNgoData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/ngo/get-ngo-info-by-id",
        {
          ngoId: params.ngoId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        setNgo(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };
  useEffect(() => {
    getNgoData();
  }, []);
  return (
    <Layout>
      {/* {ngo && (
        <div className="view-ngo-data">
          <h1 className="page-title">{ngo.name}</h1>
          <hr />
          <h1 className="normal-text p-3">
            <div>
              <b>TYPE : </b> {ngo.type}
            </div>
            <br></br>
            <div>
              <b>Phone Number : </b> {ngo.phoneNumber}
            </div>
            <br></br>
            <div>
              <b>Official Website : </b>
              {ngo.website}
            </div>
            <br></br>
            <div>
              <b>address : </b>
              {ngo.address}
            </div>
            <br></br>
            <div>
              <b>experience : </b>
              {ngo.experience}
            </div>
            <br></br>
            <div>
              <b>Timings : </b>
              <div>{ngo.timings[0]}</div>
              <div>{ngo.timings[1]}</div>
            </div>
            <br></br>
          </h1>
        </div>
      )} */}
      {ngo && (
        <div>
          <Row gutter={20}>
            <Col span={8} xs={24} sm={24} lg={8}>
              <h1 className="page-title">{ngo.name}</h1>
              <hr />
            </Col>
          </Row>

          <Row gutter={20}>
            <Col span={8} xs={24} sm={24} lg={8}>
              <Stack direction="row" spacing={2}>
                <Avatar
                  alt=""
                  src={ngo.logo}
                  sx={{ width: 100, height: 100 }}
                />
              </Stack>
              {/* <img src={ngo.logo}></img> */}
              <hr />
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={8} xs={24} sm={24} lg={8}>
              <div className="normal-text">
                <b>TYPE : </b> {ngo.type}
              </div>
            </Col>

            <Col span={8} xs={24} sm={24} lg={8}>
              <div className="normal-text">
                <b>Phone Number : </b> {ngo.phoneNumber}
              </div>
            </Col>

            <Col span={8} xs={24} sm={24} lg={8}>
              <div className="normal-text">
                <b>Official Website : </b> {ngo.website}
              </div>
            </Col>

            <Col span={8} xs={24} sm={24} lg={8}>
              <div className="normal-text">
                <b>Address : </b> {ngo.address}
              </div>
            </Col>

            <Col span={8} xs={24} sm={24} lg={8}>
              <div className="normal-text">
                <b>Experience : </b> {ngo.experience}
              </div>
            </Col>

            <Col span={8} xs={24} sm={24} lg={8}>
              <div className="normal-text">
                <b>Timings : </b> {ngo.timings[0]} - {ngo.timings[1]}
              </div>
            </Col>

            <Col span={8} xs={24} sm={24} lg={8}>
              <div className="normal-text">
                <b>Description : </b> {ngo.description}
              </div>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}>
              <div className="normal-text">
                <b>Activities : </b> {ngo.activities}
              </div>
            </Col>
          </Row>
        </div>
      )}
    </Layout>
  );
}

export default ViewNgoData;
