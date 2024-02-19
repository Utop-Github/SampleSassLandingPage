import React, { createContext, useEffect, useMemo, useState } from 'react'
import { Button, Checkbox, DatePicker, Form, Input, Radio, Select, message } from 'antd'
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
  const listZone = useMemo(() => {
    const listOrigin = window.utopWidget.getListZone()
    if (listOrigin) {
      const newList = listOrigin.map((item) => ({ value: item, label: item }))
      return newList
    }
    return []
  }, [])

  const onFinish = async (values) => {
    let formatValues = { ...values }
    if (values.hasOwnProperty('dob')) {
      const dob = new Date(values.dob)
      formatValues.dob = `${dob.getDate() > 9 ? dob.getDate() : '0' + dob.getDate()}/${
        dob.getMonth() + 1 > 9 ? dob.getMonth() + 1 : '0' + (dob.getMonth() + 1)
      }/${dob.getFullYear()}`
    }

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
      const validate = await window.utopWidget.validateFormSubmit(formatValues)
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
          <>
            {(item.attributeName === 'inputLotteryCode' ||
              item.attributeName === 'phoneNumber' ||
              item.attributeName === 'name' ||
              item.attributeName === 'address' ||
              item.attributeName === 'email') && (
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
                <Input
                  maxLength={
                    item.attributeName === 'name' || item.attributeName === 'email'
                      ? 50
                      : item.attributeName === 'phoneNumber'
                      ? 10
                      : item.attributeName === 'address'
                      ? 100
                      : null
                  }
                />
              </Form.Item>
            )}
            {(item.attributeName === 'zone' || item.attributeName === 'province') && (
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
                <Select
                  mode="tags"
                  style={{
                    width: '100%',
                  }}
                  options={item.attributeName === 'province' ? [] : listZone}
                />
              </Form.Item>
            )}
            {item.attributeName === 'dob' && (
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
                <DatePicker
                  style={{
                    width: '100%',
                  }}
                  placeholder=""
                  showToday={false}
                  format="DD/MM/YYYY"
                />
              </Form.Item>
            )}
            {item.attributeName === 'gender' && (
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
                <Radio.Group style={{ width: '100%', textAlign: 'left' }}>
                  <Radio value="M">Nam</Radio>
                  <Radio value="F">Nữ</Radio>
                  <Radio value="O">Khác</Radio>
                </Radio.Group>
              </Form.Item>
            )}
          </>
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
