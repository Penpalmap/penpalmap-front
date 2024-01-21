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
                <option value="de">{t('languages.de')}</option>
                <option value="es">{t('languages.es')}</option>
                <option value="it">{t('languages.it')}</option>
                <option value="pt">{t('languages.pt')}</option>
                <option value="ru">{t('languages.ru')}</option>
                <option value="zh">{t('languages.zh')}</option>
                <option value="ja">{t('languages.ja')}</option>
                <option value="ar">{t('languages.ar')}</option>
                <option value="hi">{t('languages.hi')}</option>
                <option value="ko">{t('languages.ko')}</option>
                <option value="tr">{t('languages.tr')}</option>
                <option value="pl">{t('languages.pl')}</option>
                <option value="nl">{t('languages.nl')}</option>
                <option value="id">{t('languages.id')}</option>
            </Select>
        </Box>
    )
}

export default LanguageSettings
