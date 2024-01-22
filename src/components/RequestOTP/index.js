import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import CountdownTimer from "../CounterTimer";
import { useCountdown } from "../CounterTimer/Coundown";

const RequestOTP = ({
  handleCancel,
  handleOk,
  isModalOpen,
  formSubmit,
  startCoutdown,
  setStartCountdown,
  setIsModalOpenNotify,
}) => {
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const masterData = window.masterData;
  const utopWidgetConfig = window.utopWidgetConfig;
  const [expired, setExpired] = useState(false);

  const [days, hours, minutes, seconds] = useCountdown(
    startCoutdown +
      masterData.dataStep2.nodes[0].dataFlow.eventConfig.otpTimeValid * 1000
  );
  useEffect(() => {
    if (days + hours + minutes + seconds <= 0) {
      setExpired(true);
    }
  }, [seconds]);

  const onFinish = async (values) => {
    setLoadingSubmit(true);
    let statusApiExchangeCode = 0;
    try {
      const resExchangeCode = await window.utopWidget
        .exchangeCode({
          campaignId: utopWidgetConfig.campaignId,
          code: formSubmit.inputLotteryCode,
          bizId: utopWidgetConfig.bizId,
          phoneNumber: formSubmit.phoneNumber,
          otp: values.OTP.trim(),
          formData: masterData,
        })
        .then((res) => {
          if (res.status >= 200 && res.status <= 300) {
            statusApiExchangeCode = 1;
          }
          setLoadingSubmit(false);
          return res.json();
        })
        .then((resExchangeCode) => {
          return resExchangeCode;
        });
      console.log("resExchangeCode", resExchangeCode);

      if (statusApiExchangeCode === 1) {
        const resSpinGift = await window.utopWidget
          .spinGift({
            bizId: utopWidgetConfig.bizId,
            campaignId: utopWidgetConfig.campaignId,
            phoneNumber: formSubmit.phoneNumber,
            transactionId: resExchangeCode.transactionId,
            timestamp: resExchangeCode.timestamp,
            signature: resExchangeCode.signature,
          })
          .then((res) => {
            setLoadingSubmit(false);
            return res.json();
          })
          .then((resSpinGift) => {
            const notiContent = {
              message: resSpinGift?.message,
              giftName: resSpinGift?.giftName,
            };
            localStorage.setItem("notiContent", JSON.stringify(notiContent));
          });
      } else {
        if (resExchangeCode?.error?.code === "InvalidCode") {
          const notiContent = {
            message:
              masterData.dataStep2.nodes[0].dataFlow.eventConfig
                .invalidCodeContent.invalidCode,
          };
          localStorage.setItem("notiContent", JSON.stringify(notiContent));
        } else {
          const notiContent = {
            message:
              masterData.dataStep2.nodes[0].dataFlow.eventConfig
                .invalidCodeContent.invalidOTP,
          };
          localStorage.setItem("notiContent", JSON.stringify(notiContent));
        }
      }
    } catch {}

    handleOk();
    setIsModalOpenNotify(true);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handleResendCode = async () => {
    await window.utopWidget.requestOTP({
      campaignId: window.utopWidgetConfig.campaignId,
      phoneNumber: formSubmit.phoneNumber.trim(),
      bizId: window.utopWidgetConfig.bizId,
    });
    setExpired(false);
    setStartCountdown(new Date().getTime());
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
                masterData.dataStep2.nodes[0].dataFlow.eventConfig
                  .otpTimeValid *
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
