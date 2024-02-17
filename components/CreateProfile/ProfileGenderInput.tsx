import { List, ListItem, Text } from '@chakra-ui/react'
import { UseFormSetValue } from 'react-hook-form'
import { ProfileFormData } from '../../types'
import { useState, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTranslation } from 'next-i18next'
import {
  faMars,
  faVenus,
  faTransgender,
  faGenderless,
  faMarsAndVenus,
  faMarsStrokeUp,
  faNeuter,
  faMercury,
  faQuestionCircle,
  faVenusDouble,
  faMarsDouble,
  faVenusMars,
} from '@fortawesome/free-solid-svg-icons'
import { Gender } from '../../constants/genderEnum'

type Props = {
  setValue: UseFormSetValue<ProfileFormData>
  selectedGender?: Gender
}

const ProfileGenderInput = ({ setValue, selectedGender }: Props) => {
  const [showOtherGenders, setShowOtherGenders] = useState(false)
  const { t } = useTranslation('common')

  const handleClick = useCallback(
    (gender: Gender) => {
      if (gender === Gender.OtherGender && !showOtherGenders) {
        setShowOtherGenders(true)
      } else {
        setValue('gender', gender)
      }
    },
    [setValue, showOtherGenders]
  )

  const GenderOptions = [
    { gender: Gender.Male, icon: faVenus, text: t('profileGenderInput.man') },
    {
      gender: Gender.Female,
      icon: faMars,
      text: t('profileGenderInput.woman'),
    },
    ...(!showOtherGenders
      ? [{ gender: Gender.OtherGender, icon: faQuestionCircle, text: 'Other' }]
      : [
          {
            gender: Gender.Transgender,
            icon: faTransgender,
            text: t('profileGenderInput.transgender'),
          },
          { gender: Gender.Genderless, icon: faGenderless, text: 'Genderless' },
          { gender: Gender.Bigender, icon: faMarsAndVenus, text: 'Bigender' },
          { gender: Gender.Androgyne, icon: faMarsStrokeUp, text: 'Androgyne' },
          { gender: Gender.Neuter, icon: faNeuter, text: 'Neuter' },
          { gender: Gender.NonBinary, icon: faMercury, text: 'Non-Binary' },
          {
            gender: Gender.Genderqueer,
            icon: faMarsAndVenus,
            text: 'Genderqueer',
          },
          {
            gender: Gender.Genderfluid,
            icon: faTransgender,
            text: 'Genderfluid',
          },
          { gender: Gender.TwoSpirit, icon: faMarsDouble, text: 'Two-Spirit' },
          { gender: Gender.Agender, icon: faGenderless, text: 'Agender' },
          { gender: Gender.Pangender, icon: faVenusDouble, text: 'Pangender' },
          {
            gender: Gender.ThirdGender,
            icon: faVenusMars,
            text: 'Third Gender',
          },
          { gender: Gender.OtherGender, icon: faQuestionCircle, text: 'Other' },
        ]),
  ]

  return (
    <List spacing={3} overflowY="auto" maxHeight="300px" width="100%">
      {GenderOptions.map(({ gender, icon, text }) => (
        <ListItem
          key={gender}
          px={4}
          py={2}
          bg={selectedGender === gender ? 'teal.200' : 'transparent'}
          onClick={() => handleClick(gender)}
          cursor="pointer"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          borderRadius="md"
          _hover={{
            bg: 'teal.100',
          }}
        >
          <Text>{text}</Text>
          <FontAwesomeIcon icon={icon} />
        </ListItem>
      ))}
    </List>
  )
}

export default ProfileGenderInput
