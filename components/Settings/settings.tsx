import { Flex, Heading, Link, Select } from '@chakra-ui/react'
import { faGlobeEurope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTranslation } from 'next-i18next'
import useLanguage from '../../hooks/useLanguage'
import { updateUser } from '../../api/userApi'
import { useSession } from 'next-auth/react'

const Settings = () => {
    const { t } = useTranslation()
    const { data: session } = useSession()

    const { changeLocale, locale } = useLanguage()

    const handleLocaleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (!session?.user.id) return
        changeLocale(e.target.value)

        updateUser({ languageUsed: e.target.value }, session.user.id)
    }

    return (
        <div>
            <h1>Settings</h1>

            <Heading as="h2" size="md" mb={2}>
                {t('settings.language')}
            </Heading>
            <Flex alignItems={'center'} gap={'2'}>
                <FontAwesomeIcon icon={faGlobeEurope} />
                <Select
                    variant={'flushed'}
                    size="sm"
                    w="fit-content"
                    value={locale}
                    onChange={handleLocaleChange}
                >
                    <option value="fr">Français</option>
                    <option value="en">Anglais</option>
                </Select>
            </Flex>
            <Link href="/terms" color="blue.600" fontWeight="medium">
                Terms of Use
            </Link>
            <Link href="/legalnotice" color="blue.600" fontWeight="medium">
                Mentions Légales
            </Link>
        </div>
    )
}

export default Settings
