import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import axios from "axios";
import configApi from "../../utils/configApi";
import CountdownTimer from "../CounterTimer";
import { useCountdown } from "../CounterTimer/Coundown";
import { useDispatch } from "react-redux";
import { exchangeCodeHandler } from "../../redux/ExchangeCode/actions";
import { spinGiftHandler } from "../../redux/SpinGift/actions";

const RequestOTP = ({
  handleCancel,
  handleOk,
  isModalOpen,
  formSubmit,
  startCoutdown,
  setStartCountdown,
  setIsModalOpenNotify,
}) => {
  const dispatch = useDispatch();
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const configJson = require("../../test.json");
  const [expired, setExpired] = useState(false);

  const [days, hours, minutes, seconds] = useCountdown(
    startCoutdown +
      configJson.flowConfiguration.dataStep2.nodes[0].dataFlow.eventConfig
        .otpTimeValid *
        1000
  );
  useEffect(() => {
    if (days + hours + minutes + seconds <= 0) {
      setExpired(true);
    }
  }, [seconds]);

  const onFinish = (values) => {
    setLoadingSubmit(true);
    dispatch(
      exchangeCodeHandler(
        {
          campaignId: configApi.campaignId,
          code: formSubmit.inputLotteryCode,
          bizId: configApi.bizId,
          phoneNumber: formSubmit.phoneNumber,
          otp: values.OTP.trim(),
          formData: configJson,
        },
        (res) => {
          setLoadingSubmit(false);
          dispatch(
            spinGiftHandler(
              {
                bizId: configApi.bizId,
                campaignId: configApi.campaignId,
                phoneNumber: formSubmit.phoneNumber,
                transactionId: res.transactionId,
                timestamp: res.timestamp,
                signature: res.signature,
              },
              () => {
                handleOk();
                setIsModalOpenNotify(true);
              }
            )
          );
        },
        () => {
          setLoadingSubmit(false);
        }
      )
    );
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handleResendCode = () => {
    axios
      .request({
        method: "POST",
        url: `${configApi.baseUrl}/cppromotion/requestotp`,
        data: {
          campaignId: "6a4b6c03-6a07-47f1-b433-9cebbf65ebb9",
          phoneNumber: formSubmit.phoneNumber,
        },
        headers: {
          "Ocp-Apim-Subscription-Key": configApi.subkey,
        },
      })
      .then((res) => {
        setExpired(false);
        setStartCountdown(new Date().getTime());
      });
  };
  return (
    <Modal
      destroyOnClose
      footer={false}
      closable={false}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <div className="mx-auto text-center">
        <h4>Thông báo</h4>
        <Form
          name="OTP"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="OTP"
            name="OTP"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập OTP",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <div>
            {!expired && <span> Mã OTP sẽ hết hiệu lực trong </span>}
            <CountdownTimer
              setExpired={setExpired}
              targetDate={
                startCoutdown +
                configJson.flowConfiguration.dataStep2.nodes[0].dataFlow
                  .eventConfig.otpTimeValid *
                  1000
              }
            />
          </div>

          <Form.Item className="mt-2">
            {expired ? (
              <Button onClick={handleResendCode}>Resend code</Button>
            ) : (
              <Button loading={loadingSubmit} type="primary" htmlType="submit">
                Submit
              </Button>
            )}
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};
export default RequestOTP;
