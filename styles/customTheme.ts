import { extendTheme } from '@chakra-ui/react'

const customTheme = extendTheme({
    colors: {
        primary: '#0094A8',
        background: '#F5F5F5',
    },
    fonts: {
        body: 'Montserrat, sans-serif',
    },
    breakpoints: {
        sm: '30em',
        md: '48em',
        lg: '62em',
        xl: '80em',
    },
})

export default customTheme
