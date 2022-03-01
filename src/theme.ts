import { extendTheme } from 'native-base'

const config = {
  useSystemColorMode: false,
  initialColorMode: 'light',
}

const colors = {
  yogiCup: {
    white: '#ffffff',
    offWhite: '#F2F2F2',
    stoneGray: '#5D6973',
    blue: '#032340',
    navy: '#001D32',
    orange: '#F2622E',
  },
}

export default extendTheme({ config, colors })
