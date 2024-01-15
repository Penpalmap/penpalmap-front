import { Box, Button, Flex, Text } from '@chakra-ui/react'
import {
    faArrowLeft,
    faArrowRight,
    faCheck,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTranslation } from 'next-i18next'

type LayoutCreationProfileProps = {
    activeStep: number
    handleNextStep: () => void
    handlePreviousStep: () => void
    children: React.ReactNode
    disabled?: boolean
}

const LayoutCreationProfile = ({
    activeStep,
    children,
    handleNextStep,
    handlePreviousStep,
    disabled,
}: LayoutCreationProfileProps) => {
    const { t } = useTranslation('common')

    const steps = [
        {
            title: 'terms',
            titlePage: t('connect.validateTerms'),
        },
        {
            title: 'Gender',
            titlePage: t('connect.selectGender'),
        },
        {
            title: 'Birthday',
            titlePage: t('connect.selectBirthdate'),
        },
        {
            title: 'Photos',
            titlePage: t('connect.selectPhoto'),
        },
        {
            title: 'Map',
            titlePage: t('connect.pickLocation'),
        },
        {
            title: 'Language',
            titlePage: t('connect.selectLanguage'),
        },
    ]

    const hasBackButton = activeStep !== 0

    return (
        <Flex
            justifyContent={'center'}
            alignItems={'center'}
            h={'calc(100vh - 60px)'}
            background={'#3EB6A020'}
        >
            <Box background={'white'} padding={'20px'} borderRadius={'10px'}>
                <Box mb={8}>
                    <Box mb={8}>
                        <Text
                            fontSize={'2xl'}
                            fontWeight={'bold'}
                            textAlign={'center'}
                        >
                            {steps?.[activeStep]?.titlePage}
                        </Text>
                    </Box>

                    <Flex
                        alignItems={'center'}
                        height={'100%'}
                        w={'full'}
                        justifyContent={'center'}
                    >
                        {children}
                    </Flex>
                </Box>
                <Flex
                    justifyContent={hasBackButton ? 'space-between' : 'center'}
                >
                    {activeStep !== 0 && (
                        <Button
                            w={'30%'}
                            onClick={handlePreviousStep}
                            colorScheme="white"
                            textColor="gray.400"
                            leftIcon={<FontAwesomeIcon icon={faArrowLeft} />}
                        >
                            {t('connect.previous')}
                        </Button>
                    )}
                    {activeStep !== 4 ? (
                        <Button
                            w={'50%'}
                            onClick={handleNextStep}
                            colorScheme="#3EB6A0"
                            backgroundColor={'#3EB6A0'}
                            rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
                            isDisabled={disabled}
                        >
                            {activeStep === 0
                                ? t('connect.validateConnections') // Change text for the first step
                                : t('connect.next')}
                        </Button>
                    ) : (
                        <Button
                            w={'50%'}
                            colorScheme="green"
                            type="submit"
                            rightIcon={<FontAwesomeIcon icon={faCheck} />}
                            isDisabled={disabled}
                        >
                            {t('connect.finish')}
                        </Button>
                    )}
                </Flex>
            </Box>
        </Flex>
    )
}

export default LayoutCreationProfile
