import { Box, Button, Flex, IconButton, Select, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { UserLanguage } from '../../types'
import { useSession } from 'next-auth/react'
import { DeleteIcon } from '@chakra-ui/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'next-i18next'

type Props = {
    setValue: any
}

const ProfileLanguageForm = ({ setValue }: Props) => {
    const { data: session } = useSession()
    const [languages, setLanguages] = useState<UserLanguage[]>([
        { language: '', level: '', userId: session.user.id },
    ])
    const { t } = useTranslation('common')
    const [availableLanguages, setAvailableLanguages] = useState<
        { label: string; value: string }[]
    >([
        {
            label: t('languages.fr'),
            value: 'fr',
        },
        {
            label: t('languages.en'),
            value: 'en',
        },
    ])

    const addLanguage = () => {
        if (!session?.user.id) return

        const newLanguage: UserLanguage = {
            language: '',
            level: '',
            userId: session.user.id,
        }
        setLanguages([...languages, newLanguage])
        setValue('userLanguages', [...languages, newLanguage])
    }

    const handleLanguageChange = (index: number, value: string) => {
        const updatedLanguages = [...languages]

        const languageToUpdate = updatedLanguages[index]

        if (!languageToUpdate) return

        languageToUpdate.language = value

        setLanguages(updatedLanguages)

        setValue('userLanguages', updatedLanguages)
    }

    const handleLevelChange = (index: number, value: string) => {
        const updatedLanguages = [...languages]

        const languageToUpdate = updatedLanguages[index]

        if (!languageToUpdate) return

        languageToUpdate.level = value

        setLanguages(updatedLanguages)
        setValue('userLanguages', updatedLanguages)
    }

    return (
        <VStack spacing={4} alignItems={'flex-start'}>
            {languages.map((language, index) => (
                <Flex key={language.id} gap={4}>
                    <Select
                        placeholder={t('connect.selectALanguage')}
                        value={language.language}
                        onChange={(e) =>
                            handleLanguageChange(index, e.target.value)
                        }
                    >
                        {availableLanguages.map((language) => (
                            <option key={language.value} value={language.value}>
                                {language.label}
                            </option>
                        ))}
                    </Select>
                    <Select
                        placeholder={t('connect.level')}
                        value={language.level}
                        onChange={(e) =>
                            handleLevelChange(index, e.target.value)
                        }
                    >
                        <option value="native">{t('connect.native')}</option>
                        <option value="fluent">{t('connect.fluent')}</option>
                        <option value="advanced">
                            {t('connect.advanced')}
                        </option>
                        <option value="intermediate">
                            {t('connect.intermediate')}
                        </option>
                        <option value="beginner">
                            {t('connect.beginner')}
                        </option>
                    </Select>

                    <IconButton
                        aria-label={t('languages.delete')}
                        icon={<FontAwesomeIcon icon={faTrash} />}
                        onClick={() => {
                            const updatedLanguages = [...languages]
                            updatedLanguages.splice(index, 1)
                            setLanguages(updatedLanguages)
                            setValue('userLanguages', updatedLanguages)
                        }}
                    />
                </Flex>
            ))}
            <Button onClick={addLanguage}>{t('connect.addLanguage')}</Button>
        </VStack>
    )
}

export default ProfileLanguageForm
