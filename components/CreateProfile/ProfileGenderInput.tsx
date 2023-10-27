import { Flex, Text, VStack, Wrap, Box } from '@chakra-ui/react'
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
    faQuestionCircle,
    faVenusDouble,
    faMarsDouble,
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
            if (gender === 'man' || gender === 'woman') {
                setShowOtherGenders(false)
            }
        },
        [setValue]
    )

    return (
        <VStack spacing={4} overflowX="hidden" maxWidth="100%">
            <Wrap spacing={4}>
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
                    isSelected={selectedGender === 'other' && showOtherGenders}
                    icon={<FontAwesomeIcon icon={faVenusMars} size="2x" />}
                    onClick={() => setShowOtherGenders(!showOtherGenders)}
                    text="Other ..."
                />
            </Wrap>
            {showOtherGenders && (
                <Box
                    maxHeight="200px"
                    overflowY="auto"
                    width="100%"
                    sx={{
                        '&::-webkit-scrollbar': {
                            width: '5px',
                        },
                        '&::-webkit-scrollbar-track': {
                            boxShadow: 'inset 0 0 5px grey',
                            borderRadius: '4px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: 'darkgrey',
                            borderRadius: '4px',
                        },
                        '&::-webkit-scrollbar-thumb:hover': {
                            backgroundColor: 'grey',
                        },
                    }}
                >
                    <Wrap spacing={4} maxWidth="640px">
                        <ProfileGenderInputBox
                            isSelected={selectedGender === 'transgender'}
                            icon={
                                <FontAwesomeIcon
                                    icon={faTransgender}
                                    size="2x"
                                />
                            }
                            onClick={() => handleClick('transgender')}
                            text="Transgender"
                        />
                        <ProfileGenderInputBox
                            isSelected={selectedGender === 'genderless'}
                            icon={
                                <FontAwesomeIcon
                                    icon={faGenderless}
                                    size="2x"
                                />
                            }
                            onClick={() => handleClick('genderless')}
                            text="Genderless"
                        />
                        <ProfileGenderInputBox
                            isSelected={selectedGender === 'bigender'}
                            icon={
                                <FontAwesomeIcon
                                    icon={faMarsAndVenus}
                                    size="2x"
                                />
                            }
                            onClick={() => handleClick('bigender')}
                            text="Bigender"
                        />
                        <ProfileGenderInputBox
                            isSelected={selectedGender === 'androgyne'}
                            icon={
                                <FontAwesomeIcon
                                    icon={faMarsStrokeUp}
                                    size="2x"
                                />
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
                            icon={
                                <FontAwesomeIcon icon={faMercury} size="2x" />
                            }
                            onClick={() => handleClick('non-binary')}
                            text="Non-binary"
                        />
                        <ProfileGenderInputBox
                            isSelected={selectedGender === 'genderqueer'}
                            icon={
                                <FontAwesomeIcon
                                    icon={faMarsAndVenus}
                                    size="2x"
                                />
                            }
                            onClick={() => handleClick('genderqueer')}
                            text="Genderqueer"
                        />
                        <ProfileGenderInputBox
                            isSelected={selectedGender === 'genderfluid'}
                            icon={
                                <FontAwesomeIcon
                                    icon={faTransgender}
                                    size="2x"
                                />
                            }
                            onClick={() => handleClick('genderfluid')}
                            text="Genderfluid"
                        />
                        <ProfileGenderInputBox
                            isSelected={selectedGender === 'two-spirit'}
                            icon={
                                <FontAwesomeIcon
                                    icon={faMarsDouble}
                                    size="2x"
                                />
                            }
                            onClick={() => handleClick('two-spirit')}
                            text="Two-Spirit"
                        />
                        <ProfileGenderInputBox
                            isSelected={selectedGender === 'agender'}
                            icon={
                                <FontAwesomeIcon
                                    icon={faGenderless}
                                    size="2x"
                                />
                            }
                            onClick={() => handleClick('agender')}
                            text="Agender"
                        />
                        <ProfileGenderInputBox
                            isSelected={selectedGender === 'pangender'}
                            icon={
                                <FontAwesomeIcon
                                    icon={faVenusDouble}
                                    size="2x"
                                />
                            }
                            onClick={() => handleClick('pangender')}
                            text="Pangender"
                        />
                        <ProfileGenderInputBox
                            isSelected={selectedGender === 'third-gender'}
                            icon={
                                <FontAwesomeIcon icon={faVenusMars} size="2x" />
                            }
                            onClick={() => handleClick('third-gender')}
                            text="Third Gender"
                        />
                        <ProfileGenderInputBox
                            isSelected={selectedGender === 'othergender'}
                            icon={
                                <FontAwesomeIcon
                                    icon={faQuestionCircle}
                                    size="2x"
                                />
                            }
                            onClick={() => handleClick('othergender')}
                            text="Other"
                        />
                    </Wrap>
                </Box>
            )}
        </VStack>
    )
}

export default ProfileGenderInput
