import {
    Box,
    Button,
    Flex,
    Step,
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
    disabled?: boolean
}

const LayoutCreationProfile = ({
    activeStep,
    children,
    handleNextStep,
    handlePreviousStep,
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
    ]

    // Stepper
    // Nom du step
    // form input du step
    // Bouton précédent
    // Bouton suivant

    return (
        <Flex
            justifyContent={'center'}
            alignItems={'center'}
            h={'calc(100vh - 60px)'}
            background={'beige'}
        >
            <Box
                background={'white'}
                padding={'20px'}
                borderRadius={'10px'}
                maxWidth={'xl'}
            >
                {/* <Stepper index={activeStep}>
                        {steps.map((step, index) => (
                            <Step key={index}>
                                <StepIndicator>
                                    <StepStatus
                                        complete={<StepIcon />}
                                        incomplete={<StepNumber />}
                                        active={<StepNumber />}
                                    />
                                </StepIndicator>

                                <Box
                                    flexShrink="0"
                                    display={{ base: 'none', md: 'block' }}
                                >
                                    <StepTitle>{step.title}</StepTitle>
                                </Box>

                                <StepSeparator />
                            </Step>
                        ))}
                    </Stepper> */}
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
                <Button
                    w={'full'}
                    onClick={handleNextStep}
                    colorScheme="blue"
                    rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
                    isDisabled={disabled}
                >
                    Suivant
                </Button>
            </Box>
        </Flex>
    )

    // return (
    //     <Flex
    //         direction={'column'}
    //         w={['90%', '60%']}
    //         m={'auto'}
    //         h={'calc(100vh - 60px)'}
    //         textAlign={'center'}
    //     >
    //         <Box>
    //             <Stepper index={activeStep}>
    //                 {steps.map((step, index) => (
    //                     <Step key={index}>
    //                         <StepIndicator>
    //                             <StepStatus
    //                                 complete={<StepIcon />}
    //                                 incomplete={<StepNumber />}
    //                                 active={<StepNumber />}
    //                             />
    //                         </StepIndicator>

    //                         <Box
    //                             flexShrink="0"
    //                             display={{ base: 'none', md: 'block' }}
    //                         >
    //                             <StepTitle>{step.title}</StepTitle>
    //                         </Box>

    //                         <StepSeparator />
    //                     </Step>
    //                 ))}
    //             </Stepper>
    //         </Box>
    //         <Flex
    //             mx={'auto'}
    //             mt={'20'}
    //             height={'700px'}
    //             flexDir={'column'}
    //             alignItems={'center'}
    //         >
    //             <Text fontSize={'3xl'} fontWeight={'bold'} textAlign={'center'}>
    //                 {steps?.[activeStep]?.titlePage}
    //             </Text>

    //             <Flex
    //                 alignItems={'center'}
    //                 height={'100%'}
    //                 w={'full'}
    //                 justifyContent={'center'}
    //             >
    //                 {children}
    //             </Flex>
    //         </Flex>{' '}
    //         <Box>
    //             {activeStep !== 0 && (
    //                 <Button
    //                     type="button"
    //                     onClick={handlePreviousStep}
    //                     leftIcon={<FontAwesomeIcon icon={faArrowLeft} />}
    //                 >
    //                     Précédent
    //                 </Button>
    //             )}
    //             {activeStep !== 3 && (
    //                 <Button
    //                     onClick={handleNextStep}
    //                     colorScheme="blue"
    //                     rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
    //                 >
    //                     Suivant
    //                 </Button>
    //             )}
    //             {activeStep === 3 && (
    //                 <Button
    //                     colorScheme="green"
    //                     type="submit"
    //                     rightIcon={<FontAwesomeIcon icon={faCheck} />}
    //                 >
    //                     Terminer
    //                 </Button>
    //             )}
    //         </Box>
    //     </Flex>
    // )
}

export default LayoutCreationProfile
