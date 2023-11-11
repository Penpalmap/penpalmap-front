import { Flex, Heading, Link, Select } from '@chakra-ui/react'
import { faGlobeEurope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTranslation } from 'next-i18next'

const Settings = () => {
    const { t, i18n } = useTranslation()

    const changeLanguage = (e) => {
        i18n.changeLanguage(e.target.value)
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
                    onChange={(e) => {
                        i18n.changeLanguage(e.target.value)
                    }}
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
