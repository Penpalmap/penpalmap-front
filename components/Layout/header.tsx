import {
    Box,
    Button,
    HStack,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
} from '@chakra-ui/react'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useAuth from '../../hooks/useAuth'
import { signOut } from 'next-auth/react'

const Header = () => {
    return (
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
                    <MenuItem>Mon profil</MenuItem>
                    <MenuItem>Paramètres</MenuItem>
                    <MenuItem onClick={() => signOut()}>
                        Se déconnecter
                    </MenuItem>
                </MenuList>
            </Menu>
        </HStack>
    )
}

export default Header
