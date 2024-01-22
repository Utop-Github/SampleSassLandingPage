import React, { useState } from "react";
import { Button, Modal } from "antd";

const NotifyPopup = ({ handleCancel, handleOk, isModalOpen }) => {
  const notiContent = JSON.parse(localStorage.getItem("notiContent"));
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
        <p>{notiContent?.giftName}</p>
        <p>{notiContent?.message}</p>
        <Button type="primary" onClick={handleOk}>
          OK
        </Button>
      </div>
    </Modal>
  );
};
export default NotifyPopup;
