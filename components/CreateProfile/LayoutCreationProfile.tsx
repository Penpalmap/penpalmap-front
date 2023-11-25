import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { faArrowRight, faCheck } from '@fortawesome/free-solid-svg-icons'
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
    disabled,
}: LayoutCreationProfileProps) => {
    const steps = [
        {
            title: 'Gender',
            titlePage: 'Select your gender',
        },
        {
            title: 'Birthday',
            titlePage: 'Select your birthdate',
        },
        {
            title: 'Photos',
            titlePage: 'Pick some photos',
        },
        {
            title: 'Map',
            titlePage: 'Pick your position',
        },
        {
            title: 'Language',
            titlePage: 'Select your language',
        },
    ]

    const { t } = useTranslation('common')

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
                </Box>{' '}
                {activeStep !== 4 ? (
                    <Button
                        w={'full'}
                        onClick={handleNextStep}
                        colorScheme="blue"
                        rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
                        isDisabled={disabled}
                    >
                        Suivant
                    </Button>
                ) : (
                    <Button
                        w={'full'}
                        colorScheme="green"
                        type="submit"
                        rightIcon={<FontAwesomeIcon icon={faCheck} />}
                        isDisabled={disabled}
                    >
                        Terminer
                    </Button>
                )}
            </Box>
        </Flex>
    )
}

export default LayoutCreationProfile
