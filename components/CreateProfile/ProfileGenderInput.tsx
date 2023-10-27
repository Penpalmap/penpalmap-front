import { Flex, HStack, Text, VStack } from '@chakra-ui/react'
import { UseFormSetValue } from 'react-hook-form'
import { ProfileFormData } from '../../types'
import { ReactElement, useState, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
} from '@fortawesome/free-solid-svg-icons'

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
        w={['28', '36']}
        h={['28', '36']}
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
    const [showOtherGenders, setShowOtherGenders] = useState(false)

    const handleClick = useCallback(
        (gender: string) => {
            setValue('gender', gender)
        },
        [setValue]
    )

    return (
        <VStack spacing={4}>
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
                    isSelected={selectedGender === 'other' || showOtherGenders}
                    icon={<FontAwesomeIcon icon={faVenusMars} size="2x" />}
                    onClick={() => setShowOtherGenders(!showOtherGenders)}
                    text="Other"
                />
            </HStack>

            {showOtherGenders && (
                <HStack>
                    <ProfileGenderInputBox
                        isSelected={selectedGender === 'transgender'}
                        icon={
                            <FontAwesomeIcon icon={faTransgender} size="2x" />
                        }
                        onClick={() => handleClick('transgender')}
                        text="Transgender"
                    />
                    <ProfileGenderInputBox
                        isSelected={selectedGender === 'genderless'}
                        icon={<FontAwesomeIcon icon={faGenderless} size="2x" />}
                        onClick={() => handleClick('genderless')}
                        text="Genderless"
                    />
                    <ProfileGenderInputBox
                        isSelected={selectedGender === 'genderless'}
                        icon={<FontAwesomeIcon icon={faGenderless} size="2x" />}
                        onClick={() => handleClick('genderless')}
                        text="Genderless"
                    />
                    <ProfileGenderInputBox
                        isSelected={selectedGender === 'bigender'}
                        icon={
                            <FontAwesomeIcon icon={faMarsAndVenus} size="2x" />
                        }
                        onClick={() => handleClick('bigender')}
                        text="Bigender"
                    />
                    <ProfileGenderInputBox
                        isSelected={selectedGender === 'androgyne'}
                        icon={
                            <FontAwesomeIcon icon={faMarsStrokeUp} size="2x" />
                        }
                        onClick={() => handleClick('androgyne')}
                        text="Androgyne"
                    />
                    <ProfileGenderInputBox
                        isSelected={selectedGender === 'neuter'}
                        icon={<FontAwesomeIcon icon={faNeuter} size="2x" />}
                        onClick={() => handleClick('neuter')}
                        text="Neuter"
                    />
                    <ProfileGenderInputBox
                        isSelected={selectedGender === 'non-binary'}
                        icon={<FontAwesomeIcon icon={faMercury} size="2x" />}
                        onClick={() => handleClick('non-binary')}
                        text="Non-binary"
                    />
                    <ProfileGenderInputBox
                        isSelected={
                            selectedGender === 'othergender' || showOtherGenders
                        }
                        icon={<FontAwesomeIcon icon={faVenusMars} size="2x" />}
                        onClick={() => handleClick('othergender')}
                        text="Other Gender"
                    />
                </HStack>
            )}
        </VStack>
    )
}

export default ProfileGenderInput
