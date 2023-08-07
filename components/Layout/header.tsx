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
    Text,
    useDisclosure,
} from '@chakra-ui/react'
import { signOut, useSession } from 'next-auth/react'
import MyProfile from '../MyProfile'
import packageJson from './../../package.json'

const Header = () => {
    const { isOpen, onClose, onOpen } = useDisclosure()

    const { data: session } = useSession()
    return (
        <>
            <HStack as="header" p={4} justifyContent={'space-between'} h={'14'}>
                <Flex alignItems={'center'}>
                    <Flex alignItems={'center'}>
                        <Image
                            src={'/images/logo.png'}
                            alt={'logo'}
                            w={'10'}
                            h={'10'}
                        />
                        <Text fontSize={'xl'} fontWeight={'bold'} ml={2}>
                            PenpalMap
                        </Text>
                    </Flex>
                    <Text fontSize={'sm'} ml={'4'} color={'gray.900'}>
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
                            <MenuItem>Paramètres</MenuItem>
                            <MenuDivider />
                            <MenuItem onClick={() => signOut()}>
                                Déconnexion
                            </MenuItem>
                        </MenuList>
                    </Menu>
                )}
            </HStack>
            <MyProfile onClose={onClose} isOpen={isOpen} />
        </>
    )
}

export default Header
