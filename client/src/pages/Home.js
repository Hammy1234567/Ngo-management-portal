import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { Col, Row } from "antd";
import Ngo from "../components/Ngo";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
function Home() {
  const [ngos, setNgos] = useState([]);
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("/api/user/get-all-approved-ngos", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        }, // headers
      });
      dispatch(hideLoading());
      if (response.data.success) {
        setNgos(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Layout>
      <Row gutter={20}>
        {ngos.map((ngo) => (
          <Col span={8} xs={24} sm={24} lg={8}>
            <Ngo ngo={ngo} />
          </Col>
        ))}
      </Row>
    </Layout>
  );
}

export default Home;
