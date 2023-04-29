import { Box } from '@chakra-ui/react'
import { UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { ProfileFormData } from '../../types'

type Props = {
    onNextStep?: () => void
    onPreviousStep?: () => void
    register?: UseFormRegister<ProfileFormData>
    setValue?: UseFormSetValue<ProfileFormData>
}

const ProfileBirthdayInput = (props: Props) => {
    const { register } = props

    return (
        <Box>
            <h1>create profile birthday</h1>

            <input type="date" {...register('birthday')} />
        </Box>
    )
}

export default ProfileBirthdayInput
