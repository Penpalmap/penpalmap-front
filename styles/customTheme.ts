import { extendTheme } from '@chakra-ui/react'
import { Raleway } from '@next/font/google'

const raleway = Raleway({
  style: 'normal',
  subsets: ['latin-ext'],
})

const customTheme = extendTheme({
  colors: {
    primary: '#0094A8',
    background: '#F5F5F5',
  },
  fonts: {
    body: raleway.style.fontFamily,
  },
  breakpoints: {
    sm: '30em',
    md: '48em',
    lg: '62em',
    xl: '80em',
  },
})

export default customTheme
