import {
    Box,
    Button,
    HStack,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    useDisclosure,
} from '@chakra-ui/react'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { signOut } from 'next-auth/react'
import Profile from '../Profile'

const Header = () => {
    const { isOpen, onClose, onOpen } = useDisclosure()
    return (
        <>
            <HStack
                as="header"
                bg={'gray'}
                p={4}
                justifyContent={'space-between'}
                h={'16'}
            >
                <Box>Logo</Box>
                <Menu>
                    <MenuButton
                        as={Button}
                        rightIcon={<FontAwesomeIcon icon={faCaretDown} />}
                    >
                        Actions
                    </MenuButton>
                    <MenuList bg={'white'} borderRadius={4}>
                        <MenuItem onClick={onOpen}>Mon profil</MenuItem>
                        <MenuItem>Paramètres</MenuItem>
                        <MenuItem onClick={() => signOut()}>
                            Se déconnecter
                        </MenuItem>
                    </MenuList>
                </Menu>
            </HStack>
            <Profile onClose={onClose} isOpen={isOpen} />
        </>
    )
}

export default Header
