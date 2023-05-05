import { Box } from '@chakra-ui/react'
import Header from './header'

const Layout = ({ children }) => {
    return (
        <Box>
            <Header />
            <Box w={'100%'} h={'calc(100vh -70'}>
                {children}
            </Box>
        </Box>
    )
}

export default Layout
