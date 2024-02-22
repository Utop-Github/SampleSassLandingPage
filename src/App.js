import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import theme from './utils/themes'
import Home from './pages/HomePage/Home'
import 'antd/dist/reset.css'
import './utils/bootstrap.css'
import { StyleProvider } from '@ant-design/cssinjs'
import Header from './components/Header'
import './App.css'
import { ConfigProvider } from 'antd'
import { HelmetProvider } from 'react-helmet-async'
import SEO from './components/SEO'
import NotFound from './pages/NotFound'
import Loading from './components/Loading2'

export default function App() {
  const navigate = useNavigate()
  const [isChecked, setIsChecked] = useState(true)
  async function checkBrowser() {
    try {
      await window.utopWidget.checkBrowser()
      setIsChecked(false)
    } catch (err) {
      console.log('err', err)
      setIsChecked(false)
      navigate('/404')
      alert(err.message)
    }
  }
  useEffect(() => {
    checkBrowser()
  }, [])
  return (
    <div className="App">
      <HelmetProvider>
        {/* <SEO
          title={configJson.flowConfiguration.dataStep3.SEOMetadata.Title}
          description={configJson.flowConfiguration.dataStep3.SEOMetadata.Description}
          name="Company name."
        /> */}
        <ConfigProvider theme={theme}>
          <StyleProvider>
            {isChecked && <Loading />}
            <Header />
            <Routes>
              <Route path="/:routeName/" element={<Home />} />
              <Route path="/404" element={<NotFound />} />
            </Routes>
          </StyleProvider>
        </ConfigProvider>
      </HelmetProvider>
    </div>
  )
}
