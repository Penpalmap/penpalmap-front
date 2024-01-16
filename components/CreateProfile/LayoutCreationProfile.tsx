import { Box, Button, Flex, Text, Image, keyframes } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faArrowLeft,
    faArrowRight,
    faCheck,
} from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'

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
        { title: 'terms', titlePage: t('connect.validateTerms') },
        { title: 'Gender', titlePage: t('connect.selectGender') },
        { title: 'Birthday', titlePage: t('connect.selectBirthdate') },
        { title: 'Photos', titlePage: t('connect.selectPhoto') },
        { title: 'Map', titlePage: t('connect.pickLocation') },
        { title: 'Language', titlePage: t('connect.selectLanguage') },
    ]

    const hasBackButton = activeStep !== 0

    // Add images for the first step background animation
    const images = [
        '/images/LandingMap_light.png',
        '/images/LandingMap_light.png',
        '/images/LandingMap_light.png',
    ]

    const scrollLeftToRight = keyframes`
        0% { transform: translateX(-${100 / images.length}vw); }
        100% { transform: translateX(0); }
    `

    return (
        <Flex
            justifyContent={'center'}
            alignItems={'center'}
            height={'calc(100vh - 3.5rem)'}
            overflow="hidden"
            background={
                activeStep === 0
                    ? `linear-gradient(to right, transparent, transparent 20%, white 20%, white 80%, transparent 80%, transparent)`
                    : '#3EB6A020' // Default background color
            }
            position="relative" // Added position relative
        >
            {activeStep === 0 && (
                <Box
                    id="background-animation"
                    height={'100%'}
                    display="flex"
                    animation={`${scrollLeftToRight} 60s linear infinite`}
                    marginLeft={`-${100 / images.length}%`}
                    position="absolute"
                    width={`${100 * images.length}%`}
                >
                    {images.map((image, index) => (
                        <Box key={index} flex="0 0 auto">
                            <Image
                                src="/images/LandingMap_light.png"
                                alt="PenpalMap"
                                height="100%"
                                width="auto"
                                aspectRatio={'auto'}
                                display="inline-block"
                            />
                        </Box>
                    ))}
                </Box>
            )}
            <Box
                backgroundColor={'white'}
                boxShadow={'0px 4px 6px rgba(0, 0, 0, 0.3)'}
                padding={'20px'}
                borderRadius={'10px'}
                maxWidth={'60%'}
                position="relative"
                overflow="hidden"
            >
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
                    {activeStep !== 5 ? (
                        <Button
                            w={'50%'}
                            onClick={handleNextStep}
                            colorScheme="#3EB6A0"
                            backgroundColor={'#3EB6A0'}
                            rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
                            isDisabled={disabled}
                        >
                            {activeStep === 0
                                ? t('connect.validateConnections')
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
