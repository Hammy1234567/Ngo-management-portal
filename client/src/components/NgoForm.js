import React from "react";
import { Button, Col, Form, Input, Row, TimePicker, Upload } from "antd";
import { UserOutlined, LockOutlined, UploadOutlined } from "@ant-design/icons";
import { uploadImage } from "../firebase";
import moment from "moment";

function NgoForm({ onFinish, initialValues }) {
  const getFile = (e) => {
    // console.log("Upload event:", e);

    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const getQrcode = (e) => {
    console.log("Upload event:", e);

    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <Form
      layout="vertical"
      onFinish={(values) => {
        // console.log(values);
        onFinish(values);
      }}
      initialValues={{
        ...initialValues,
        ...(initialValues && {
          timings: [
            moment(initialValues?.timings[0], "HH:mm"),
            moment(initialValues?.timings[1], "HH:mm"),
          ],
        }),
      }}
    >
      <h1 className="card-title mt-2 mb-2">General Information</h1>
      <Row gutter={20}>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Name"
            name="name"
            rules={[{ required: true }]}
          >
            <Input placeholder="Name" />
          </Form.Item>
        </Col>

        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            name="image"
            rules={[
              {
                required: true,
                message: "input Image",
              },
            ]}
            getValueFromEvent={getFile}
            required
          >
            <Upload
              accept=".png,.jpeg,.jpg.,heic"
              beforeUpload={(file) => {
                return false;
              }}
              multiple={false}
              listType="picture"
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
        </Col>

        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Type"
            name="type"
            rules={[{ required: true }]}
          >
            <Input placeholder="Type" />
          </Form.Item>
        </Col>

        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Phone Number"
            name="phoneNumber"
            rules={[{ required: true }]}
          >
            <Input placeholder="Phone Number" />
          </Form.Item>
        </Col>

        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Website"
            name="website"
            rules={[{ required: true }]}
          >
            <Input placeholder="Website" />
          </Form.Item>
        </Col>

        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Address"
            name="address"
            rules={[{ required: true }]}
          >
            <Input placeholder="Address" />
          </Form.Item>
        </Col>
      </Row>
      <hr />
      <h1 className="card-title mt-2 mb-2">Additional Information</h1>
      <Row gutter={20}>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Experience"
            name="experience"
            rules={[{ required: true }]}
          >
            <Input placeholder="Experience" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Timings"
            name="timings"
            rules={[{ required: true }]}
          >
            <TimePicker.RangePicker format="HH:mm" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Description"
            name="description"
            rules={[{ required: true }]}
          >
            <Input placeholder="Description" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Activities"
            name="activities"
            rules={[{ required: true }]}
          >
            <Input placeholder="Activities" />
          </Form.Item>
        </Col>
      </Row>

      <div className="d-flex justify-content-end">
        <Button className="button-ApplyNgo" htmlType="submit">
          SUBMIT
        </Button>
      </div>
    </Form>
  );
}

export default NgoForm;
