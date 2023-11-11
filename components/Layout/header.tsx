import {
    Avatar,
    Box,
    Button,
    Flex,
    HStack,
    Image,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
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

const Header = () => {
    const { isOpen, onClose, onOpen } = useDisclosure()

    const { data: session } = useSession()
    const [appData] = useContext(AppContext)
    // const { i18n } = useTranslation()
    const disconnect = () => {
        signOut()
        disconnectFromSocketServer(appData.socket)
    }
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
                {session && (
                    <Menu>
                        <MenuButton
                            as={Avatar}
                            size="sm"
                            name={session?.user?.name}
                            cursor="pointer"
                            src={session?.user?.image}
                        />
                        <MenuList>
                            <MenuItem>
                                <Box display="flex" alignItems="center">
                                    <Avatar
                                        size="sm"
                                        name={session?.user?.name}
                                        src={session?.user?.image}
                                        marginRight={2}
                                    />
                                    <Text fontWeight="bold">
                                        {session?.user?.name}
                                    </Text>
                                </Box>
                            </MenuItem>
                            <MenuDivider />
                            <MenuItem onClick={onOpen}>Mon profil</MenuItem>
                            <Link href={`/?settings=yes`} as={`/settings/`}>
                                <MenuItem>Paramètres</MenuItem>
                            </Link>
                            <MenuDivider />
                            <MenuItem onClick={disconnect}>
                                Déconnexion
                            </MenuItem>
                        </MenuList>
                    </Menu>
                )}
                {/* <Menu>
                    <MenuButton
                        as={Button}
                        rightIcon={<FontAwesomeIcon icon={faGlobeEurope} />}
                    ></MenuButton>
                    <MenuList>
                        <MenuItem onClick={() => i18n.changeLanguage('fr')}>
                            <Text as="span" cursor="pointer">
                                Français
                            </Text>
                        </MenuItem>
                        <MenuDivider />
                        <MenuItem onClick={() => i18n.changeLanguage('en')}>
                            Anglais
                        </MenuItem>
                    </MenuList>
                </Menu> */}
            </HStack>
            {session && <MyProfile onClose={onClose} isOpen={isOpen} />}
        </>
    )
}

export default Header
