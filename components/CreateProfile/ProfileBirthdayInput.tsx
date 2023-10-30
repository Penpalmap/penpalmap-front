import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import {
    Box,
    FormControl,
    Select,
    Text,
    useToast,
    Link,
} from '@chakra-ui/react'
import { UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { ProfileFormData } from '../../types'

type Props = {
    register: UseFormRegister<ProfileFormData>
    setValue: UseFormSetValue<ProfileFormData>
    setIsUnderage: React.Dispatch<React.SetStateAction<boolean>>
}

const ProfileBirthdayInput: React.FC<Props> = ({
    register,
    setValue,
    setIsUnderage,
}) => {
    const [day, setDay] = useState<number | null>(null)
    const [month, setMonth] = useState<number | null>(null)
    const [year, setYear] = useState<number | null>(null)

    const calculateAge = (birthdate: string): number => {
        const now = dayjs()
        const dob = dayjs(birthdate)
        let age = now.year() - dob.year()

        // If birthdate has not occurred this year yet, subtract one from age.
        if (
            now.month() < dob.month() ||
            (now.month() === dob.month() && now.date() < dob.date())
        ) {
            age--
        }

        return age
    }

    const [age, setAge] = useState<number | null>(null)
    const toast = useToast()

    useEffect(() => {
        if (day && month && year) {
            const birthday = dayjs(`${year}-${month}-${day}`).format(
                'YYYY-MM-DD'
            )
            setValue('birthday', birthday)

            const calculatedAge = calculateAge(birthday)
            setIsUnderage(calculatedAge < 12)
            setAge(calculatedAge)

            if (calculatedAge < 12) {
                toast({
                    title: 'Hey, explorer! 🚸',
                    description: (
                        <>
                            Just a heads-up: To journey in PenPalMap, you need
                            to be at least 12 years old. Stay safe and enjoy the
                            adventure! 🌍✨ Curious about the rules? Check our{' '}
                            <Link color="white.500" href="/terms" isExternal>
                                Terms of Use
                            </Link>
                            . 📜
                        </>
                    ),
                    status: 'warning',
                    duration: 5000,
                    isClosable: true,
                })
            }
            if (calculatedAge < 18 && calculatedAge >= 12) {
                toast({
                    title: 'Hey, explorer! 🚸',
                    description: (
                        <>
                            🚸 Hey there, young explorer! Just a heads-up: there
                            are adults on this app. Always stay safe and be
                            cautious. 🛡️ Need more info? Check our{' '}
                            <Link color="white.500" href="/terms" isExternal>
                                Terms of Use
                            </Link>
                            . If something feels off, don't hesitate to reach
                            out to the PenPalMap team! 💌
                        </>
                    ),
                    status: 'info',
                    duration: 9000,
                    isClosable: true,
                })
            }
        }
    }, [day, month, year, setValue, setIsUnderage, toast])

    return (
        <FormControl id="birthday">
            <Box display="flex" gap="4">
                <Select
                    placeholder="Jour"
                    onChange={(e) => setDay(Number(e.target.value))}
                >
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                        <option key={day} value={day}>
                            {day}
                        </option>
                    ))}
                </Select>

                <Select
                    placeholder="Mois"
                    onChange={(e) => setMonth(Number(e.target.value))}
                >
                    {[
                        'January',
                        'February',
                        'March',
                        'April',
                        'May',
                        'June',
                        'July',
                        'August',
                        'September',
                        'October',
                        'November',
                        'December',
                    ].map((month, index) => (
                        <option key={month} value={index + 1}>
                            {month}
                        </option>
                    ))}
                </Select>

                <Select
                    placeholder="Année"
                    onChange={(e) => setYear(Number(e.target.value))}
                >
                    {Array.from(
                        { length: 100 },
                        (_, i) => new Date().getFullYear() - 8 - i
                    ).map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </Select>

                {/* Ceci reste caché mais maintient la structure de données actuelle */}
                <input type="date" {...register('birthday')} hidden />
            </Box>
            {age && (
                <Text mt="2" fontSize="lg" textAlign="center">
                    You are {age} yo.
                </Text>
            )}
        </FormControl>
    )
}

export default ProfileBirthdayInput
