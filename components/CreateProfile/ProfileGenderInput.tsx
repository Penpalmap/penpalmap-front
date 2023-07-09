import { Flex, HStack, Text } from '@chakra-ui/react'
import { UseFormSetValue } from 'react-hook-form'
import { ProfileFormData } from '../../types'
import { ReactElement, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMars, faVenus, faVenusMars } from '@fortawesome/free-solid-svg-icons'

type Props = {
    setValue: UseFormSetValue<ProfileFormData>
    selectedGender?: string
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
        w={'36'}
        h={'36'}
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

    const handleClick = useCallback(
        (gender: string) => {
            setValue('gender', gender)
        },
        [setValue]
    )

    return (
        <HStack>
            <ProfileGenderInputBox
                isSelected={selectedGender === 'woman'}
                icon={<FontAwesomeIcon icon={faVenus} size="2x" />}
                onClick={() => handleClick('woman')}
                text="Woman"
            />
            <ProfileGenderInputBox
                isSelected={selectedGender === 'man'}
                icon={<FontAwesomeIcon icon={faMars} size="2x" />}
                onClick={() => handleClick('man')}
                text="Man"
            />
            <ProfileGenderInputBox
                isSelected={selectedGender === 'other'}
                icon={<FontAwesomeIcon icon={faVenusMars} size="2x" />}
                onClick={() => handleClick('other')}
                text="Other"
            />
        </HStack>
    )
}

export default ProfileGenderInput
