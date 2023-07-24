import Layout from "../../components/Layout";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Input, Row } from "antd";
import { TimePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import NgoForm from "../../components/NgoForm";
import moment from "moment";

function BookDonation() {
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
      {ngo && (
        <div>
          <h1 className="page-title">{ngo.name}</h1>
        </div>
      )}
    </Layout>
  );
}

export default BookDonation;
