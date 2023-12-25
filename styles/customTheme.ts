import { extendTheme } from '@chakra-ui/react'
import { Maven_Pro, Manrope, Raleway } from '@next/font/google'

// const comfortaa = Comfortaa({
//     style: 'normal',
//     subsets: ['latin-ext'],
// })

const raleway = Raleway({
    style: 'normal',
    subsets: ['latin-ext'],
})

const manrope = Manrope({
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
