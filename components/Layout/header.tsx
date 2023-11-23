import {
    Avatar,
    Box,
    Flex,
    HStack,
    Image,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Select,
    Text,
    useDisclosure,
} from '@chakra-ui/react'
import { signOut, useSession } from 'next-auth/react'
import MyProfile from '../MyProfile'
import packageJson from './../../package.json'
import Link from 'next/link'
import { disconnectFromSocketServer } from '../../sockets/socketManager'
import { AppContext } from '../../context/AppContext'
import { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { useTranslation } from 'next-i18next'
import { faGlobeEurope } from '@fortawesome/free-solid-svg-icons'
import useLanguage from '../../hooks/useLanguage'
import { useTranslation } from 'next-i18next'

const Header = () => {
    const { isOpen, onClose, onOpen } = useDisclosure()

    const { data: session } = useSession()
    const [appData] = useContext(AppContext)

    const { changeLocale, locale } = useLanguage()

    // const { i18n } = useTranslation()
    const disconnect = () => {
        signOut()
        disconnectFromSocketServer(appData.socket)
    }
    const genderFolder = session?.user?.gender || 'other'

    const { t } = useTranslation('common')

    return (
        <>
            <HStack
                as="header"
                p={4}
                justifyContent={'space-between'}
                h={'14'}
                boxShadow={'md'}
                zIndex={10} // une valeur élevée pour s'assurer que le header se superpose à d'autres éléments
                position={'sticky'} // fixe la position
                top={0} // positionne le header en haut de la page
                width={'100%'} // s'assure qu'il prend toute la largeur de la fenêtre
                backgroundColor={'white'}
            >
                <Flex alignItems={'center'}>
                    <Link href={`/`}>
                        <Flex alignItems={'center'}>
                            <Image
                                src={'/images/logo.png'}
                                alt={'logo'}
                                w={'9'}
                                h={'9'}
                            />
                            <Text fontSize={'xl'} fontWeight={'bold'} ml={2}>
                                PenpalMap
                            </Text>
                        </Flex>
                    </Link>
                    <Text
                        fontSize={'sm'}
                        ml={'4'}
                        color={'gray.900'}
                        fontStyle="italic"
                    >
                        {packageJson.version}
                    </Text>
                </Flex>
                {session ? (
                    <Menu>
                        <MenuButton
                            as={Avatar}
                            size="sm"
                            name={session?.user?.name}
                            cursor="pointer"
                            src={
                                session?.user?.image
                                    ? session?.user?.image
                                    : `/images/avatar/${genderFolder}/${session?.user?.avatarNumber}.png`
                            }
                            // Ajoutez boxShadow ici
                            boxShadow="0px 4px 6px rgba(0, 0, 0, 0.3)"
                            p={'1px'}
                        />
                        <MenuList>
                            <MenuItem>
                                <Box display="flex" alignItems="center">
                                    <Avatar
                                        size="sm"
                                        name={session?.user?.name}
                                        src={
                                            session?.user?.image
                                                ? session?.user?.image
                                                : `/images/avatar/${genderFolder}/${session?.user?.avatarNumber}.png`
                                        }
                                        marginRight={2}
                                    />
                                    <Text fontWeight="bold">
                                        {session?.user?.name}
                                    </Text>
                                </Box>
                            </MenuItem>
                            <MenuDivider />
                            <MenuItem onClick={onOpen}>
                                {t('menu.myProfile')}
                            </MenuItem>
                            <Link href={`/?settings=yes`} as={`/settings/`}>
                                <MenuItem> {t('menu.parameters')}</MenuItem>
                            </Link>
                            <MenuDivider />
                            <MenuItem onClick={disconnect}>
                                {t('menu.logout')}
                            </MenuItem>
                        </MenuList>
                    </Menu>
                ) : (
                    <Flex alignItems={'center'} gap={'2'}>
                        <FontAwesomeIcon icon={faGlobeEurope} />
                        <Select
                            variant={'flushed'}
                            size="sm"
                            w="fit-content"
                            value={locale}
                            onChange={(e) => {
                                changeLocale(e.target.value)
                            }}
                        >
                            <option value="fr">{t('languages.fr')}</option>
                            <option value="en">{t('languages.en')}</option>
                        </Select>
                    </Flex>
                )}
            </HStack>
            {session && <MyProfile onClose={onClose} isOpen={isOpen} />}
        </>
    )
}

export default Header
