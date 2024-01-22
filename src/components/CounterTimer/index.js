import React from 'react'
import { useCountdown } from './Coundown'
import { Typography } from 'antd'

const CountdownTimer = ({ targetDate, setExpired }) => {
  const { Text } = Typography
  const [days, hours, minutes, seconds] = useCountdown(targetDate)

  if (days + hours + minutes + seconds <= 0) {
    // setExpired(true)
    return <div></div>
  } else {
    return <Text style={{ fontWeight: 'bold' }} type="danger">{`${minutes} : ${seconds} `}</Text>
  }
}
export default CountdownTimer
