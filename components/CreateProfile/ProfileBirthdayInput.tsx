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
import { useTranslation } from 'next-i18next'
import { MonthsKeys } from '../../types/translations'

type Props = {
  register: UseFormRegister<ProfileFormData>
  setValue: UseFormSetValue<ProfileFormData>
  setIsUnderage: React.Dispatch<React.SetStateAction<boolean>>
}

const MONTHS = [
  { name: 'January', days: 31 },
  { name: 'February', days: 28 },
  { name: 'March', days: 31 },
  { name: 'April', days: 30 },
  { name: 'May', days: 31 },
  { name: 'June', days: 30 },
  { name: 'July', days: 31 },
  { name: 'August', days: 31 },
  { name: 'September', days: 30 },
  { name: 'October', days: 31 },
  { name: 'November', days: 30 },
  { name: 'December', days: 31 },
]

const ProfileBirthdayInput: React.FC<Props> = ({
  register,
  setValue,
  setIsUnderage,
}) => {
  const [day, setDay] = useState<number | null>(null)
  const [month, setMonth] = useState<number | null>(null)
  const [year, setYear] = useState<number | null>(null)
  const { t } = useTranslation('common')
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
    toast.closeAll()
    if (day !== null && month !== null && year !== null) {
      const birthday = dayjs(`${year}-${month}-${day}`).format('YYYY-MM-DD')
      setValue('birthday', birthday)

      const calculatedAge = calculateAge(birthday)
      setIsUnderage(calculatedAge < 12)
      setAge(calculatedAge)

      if (calculatedAge < 12) {
        toast({
          title: 'Hey, explorer! 🚸',
          description: (
            <>
              {t('connect.more12part1')}{' '}
              <Link color="white.500" href="/terms" isExternal>
                {t('footer.terms')}
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
              {t('connect.more12part1')}{' '}
              <Link color="white.500" href="/terms" isExternal>
                {t('footer.terms')}
              </Link>
              {t('connect.more12part2')}
            </>
          ),
          status: 'info',
          duration: 9000,
          isClosable: true,
        })
      }
    }
  }, [day, month, year, setValue, setIsUnderage, toast, t])

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month, 0).getDate()
  }

  const handleDayChange = (selectedDay: number) => {
    setDay(selectedDay)
    // Reset selected month when day changes
    setMonth(null)
  }

  const handleMonthChange = (selectedMonth: number) => {
    setMonth(selectedMonth)
    // Update days based on the selected month
    if (day !== null && year !== null) {
      const daysInMonth = getDaysInMonth(selectedMonth, year)
      if (day > daysInMonth) {
        // If the selected day is greater than the number of days in the new month, reset the day
        setDay(null)
      }
    }
  }

  return (
    <FormControl id="birthday">
      <Box display="flex" gap="4">
        <Select
          placeholder={t('connect.day')}
          onChange={(e) => handleDayChange(Number(e.target.value))}
        >
          {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </Select>

        <Select
          placeholder={t('connect.month')}
          onChange={(e) => handleMonthChange(Number(e.target.value))}
        >
          {day !== null &&
            MONTHS.map(({ name, days }, index) => {
              if (day <= days) {
                return (
                  <option key={name} value={index + 1}>
                    {t(`months.${name.toLowerCase() as MonthsKeys}`)}
                  </option>
                )
              }
              return null
            })}
        </Select>

        <Select
          placeholder={t('connect.year')}
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
        <Text mt="2" fontSize="lg" textAlign="center" color={'teal'}>
          You are {age} yo.
        </Text>
      )}
    </FormControl>
  )
}

export default ProfileBirthdayInput
