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
            title: 'Gender',
            titlePage: t('connect.selectGender'),
        },
        {
            title: 'Birthday',
            titlePage: t('connect.selectBirthday'),
        },
        {
            title: 'Photos',
            titlePage: t('connect.selectPhotos'),
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
                            fontSize={'3xl'}
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
                <Flex justifyContent="space-between">
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
                            colorScheme="blue"
                            rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
                            isDisabled={disabled}
                        >
                            {t('connect.next')}
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
