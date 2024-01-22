import React, { useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import { useSelector } from "react-redux";
import { spinGiftSelector } from "../../redux/SpinGift/selectors";
const NotifyPopup = ({ handleCancel, handleOk, isModalOpen }) => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const spinGiftResult = useSelector((state) => spinGiftSelector(state));
  return (
    <Modal
      footer={false}
      closable={false}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <div className="mx-auto text-center">
        <h4>Thông báo</h4>
        <p>{spinGiftResult?.giftName}</p>
        <p>
          {spinGiftResult?.error
            ? spinGiftResult?.error?.message
            : spinGiftResult?.message}
        </p>
        <Button type="primary" onClick={handleOk}>
          OK
        </Button>
      </div>
    </Modal>
  );
};
export default NotifyPopup;
