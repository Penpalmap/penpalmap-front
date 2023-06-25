import {
    Box,
    Button,
    Flex,
    IconButton,
    Step,
    StepDescription,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
    Text,
} from '@chakra-ui/react'
import {
    faArrowLeft,
    faArrowRight,
    faCheck,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type LayoutCreationProfileProps = {
    activeStep: number
    handleNextStep: () => void
    handlePreviousStep: () => void
    children: React.ReactNode
}

const LayoutCreationProfile = ({
    activeStep,
    children,
    handleNextStep,
    handlePreviousStep,
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
    ]

    return (
        <Flex direction={'column'} w={'60%'} m={'auto'} h={'70%'}>
            <Flex direction={'column'} flex={1}>
                <Stepper index={activeStep}>
                    {steps.map((step, index) => (
                        <Step key={index}>
                            <StepIndicator>
                                <StepStatus
                                    complete={<StepIcon />}
                                    incomplete={<StepNumber />}
                                    active={<StepNumber />}
                                />
                            </StepIndicator>

                            <Box flexShrink="0">
                                <StepTitle>{step.title}</StepTitle>
                                <StepDescription>
                                    {step.description}
                                </StepDescription>
                            </Box>

                            <StepSeparator />
                        </Step>
                    ))}
                </Stepper>
            </Flex>
            <Flex direction={'column'} flex={4} alignItems={'center'}>
                <Flex flex={'1'} alignItems={'center'}>
                    <Text
                        fontSize={'3xl'}
                        fontWeight={'bold'}
                        textAlign={'center'}
                    >
                        {steps?.[activeStep]?.titlePage}
                    </Text>
                </Flex>

                <Flex flex={4} alignItems={'center'}>
                    {children}
                </Flex>
            </Flex>
            <Flex
                flex="1"
                alignItems={'center'}
                justifyContent={'center'}
                gap={'4'}
            >
                {activeStep !== 0 && (
                    <Button
                        type="button"
                        onClick={handlePreviousStep}
                        leftIcon={<FontAwesomeIcon icon={faArrowLeft} />}
                    >
                        Précédent
                    </Button>
                )}
                {activeStep !== 3 && (
                    <Button
                        onClick={handleNextStep}
                        colorScheme="blue"
                        rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
                    >
                        Suivant
                    </Button>
                )}
                {activeStep === 3 && (
                    <Button
                        colorScheme="green"
                        type="submit"
                        rightIcon={<FontAwesomeIcon icon={faCheck} />}
                    >
                        Terminer
                    </Button>
                )}
            </Flex>
        </Flex>
    )
}

export default LayoutCreationProfile
