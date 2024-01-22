import React, { createContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import { Button, Checkbox, Form, Input } from "antd";
import RequestOTP from "../../components/RequestOTP";
import axios from "axios";
import configApi from "../../utils/configApi";
import { useDispatch } from "react-redux";
import { requestOTPHandler } from "../../redux/RequestOTP/actions";
import NotifyPopup from "../NotifyPopup";

export const ModalContext = createContext();
export default function FormSubmit() {
  const configJson = require("../../test.json");
  const [form] = Form.useForm();
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [startCoutdown, setStartCountdown] = useState();
  const [isModalOpenOTP, setIsModalOpenOTP] = useState(false);
  const [isModalOpenNotify, setIsModalOpenNotify] = useState(false);

  const dispatch = useDispatch();
  const onFinish = (values) => {
    console.log("Success:", values);
    setLoadingSubmit(true);
    dispatch(
      requestOTPHandler(
        {
          campaignId: configApi.campaignId,
          phoneNumber: values.phoneNumber.trim(),
          bizId: configApi.bizId,
        },
        () => {
          setLoadingSubmit(false);
          setStartCountdown(new Date().getTime());
          showModal();
        },
        () => {
          setLoadingSubmit(false);
        }
      )
    );
  };

  const showModal = () => {
    setIsModalOpenOTP(true);
  };
  const handleOkOTP = () => {
    setIsModalOpenOTP(false);
  };
  const handleOkNotify = () => {
    setIsModalOpenNotify(false);
  };

  return (
    <div className=" d-flex justify-content-center mt-3">
      <Form
        form={form}
        className="form-body"
        name="basic"
        onFinish={onFinish}
        autoComplete="off"
      >
        {configJson.flowConfiguration.dataStep2.nodes[0].dataFlow.eventConfig.lotteryCodeFields.map(
          (item) => (
            <Form.Item
              key={item.attributeName}
              label={item.labelText}
              name={item.attributeName}
              rules={[
                {
                  required: item.isRequired,
                  message: `Vui lòng nhập ${item.labelText}`,
                },
              ]}
            >
              <Input />
            </Form.Item>
          )
        )}

        <Form.Item>
          <Button loading={loadingSubmit} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <RequestOTP
        startCoutdown={startCoutdown}
        formSubmit={form.getFieldsValue()}
        isModalOpen={isModalOpenOTP}
        handleOk={handleOkOTP}
        setStartCountdown={setStartCountdown}
        setIsModalOpenNotify={setIsModalOpenNotify}
      />
      <NotifyPopup isModalOpen={isModalOpenNotify} handleOk={handleOkNotify} />
    </div>
  );
}
