import React, { createContext, useEffect, useState } from 'react'
import { Button, Checkbox, Form, Input, message } from 'antd'
import RequestOTP from '../../components/RequestOTP'

import NotifyPopup from '../NotifyPopup'

export const ModalContext = createContext()
export default function FormSubmit() {
  const masterData = window.masterData
  const utopWidget = window.utopWidget
  const [form] = Form.useForm()
  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const [startCoutdown, setStartCountdown] = useState()
  const [isModalOpenOTP, setIsModalOpenOTP] = useState(false)
  const [isModalOpenNotify, setIsModalOpenNotify] = useState(false)

  const onFinish = async (values) => {
    setLoadingSubmit(true)
    try {
      // const result = await window.utopWidget.requestOTP({
      //   campaignId: masterData.campaignInfo.campaignId,
      //   bizId: masterData.campaignInfo.bizId,
      //   phoneNumber: values.phoneNumber.trim(),
      // })
      // if (!result) {

      // } else {
      //   setLoadingSubmit(false)
      //   showModal()
      //   setStartCountdown(new Date().getTime())
      // }
      const validate = await window.utopWidget.validateFormSubmit(values)
      if (validate) {
        const resExchangeCode = await window.utopWidget.exchangeCode({
          campaignId: masterData.campaignInfo.campaignId,
          bizId: masterData.campaignInfo.bizId,
          code: values.inputLotteryCode,
          phoneNumber: values.phoneNumber,
          // otp: values.OTP.trim(),
          // formData: masterData,
        })
        console.log('resExchangeCode', resExchangeCode)
        const resSpinGift = await window.utopWidget.spinGift({
          campaignId: masterData.campaignInfo.campaignId,
          bizId: masterData.campaignInfo.bizId,
          phoneNumber: values.phoneNumber,
          transactionId: resExchangeCode.transactionId,
          timestamp: resExchangeCode.timestamp,
          signature: resExchangeCode.signature,
        })
        console.log('resSpinGift', resSpinGift)
        setLoadingSubmit(false)
        const notiContent = { ...resSpinGift }
        localStorage.setItem('notiContent', JSON.stringify(notiContent))
        setIsModalOpenNotify(true)
      }
    } catch (err) {
      setLoadingSubmit(false)
      const messageErr = window.utopWidget.getMessageError(err)
      const notiContent = { ...messageErr }
      localStorage.setItem('notiContent', JSON.stringify(notiContent))
      setIsModalOpenNotify(true)
    }
  }

  const showModal = () => {
    setIsModalOpenOTP(true)
  }
  const handleOkOTP = () => {
    setIsModalOpenOTP(false)
  }
  const handleOkNotify = () => {
    setIsModalOpenNotify(false)
  }
  useEffect(() => {
    window.utopWidget.requestOTP()
  }, [])

  return (
    <div className=" d-flex justify-content-center mt-3">
      <Form form={form} className="form-body" name="basic" onFinish={onFinish} autoComplete="off">
        {utopWidget.getFieldsFormSubmit().map((item) => (
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
            labelCol={{ span: 5 }}
            labelAlign="left"
          >
            <Input />
          </Form.Item>
        ))}

        <Form.Item>
          <Button id="utopSubmitFormBtn" loading={loadingSubmit} type="primary" htmlType="submit">
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
  )
}
