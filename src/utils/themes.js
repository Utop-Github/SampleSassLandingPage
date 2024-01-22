import { theme as antdTheme } from 'antd'

const theme = {
  token: {
    algorithm: antdTheme.defaultAlgorithm,
    // colorBgBase: "#F8F8F8",
    colorPrimary: '#F46F20',
    colorPrimaryBg: '#FEF1E9',
    colorLink: '#4284ff',
    // fontFamily: 'Roboto',
    colorBgLayout: 'transparent',
  },
  components: {
    Button: {
      controlHeight: 36,
      colorText: '#878787',
    },
    Card: {
      borderRadiusLG: 14,
      colorBorderSecondary: '#E0E0E0',
      fontWeightStrong: 500,
    },
    Modal: {
      paddingContentHorizontalLG: 32,
      paddingMD: 32,
    },
    Table: {
      colorBorderSecondary: '#d9d9d9',
    },
    Typography: {
      fontWeightStrong: 500,
    },
    Dropdown: {
      controlItemBgHover: '#FEF1E9',
    },
  },
}

const borderColor = '#E0E0E0'

const customColor = {
  primary: `#F46F20`,
  success: `#7AD655`,
  info: `#4284FF`,
  danger: `#FF4D4F`,
  disabled: '#D0D0D0',
  gray: '#808080',
  white: '#FFFFFF',
  gray2: '#B7B7B7',
}

const bgColor = {
  primary: '#FEF1E9',
  gray: '#F8F8F8',
  white: '#FFFFFF',
  blue: '#D9EBFF',
  sunsetOrange: '#FFF7E6',
  overlay: '#000000ba',
  gray2: 'rgba(0, 0, 0, 0.1)',
  green: '#5DC159',
  brownOrange: "#FCB892",
}

export default theme
export { borderColor, bgColor, customColor }
