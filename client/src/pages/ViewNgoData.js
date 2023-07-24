import Layout from "../components/Layout";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Input, Row } from "antd";
import { TimePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import ngoManagementQRCode from "../../src/ngo-management__qrcode.png";

import {
  Link,
  Navigate,
  Route,
  useNavigate,
  useParams,
} from "react-router-dom";
import NgoForm from "../components/NgoForm";
import moment from "moment";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Stripe from "stripe";
import { Table } from "antd";
import BookDonation from "./Ngo/BookDonation";

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
  if (ngo) {
    const columns = [
      {
        title: "Field",
        dataIndex: "field",
        key: "field",
        width: "10%",
        style: { fontWeight: "bold", fontSize: "20px" },
        className: "table-header",
      },
      {
        title: "Value",
        dataIndex: "value",
        key: "value",
        width: "10%",
        style: { fontSize: "20px" },
        className: "table-row",
      },
    ];

    const dataSource = [
      {
        key: "logo",
        field: "Logo",
        value: (
          <Avatar
            src={ngo.logo}
            alt="NGO Logo"
            // style={{ width: "160px", height: "160px", marginRight: "10px" }}
            sx={{
              width: 150,
              height: 150,

              objectFit: "cover",
            }}
          />
        ),
      },
      {
        key: "1",
        field: <b>Name</b>,
        value: ngo.name,
      },
      {
        key: "2",
        field: "Type",
        value: ngo.type,
      },
      {
        key: "3",
        field: "Original Website",
        value: ngo.website,
      },
      {
        key: "4",
        field: "Address",
        value: ngo.type,
      },
      {
        key: "5",
        field: "Timings",
        value: ngo.timings[0] - ngo.timings[1],
      },
      {
        key: "6",
        field: "Phone Number",
        value: ngo.phoneNumber,
      },
      {
        key: "7",
        field: "Description",
        value: ngo.description,
      },
      {
        key: "8",
        field: "Activities",
        value: ngo.activities,
      },
      {
        key: "9",
        field: "Experience",
        value: ngo.experience,
      },
      {
        key: "10",
        field: "Donation Raised",
        value: ngo.donation,
      },
      {
        key: "11",
        field: "Donation gateway",
        value: (
          <a
            className="custom-dbox-popup"
            href="https://donorbox.org/ngo-management"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://donorbox.org/images/png-donate/button-medium-blue.png"
              alt="Donate"
            />
          </a>
        ),
      },
      {
        key: "12",
        field: "Donation QR Code",
        value: (
          <img
            src={ngoManagementQRCode}
            alt="QR Code"
            style={{
              width: "15vw",
              height: "26vh",
              borderRadius: "10px",
              border: "3px solid #fff",
            }}
          />
        ),
      },
      // add more rows as needed
    ];

    return (
      <Layout>
        {ngo && (
          <div>
            <h1 className="page-title" style={{ fontSize: "50px" }}>
              {ngo.name}
            </h1>
            <hr />
            <Table
              dataSource={dataSource}
              columns={columns}
              pagination={false}
              showHeader={false}
              style={{ borderCollapse: "separate", borderSpacing: "0 10px" }}
              className="custom-table"
            />

            <img
              src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hhcml0eXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
              style={{
                width: "30vw",
                height: "40vh",
                objectFit: "cover",
                borderRadius: "50%",
                marginLeft: "20px",
                border: "3px solid #fff",
              }}
            />
          </div>
        )}
      </Layout>
    );
  }
}

export default ViewNgoData;
