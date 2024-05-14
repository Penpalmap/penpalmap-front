import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRight,
  faCheck,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'

type LayoutCreationProfileProps = {
  activeStep: number
  handleNextStep: () => void
  handlePreviousStep: () => void
  children: React.ReactNode
  disabled?: boolean
  canBeSkipped?: boolean
}

const LayoutCreationProfile = ({
  activeStep,
  children,
  handleNextStep,
  handlePreviousStep,
  disabled,
  canBeSkipped,
}: LayoutCreationProfileProps) => {
  const [viewportHeight, setViewportHeight] = useState('100vh')

  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(`${window.innerHeight}px`)
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const { t } = useTranslation('common')

  const steps = [
    { title: 'terms', titlePage: t('connect.validateTerms') },
    { title: 'Gender', titlePage: t('connect.selectGender') },
    { title: 'Birthday', titlePage: t('connect.selectBirthdate') },
    { title: 'Photos', titlePage: t('connect.selectPhoto') },
    { title: 'Map', titlePage: t('connect.pickLocation') },
    { title: 'Bio', titlePage: t('profil.EnterDescription') },
    { title: 'Language', titlePage: t('connect.selectLanguage') },
  ]

  return (
    <Flex
      flexDirection={'column'}
      p={8}
      height={viewportHeight}
      maxW={['100%', 'xl']}
      mx={'auto'}
    >
      {activeStep !== 0 && (
        <Button
          alignSelf={'flex-start'}
          onClick={handlePreviousStep}
          variant={'solid'}
          background={'white'}
          _hover={{ backgroundColor: 'gray.100' }}
          aria-label="Previous step"
          mb={4}
          leftIcon={<FontAwesomeIcon icon={faChevronLeft} />}
        >
          {t('connect.previous')}
        </Button>
      )}
      <Flex flex={'1 1 auto'} flexDirection={'column'} overflowY="auto">
        <Text fontSize={'xl'} fontWeight={'bold'} textAlign={'center'}>
          {steps[activeStep]?.titlePage}
        </Text>
        <Box py={4}>{children}</Box>
      </Flex>
      <Flex flex={'0 1 auto'} justifyContent={'center'}>
        {activeStep !== 6 ? (
          <>
            {canBeSkipped && (
              <Button
                onClick={handleNextStep}
                variant={'ghost'}
                textColor="gray.800"
                flex={1}
              >
                {t('connect.skip')}
              </Button>
            )}
            <Button
              onClick={handleNextStep}
              colorScheme="teal"
              rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
              flex={1}
              isDisabled={disabled}
            >
              {t('connect.next')}
            </Button>
          </>
        ) : (
          <Button
            colorScheme="green"
            type="submit"
            rightIcon={<FontAwesomeIcon icon={faCheck} />}
            flex={1}
            isDisabled={disabled}
          >
            {t('connect.finish')}
          </Button>
        )}
      </Flex>
    </Flex>
  )
}

export default LayoutCreationProfile
