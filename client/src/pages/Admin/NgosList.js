import Layout from "../../components/Layout";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import axios from "axios";
import { Table } from "antd";
import { toast } from "react-hot-toast";

function NgosList() {
  const [ngos, setNgos] = useState([]);
  const dispatch = useDispatch();
  const getNgosData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("/api/admin/get-all-ngos", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (response.data.success) {
        setNgos(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  const changeNgoStatus = async (record, status) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/admin/change-ngo-account-status",
        { ngoId: record._id, userId: record.userId, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        getNgosData();
      }
    } catch (error) {
      toast.error("Error changing ngo account status");
      dispatch(hideLoading());
    }
  };
  useEffect(() => {
    getNgosData();
  }, []);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => <span>{record.name}</span>,
    },

    {
      title: "Phone",
      dataIndex: "phoneNumber",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
    },
    {
      title: "status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" && (
            <h1
              className="anchor"
              onClick={() => changeNgoStatus(record, "approved")}
            >
              Approve
            </h1>
          )}
          {record.status === "approved" && (
            <h1
              className="anchor"
              onClick={() => changeNgoStatus(record, "blocked")}
            >
              Block
            </h1>
          )}
        </div>
      ),
    },
  ];
  return (
    <Layout>
      <h1 className="page-header">Ngos List</h1>
      <Table columns={columns} dataSource={ngos} />
    </Layout>
  );
}

export default NgosList;
