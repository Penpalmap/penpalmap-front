import React, { useState, useEffect } from 'react'
import { Box, Text, Link, Button } from '@chakra-ui/react'
import Cookies from 'js-cookie'
import { useTranslation } from 'next-i18next'

const RGPDNotice: React.FC = () => {
    const { t } = useTranslation('common')
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const rgpdClosed = Cookies.get('rgpdClosed')
        // Set a delay before making the notice visible
        const timeout = setTimeout(() => {
            setIsVisible(rgpdClosed !== 'true')
        }, 1000) // 1000 milliseconds = 1 second

        // Clear the timeout when the component is unmounted or when the notice becomes visible
        return () => clearTimeout(timeout)
    }, [])

    const handleClose = () => {
        setIsVisible(false)
        Cookies.set('rgpdClosed', 'true', { expires: 365 })
    }

    return (
        <>
            {isVisible && (
                <Box
                    position="fixed"
                    zIndex={1}
                    bottom="4"
                    right="4"
                    p="4"
                    bg="gray.600"
                    color="white"
                    borderRadius="md"
                    boxShadow="md"
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-end"
                    minWidth="200px"
                    opacity={0.8}
                    width={{ base: 'auto', md: '250px' }}
                >
                    <Text fontSize="sm" mb={2} textAlign={'justify'}>
                        {t('connect.cookiesUsed')}.{' '}
                        <Link color="whiteAlpha.600" href="/terms">
                            {t('footer.terms')}
                        </Link>
                    </Text>
                    <Button
                        backgroundColor={'#3EB6A0'}
                        size="sm"
                        onClick={handleClose}
                    >
                        {t('connect.AcceptClose')}
                    </Button>
                </Box>
            )}
        </>
    )
}

export default RGPDNotice
