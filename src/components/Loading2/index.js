import React from 'react'
import style from './style.module.scss'
const Loading = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        backgroundColor: 'rgba(240, 242, 245)',
        height: '100vh',
        paddingBottom: '10rem',
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        zIndex: 1000000,
      }}
    >
      <div className={style.loading}></div>
    </div>
  )
}

export default Loading
