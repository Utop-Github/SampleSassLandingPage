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
        let statusApiExchangeCode = 0
        const resExchangeCode = await window.utopWidget
          .exchangeCode({
            campaignId: masterData.campaignInfo.campaignId,
            bizId: masterData.campaignInfo.bizId,
            code: values.inputLotteryCode,
            phoneNumber: values.phoneNumber,
            // otp: values.OTP.trim(),
            // formData: masterData,
          })
          .then((res) => {
            if (res.status >= 200 && res.status <= 300) {
              statusApiExchangeCode = 1
              message.success('Gửi thành công!')
            }
            return res.json()
          })
          .then((resExchangeCode) => {
            return resExchangeCode
          })
        if (statusApiExchangeCode === 1) {
          console.log('resExchangeCode', resExchangeCode)
          const resSpinGift = await window.utopWidget
            .spinGift({
              campaignId: masterData.campaignInfo.campaignId,
              bizId: masterData.campaignInfo.bizId,
              phoneNumber: values.phoneNumber,
              transactionId: resExchangeCode.transactionId,
              timestamp: resExchangeCode.timestamp,
              signature: resExchangeCode.signature,
            })
            .then((res) => {
              setLoadingSubmit(false)
              return res.json()
            })
            .then((resSpinGift) => {
              setIsModalOpenNotify(true)
              const notiContent = {
                message: masterData.dataStep2.nodes[1].dataFlow.eventConfig.configGeneral.winningContent.replaceAll(
                  '@(giftname)',
                  resSpinGift?.giftName
                ),
                giftName: resSpinGift?.giftName,
                giftId: resSpinGift?.giftId,
              }
              localStorage.setItem('notiContent', JSON.stringify(notiContent))
            })
        } else {
          setLoadingSubmit(false)
          setIsModalOpenNotify(true)
          switch (resExchangeCode?.error?.code.toLowerCase()) {
            case 'invalidcode': {
              const notiContent = {
                message: masterData.dataStep2.nodes[0].dataFlow.eventConfig.invalidCodeContent.invalidCode,
              }
              localStorage.setItem('notiContent', JSON.stringify(notiContent))
              break
            }
            case 'invalidotp': {
              const notiContent = {
                message: masterData.dataStep2.nodes[0].dataFlow.eventConfig.invalidCodeContent.invalidOTP,
              }
              localStorage.setItem('notiContent', JSON.stringify(notiContent))
              break
            }
            case 'codeisused': {
              const notiContent = {
                message: masterData.dataStep2.nodes[0].dataFlow.eventConfig.invalidCodeContent.codeUsed.replaceAll(
                  '@(lotterycode)',
                  values.inputLotteryCode
                ),
              }
              localStorage.setItem('notiContent', JSON.stringify(notiContent))
              break
            }
            case 'holdcodefailure': {
              const notiContent = {
                message: masterData.dataStep2.nodes[0].dataFlow.eventConfig.invalidCodeContent.codeUsed.replaceAll(
                  '@(lotterycode)',
                  values.inputLotteryCode
                ),
              }
              localStorage.setItem('notiContent', JSON.stringify(notiContent))
              break
            }
            default:
              break
          }
        }
      }
    } catch (err) {
      console.error('Error', err)
      message.error(err.message, 5)
      setLoadingSubmit(false)
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
  )
}
