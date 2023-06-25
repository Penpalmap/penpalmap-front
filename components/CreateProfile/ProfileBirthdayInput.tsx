import { Box, Input } from '@chakra-ui/react'
import { UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { ProfileFormData } from '../../types'

type Props = {
    onNextStep?: () => void
    onPreviousStep?: () => void
    register: UseFormRegister<ProfileFormData>
    setValue?: UseFormSetValue<ProfileFormData>
}

const ProfileBirthdayInput = (props: Props) => {
    const { register } = props

    return (
        <Input
            type="date"
            {...register('birthday')}
            width={'56'}
            bg={'gray.100'}
        />
    )
}

export default ProfileBirthdayInput
