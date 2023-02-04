import Layout from "../components/Layout";
import React from "react";
import { Button, Col, Form, Input, Row } from "antd";
import { TimePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NgoForm from "../components/NgoForm";
import moment from "moment";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";

function ApplyNgo() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    // console.log(values);
    console.log(values.image);
    var img = values.image[0];
    var img2 = img.originFileObj;
    try {
      dispatch(showLoading());
      if (img2 == null) return;
      const imageRef = ref(storage, `NGO/${img2.name}`);

      uploadBytes(imageRef, img2, { contentType: "image/jpeg" }).then(
        (snapshot) => {
          getDownloadURL(snapshot.ref).then(async (url) => {
            delete values.image;
            const response = await axios.post(
              "/api/user/apply-ngo-account",
              {
                ...values,
                logo: url,
                userId: user._id,
                timings: [
                  moment(values.timings[0]).format("HH:mm"),
                  moment(values.timings[1]).format("HH:mm"),
                ],
              },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
            dispatch(hideLoading());
            if (response.data.success) {
              toast.success(response.data.message);
              navigate("/");
            } else {
              toast.error(response.data.message);
            }
          });
        }
      );
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout>
      <h1 className="page-title">APPLY FOR NGO</h1>
      <hr />
      <NgoForm onFinish={onFinish} />
    </Layout>
  );
}

export default ApplyNgo;
