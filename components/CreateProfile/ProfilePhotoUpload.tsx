import { Box, HStack, Text } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import {
    UseFormGetValues,
    UseFormRegister,
    UseFormSetValue,
} from 'react-hook-form'
import { ProfileFormData } from '../../types'

type Props = {
    onNextStep?: () => void
    onPreviousStep?: () => void
    register?: UseFormRegister<ProfileFormData>
    setValue?: UseFormSetValue<ProfileFormData>
    getValues?: UseFormGetValues<ProfileFormData>
}

const ProfilePhotoUpload = (props: Props) => {
    const { register, getValues } = props
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files[0]

        let files = getValues?.('photo')

        if (files && files.length > 0) {
            files.push(file)
        } else {
            files = [file]
        }
        register('photo', { value: files })
    }

    return (
        <Box>
            <h1>create profile Photo</h1>
            <HStack spacing="24px">
                <Box
                    borderWidth={2}
                    borderColor="gray.400"
                    p={4}
                    mb={4}
                    onClick={() => {
                        fileInputRef.current.click()
                    }}
                    cursor="pointer"
                >
                    <input
                        type="file"
                        id="file-upload"
                        style={{ display: 'none' }}
                        onChange={handleUpload}
                        accept="image/*"
                        ref={fileInputRef}
                    />
                    <Text color="gray.500">Add photo </Text>
                </Box>
                <Box
                    borderWidth={2}
                    borderColor="gray.400"
                    p={4}
                    mb={4}
                    onClick={() => {
                        fileInputRef.current.click()
                    }}
                    cursor="pointer"
                >
                    <input
                        type="file"
                        id="file-upload"
                        style={{ display: 'none' }}
                        onChange={handleUpload}
                        accept="image/*"
                        ref={fileInputRef}
                    />
                    <Text color="gray.500">Add photo </Text>
                </Box>{' '}
                <Box
                    borderWidth={2}
                    borderColor="gray.400"
                    p={4}
                    mb={4}
                    onClick={() => {
                        fileInputRef.current.click()
                    }}
                    cursor="pointer"
                >
                    <input
                        type="file"
                        id="file-upload"
                        style={{ display: 'none' }}
                        onChange={handleUpload}
                        accept="image/*"
                        ref={fileInputRef}
                    />
                    <Text color="gray.500">Add photo </Text>
                </Box>{' '}
            </HStack>
        </Box>
    )
}

export default ProfilePhotoUpload
