import { Flex, Text, VStack, Wrap, Box } from '@chakra-ui/react'
import { UseFormSetValue } from 'react-hook-form'
import { ProfileFormData } from '../../types'
import { ReactElement, useState, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTranslation } from 'next-i18next'
import {
  faMars,
  faVenus,
  faVenusMars,
  faTransgender,
  faGenderless,
  faMarsAndVenus,
  faMarsStrokeUp,
  faNeuter,
  faMercury,
  faQuestionCircle,
  faVenusDouble,
  faMarsDouble,
} from '@fortawesome/free-solid-svg-icons'
import { Gender } from '../../constants/genderEnum'

type Props = {
  setValue: UseFormSetValue<ProfileFormData>
  selectedGender?: Gender
}

type PropsInputBox = {
  onClick: () => void
  text: string
  icon: ReactElement
  isSelected?: boolean
}

export const ProfileGenderInputBox = ({
  onClick,
  text,
  icon,
  isSelected,
}: PropsInputBox) => (
  <Flex
    onClick={onClick}
    cursor={'pointer'}
    boxShadow={'lg'}
    w={['20', '32']}
    h={['20', '32']}
    borderRadius={'lg'}
    direction={'column'}
    align={'center'}
    justify={'center'}
    border={isSelected ? '2px solid #3182CE' : '2px solid #E2E8F0'}
  >
    {icon}
    <Text mt={'4'}>{text}</Text>
  </Flex>
)

const ProfileGenderInput = (props: Props) => {
  const { setValue, selectedGender } = props
  // const [showOtherGenders, setShowOtherGenders] = useState(false)
  const { t } = useTranslation('common')

  const handleClick = useCallback(
    (gender: Gender) => {
      setValue('gender', gender)
      // if (gender === Gender.Male || gender === Gender.Female) {
      //   setShowOtherGenders(false)
      // }
    },
    [setValue]
  )

  const GenderOptions = [
    {
      gender: Gender.Female,
      icon: faMars,
      text: t('profileGenderInput.woman'),
    },
    { gender: Gender.Male, icon: faVenus, text: t('profileGenderInput.man') },
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
    { gender: Gender.Genderqueer, icon: faMarsAndVenus, text: 'Genderqueer' },
    { gender: Gender.Genderfluid, icon: faTransgender, text: 'Genderfluid' },
    { gender: Gender.TwoSpirit, icon: faMarsDouble, text: 'Two-Spirit' },
    { gender: Gender.Agender, icon: faGenderless, text: 'Agender' },
    { gender: Gender.Pangender, icon: faVenusDouble, text: 'Pangender' },
    { gender: Gender.ThirdGender, icon: faVenusMars, text: 'Third Gender' },
    { gender: Gender.OtherGender, icon: faQuestionCircle, text: 'Other' },
  ]

  return (
    <VStack spacing={4} overflowX="hidden" maxWidth="100%">
      <Wrap spacing={4}>
        {GenderOptions.map(({ gender, icon, text }) => (
          <ProfileGenderInputBox
            key={gender}
            isSelected={selectedGender === gender}
            icon={<FontAwesomeIcon icon={icon} size="2x" />}
            onClick={() => handleClick(gender)}
            text={text}
          />
        ))}
      </Wrap>
    </VStack>
  )
}

export default ProfileGenderInput
