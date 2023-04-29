import { Box, HStack, Text } from '@chakra-ui/react'
import { UseFormSetValue } from 'react-hook-form'
import { ProfileFormData } from '../../types'

type Props = {
    onNextStep?: () => void
    onPreviousStep?: () => void
    setValue: UseFormSetValue<ProfileFormData>
}

const ProfileGenderInput = (props: Props) => {
    const { onNextStep, onPreviousStep, setValue } = props
    const handleClick = (gender: string) => {
        setValue('gender', gender)
    }

    return (
        <Box>
            <h1>ProfileGenderInput</h1>
            <HStack>
                <Box onClick={() => handleClick('female')} cursor={'pointer'}>
                    <Text>Women</Text>
                </Box>
                <Box onClick={() => handleClick('men')}>
                    <Text>Men</Text>
                </Box>
                <Box onClick={() => handleClick('other')}>
                    <Text>Other</Text>
                </Box>
            </HStack>
        </Box>
    )
}

export default ProfileGenderInput
