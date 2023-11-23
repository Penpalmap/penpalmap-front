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
    const { t } = useTranslation('common')

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
                    text={t('profileGenderInput.woman')}
                />
                <ProfileGenderInputBox
                    isSelected={selectedGender === 'man'}
                    icon={<FontAwesomeIcon icon={faMars} size="2x" />}
                    onClick={() => handleClick('man')}
                    text={t('profileGenderInput.man')}
                />
                <ProfileGenderInputBox
                    isSelected={selectedGender === 'other' && showOtherGenders}
                    icon={<FontAwesomeIcon icon={faVenusMars} size="2x" />}
                    onClick={() => setShowOtherGenders(!showOtherGenders)}
                    text={t('profileGenderInput.other')}
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
                    <Wrap spacing={4} justify={'center'} pb={4}>
                        <ProfileGenderInputBox
                            isSelected={selectedGender === 'transgender'}
                            icon={
                                <FontAwesomeIcon
                                    icon={faTransgender}
                                    size="2x"
                                />
                            }
                            onClick={() => handleClick('transgender')}
                            text={t('profileGenderInput.transgender')}
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
                            text={t('profileGenderInput.genderless')}
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
                            text={t('profileGenderInput.bigender')}
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
                            text={t('profileGenderInput.androgyne')}
                        />
                        <ProfileGenderInputBox
                            isSelected={selectedGender === 'neuter'}
                            icon={<FontAwesomeIcon icon={faNeuter} size="2x" />}
                            onClick={() => handleClick('neuter')}
                            text={t('profileGenderInput.neuter')}
                        />
                        <ProfileGenderInputBox
                            isSelected={selectedGender === 'non-binary'}
                            icon={
                                <FontAwesomeIcon icon={faMercury} size="2x" />
                            }
                            onClick={() => handleClick('non-binary')}
                            text={t('profileGenderInput."non-binary')}
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
                            text={t('profileGenderInput.genderqueer')}
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
                            text={t('profileGenderInput.genderfluid')}
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
                            text={t('profileGenderInput.two-spirit')}
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
                            text={t('profileGenderInput.agender')}
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
                            text={t('profileGenderInput.pangender')}
                        />
                        <ProfileGenderInputBox
                            isSelected={selectedGender === 'third-gender'}
                            icon={
                                <FontAwesomeIcon icon={faVenusMars} size="2x" />
                            }
                            onClick={() => handleClick('third-gender')}
                            text={t('profileGenderInput.third-gender')}
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
                            text={t('profileGenderInput.othergender')}
                        />
                    </Wrap>
                </Box>
            )}
        </VStack>
    )
}

export default ProfileGenderInput
