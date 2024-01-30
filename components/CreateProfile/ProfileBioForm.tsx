import { Box, FormControl, Input, Textarea } from '@chakra-ui/react'
import { UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { ProfileFormData } from '../../types'
import { useTranslation } from 'next-i18next'

type Props = {
    register: UseFormRegister<ProfileFormData>
}

export const ProfileBioForm = ({ register }: Props) => {
    const { t } = useTranslation('common')
    return (
        <FormControl>
            <Box minW={['100%', '100%', '100%', 'xl']}>
                <Textarea
                    placeholder={t('profil.EnterDescription')}
                    h={'10rem'}
                    {...register('bio')}
                />
            </Box>
        </FormControl>
    )
}
