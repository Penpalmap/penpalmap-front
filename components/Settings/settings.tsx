import { Box, Button, Flex, useBreakpointValue } from '@chakra-ui/react'
import {
    faChevronLeft,
    faGlobeEurope,
    faInfoCircle,
    faShield,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTranslation } from 'next-i18next'
import { useMobileView } from '../../context/MobileViewContext'
import { useState } from 'react'
import LanguageSettings from './LanguageSettings'
import InformationsSettings from './InformationsSettings'
import SecuritySettings from './SecuritySettings'

const Settings = () => {
    const { t } = useTranslation()

    const { setMobileView } = useMobileView()

    const menuTabs = [
        {
            name: 'language',
            label: t('settings.language'),
            icon: faGlobeEurope,
        },
        {
            name: 'informations',
            label: t('settings.informations'),
            icon: faInfoCircle,
        },
        {
            name: 'security',
            label: t('settings.security'),
            icon: faShield,
        },
    ]

    const [selectedTab, setSelectedTab] = useState(menuTabs[0]?.name)

    const handleTabChange = (tabName: string) => {
        setSelectedTab(tabName)
    }

    const isMobile = useBreakpointValue({ base: true, md: false })

    return (
        <Flex>
            <Box flex={1} h={'100vh'} borderRight={'1px solid #e2e8f0'}>
                {menuTabs.map((tab) => (
                    <Box
                        key={tab.name}
                        cursor={'pointer'}
                        color={tab.name === selectedTab ? 'white' : 'black'}
                        backgroundColor={
                            tab.name === selectedTab ? 'teal.400' : 'white'
                        }
                        p={4}
                        fontWeight="medium"
                        onClick={() => handleTabChange(tab.name)}
                        fontSize={'sm'}
                    >
                        {tab.icon && (
                            <FontAwesomeIcon
                                icon={tab.icon}
                                style={{ marginRight: '10px' }}
                            />
                        )}
                        {tab.label}
                    </Box>
                ))}
            </Box>
            <Box flex={5} p={4}>
                {isMobile && (
                    <Button
                        variant={'ghost'}
                        leftIcon={<FontAwesomeIcon icon={faChevronLeft} />}
                        onClick={() => setMobileView('home')}
                    >
                        Retour
                    </Button>
                )}

                <Flex alignItems={'center'} gap={'2'}>
                    {selectedTab === 'language' && <LanguageSettings />}
                    {selectedTab === 'informations' && <InformationsSettings />}
                    {selectedTab === 'security' && <SecuritySettings />}
                </Flex>
            </Box>
        </Flex>
    )
}

export default Settings
