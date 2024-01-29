import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Modal } from 'antd'
import CountdownTimer from '../CounterTimer'
import { useCountdown } from '../CounterTimer/Coundown'

const RequestOTP = ({
  handleCancel,
  handleOk,
  isModalOpen,
  formSubmit,
  startCoutdown,
  setStartCountdown,
  setIsModalOpenNotify,
}) => {
  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const masterData = window.masterData
  const utopWidgetConfig = window.utopWidgetConfig
  const [expired, setExpired] = useState(false)

  const [days, hours, minutes, seconds] = useCountdown(
    startCoutdown + masterData.dataStep2.nodes[0].dataFlow.eventConfig.otpTimeValid * 1000
  )
  useEffect(() => {
    if (days + hours + minutes + seconds <= 0) {
      setExpired(true)
    }
  }, [seconds])

  const onFinish = async (values) => {
    setLoadingSubmit(true)
    handleOk()
    setIsModalOpenNotify(true)
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  const handleResendCode = async () => {
    await window.utopWidget.requestOTP({
      campaignId: masterData.campaignInfo.campaignId,
      bizId: masterData.campaignInfo.bizId,
      phoneNumber: formSubmit.phoneNumber.trim(),
    })
    setExpired(false)
    setStartCountdown(new Date().getTime())
  }
  return (
    <Modal destroyOnClose footer={false} closable={false} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <div className="mx-auto text-center">
        <h4>Thông báo</h4>
        <Form name="OTP" onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
          <Form.Item
            label="OTP"
            name="OTP"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập OTP',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <div>
            {!expired && <span> Mã OTP sẽ hết hiệu lực trong </span>}
            <CountdownTimer
              setExpired={setExpired}
              targetDate={startCoutdown + masterData.dataStep2.nodes[0].dataFlow.eventConfig.otpTimeValid * 1000}
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
  )
}
export default RequestOTP
