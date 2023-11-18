import { Box, Button, Flex, IconButton, Select, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { UserLanguage } from '../../types'
import { useSession } from 'next-auth/react'
import { DeleteIcon } from '@chakra-ui/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

type Props = {
    setValue: any
}

const ProfileLanguageForm = ({ setValue }: Props) => {
    const { data: session } = useSession()
    const [languages, setLanguages] = useState<UserLanguage[]>([
        { language: '', level: '', userId: session.user.id },
    ])

    const [availableLanguages, setAvailableLanguages] = useState<
        { label: string; value: string }[]
    >([
        {
            label: 'Français',
            value: 'fr',
        },
        {
            label: 'Anglais',
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
                        placeholder="Sélectionner une langue"
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
                        placeholder="Niveau"
                        value={language.level}
                        onChange={(e) =>
                            handleLevelChange(index, e.target.value)
                        }
                    >
                        <option value="native">Natif</option>
                        <option value="fluent">Courant</option>
                        <option value="intermediate">Intermédiaire</option>
                        <option value="beginner">Débutant</option>
                    </Select>

                    <IconButton
                        aria-label="delete"
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
            <Button onClick={addLanguage}>Ajouter une langue</Button>
        </VStack>
    )
}

export default ProfileLanguageForm
