import {
    Avatar,
    Box,
    HStack,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Text,
    useDisclosure,
} from '@chakra-ui/react'
import { signOut } from 'next-auth/react'
import Profile from '../Profile'

const Header = () => {
    const { isOpen, onClose, onOpen } = useDisclosure()
    return (
        <>
            <HStack as="header" p={4} justifyContent={'space-between'} h={'14'}>
                <Text fontSize={'xl'} fontWeight={'bold'}>
                    PenpalMap
                </Text>
                <Menu>
                    <MenuButton
                        as={Avatar}
                        size="sm"
                        name="John Doe"
                        cursor="pointer"
                    />
                    <MenuList>
                        <MenuItem>
                            <Box display="flex" alignItems="center">
                                <Avatar
                                    size="sm"
                                    name="John Doe"
                                    src="/path/to/profile-image.jpg"
                                    marginRight={2}
                                />
                                <Text fontWeight="bold">John Doe</Text>
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
            </HStack>
            <Profile onClose={onClose} isOpen={isOpen} />
        </>
    )
}

export default Header
