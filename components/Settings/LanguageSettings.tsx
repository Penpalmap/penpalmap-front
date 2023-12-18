import { Box, Heading, Select } from '@chakra-ui/react'
import useLanguage from '../../hooks/useLanguage'
import { updateUser } from '../../api/userApi'
import { useSession } from '../../hooks/useSession'
import { useTranslation } from 'next-i18next'

const LanguageSettings = () => {
    const { user } = useSession()
    const { t } = useTranslation()

    const { changeLocale, locale } = useLanguage()
    const handleLocaleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (!user || !user.id) return
        changeLocale(e.target.value)

        updateUser({ languageUsed: e.target.value }, user.id)
    }
    return (
        <Box>
            <Heading as="h2" size="md" mb={2}>
                {t('settings.language')}
            </Heading>

            <Select
                variant={'flushed'}
                size="sm"
                w="fit-content"
                value={locale}
                onChange={handleLocaleChange}
            >
                <option value="fr">{t('languages.fr')}</option>
                <option value="en">{t('languages.en')}</option>
            </Select>
        </Box>
    )
}

export default LanguageSettings
