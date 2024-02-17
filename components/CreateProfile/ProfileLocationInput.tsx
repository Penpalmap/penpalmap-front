import { Box, Text, useToast } from '@chakra-ui/react'
import { useState } from 'react'
import { UseFormSetValue } from 'react-hook-form'

import { ProfileFormData } from '../../types'
import 'ol/ol.css'
import { useTranslation } from 'next-i18next'
import MapInput from '../Elements/form/mapInput'
import { Coordinate } from 'ol/coordinate'

type Props = {
  setValue?: UseFormSetValue<ProfileFormData>
}

const ProfileLocationInput = (props: Props) => {
  const { setValue } = props
  const [countryName, setCountryName] = useState<string | null>(null)

  const toast = useToast()
  const { t } = useTranslation('common')

  const handleClicked = async (coordinates: Coordinate) => {
    if (setValue && coordinates[0] && coordinates[1]) {
      setValue('latitude', coordinates[1])
      setValue('longitude', coordinates[0])
    }

    // Fetch country name
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coordinates[1]}&lon=${coordinates[0]}`
      )
      const data = await response.json()
      if (data && data.address && data.address.country) {
        setCountryName(data.address.country)
      } else {
        toast({
          title: 'Hey, explorer! 🚸',
          description: t('connect.toastLocationOut'),
          status: 'warning',
          duration: 5000,
          isClosable: true,
        })
      }
    } catch (error) {
      console.error('Error fetching country name:', error)
    }
  }

  return (
    <Box w={'xl'} display={'flex'} flexDirection={'column'}>
      <Box h={['250px', 'md']} w={'100%'} mb={4}>
        <MapInput onCoordinatesChange={handleClicked} />
      </Box>
      {countryName && (
        <Box
          pt={'10'}
          bgColor="white"
          minHeight={'10%'}
          display={'Flex'}
          justifyContent={'center'}
        >
          <Text fontSize={'xl'} mr={2}>
            {t('connect.youAreIn')}
          </Text>
          <Text as="span" color="#189AB4" fontSize="xl">
            {countryName}
          </Text>
        </Box>
      )}
    </Box>
  )
}

export default ProfileLocationInput
