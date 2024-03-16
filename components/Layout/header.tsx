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
  Select,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import MyProfile from '../MyProfile'
import packageJson from './../../package.json'
import Link from 'next/link'
import { disconnectFromSocketServer } from '../../sockets/socketManager'
import { AppContext } from '../../context/AppContext'
import { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobeEurope } from '@fortawesome/free-solid-svg-icons'
import useLanguage from '../../hooks/useLanguage'
import { useTranslation } from 'next-i18next'
import { useMobileView } from '../../context/MobileViewContext'
import { useSession } from '../../hooks/useSession'
import { useRouter } from 'next/router'

const Header = () => {
  const { isOpen, onClose, onOpen } = useDisclosure()

  const { logout, user, status } = useSession()
  const [appData, setAppData] = useContext(AppContext)

  const { setMobileView } = useMobileView()

  const { changeLocale, locale } = useLanguage()

  const { pathname, push } = useRouter()

  // const { i18n } = useTranslation()

  const disconnect = () => {
    setAppData({
      userTarget: null,
      chatData: { roomChatId: null, userChat: null },
      rooms: [],
      chatOpen: false,
      socket: null,
    })
    logout()
    localStorage.removeItem('token')

    disconnectFromSocketServer(appData.socket)
  }

  const genderFolder =
    user?.gender === 'man' || user?.gender === 'woman' ? user?.gender : 'other'
  const { t } = useTranslation('common')

  return (
    <>
      <HStack
        as="header"
        px={4}
        justifyContent={'space-between'}
        boxShadow={'md'}
        zIndex={10}
        position={'sticky'}
        top={0}
        width={'100%'}
        backgroundColor={'white'}
        h={'4rem'}
      >
        <Flex alignItems={'center'}>
          <Link href={`/`} onClick={() => setMobileView('home')}>
            <Flex alignItems={'center'} padding={'0.4rem'}>
              <Image src={'/images/logo.webp'} alt={'logo'} w={'8'} h={'8'} />
              <Text fontSize={'xl'} fontWeight={'bold'} ml={2}>
                PenpalMap
              </Text>
            </Flex>
          </Link>
          {!isMobile && (
            <Text
              fontSize={'sm'}
              ml={'4'}
              color={'gray.900'}
              fontStyle="italic"
            >
              {packageJson.version}
            </Text>
          )}
        </Flex>
        {user ? (
          <HStack spacing={6}>
            {pathname !== '/home' && status === 'authenticated' && user && (
              <Button
                colorScheme="teal"
                onClick={() => {
                  setMobileView('home')
                  push('/home')
                }}
              >
                Go home
              </Button>
            )}
            <Menu>
              <MenuButton
                as={Avatar}
                size="sm"
                name={user.name}
                cursor="pointer"
                src={
                  user?.image
                    ? user?.image
                    : `/images/avatar/${genderFolder}/${user?.avatarNumber}.png`
                }
                boxShadow="0px 4px 6px rgba(0, 0, 0, 0.3)"
                p={'1px'}
              />
              <MenuList>
                <MenuItem>
                  <Box display="flex" alignItems="center">
                    <Avatar
                      size="sm"
                      name={user?.name}
                      src={
                        user?.image
                          ? user?.image
                          : `/images/avatar/${genderFolder}/${user?.avatarNumber}.png`
                      }
                      marginRight={2}
                    />
                    <Text fontWeight="bold">{user?.name}</Text>
                  </Box>
                </MenuItem>
                <MenuDivider />
                <MenuItem onClick={onOpen}>{t('menu.myProfile')}</MenuItem>

                <Link href={`/settings`}>
                  <MenuItem> {t('menu.parameters')}</MenuItem>
                </Link>
                <MenuDivider />
                <MenuItem onClick={disconnect}>{t('menu.logout')}</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        ) : (
          <Flex alignItems={'center'} gap={'2'}>
            {!isMobile && <FontAwesomeIcon icon={faGlobeEurope} />}
            {!isMobile && (
              <Select
                variant={'flushed'}
                size="sm"
                w="fit-content"
                value={locale}
                onChange={(e) => {
                  changeLocale(e.target.value)
                }}
              >
                <option value="en">{t('languagesOrigin.en')}</option>
                <option value="fr">{t('languagesOrigin.fr')}</option>
                <option value="de">{t('languagesOrigin.de')}</option>
                <option value="es">{t('languagesOrigin.es')}</option>
                <option value="it">{t('languagesOrigin.it')}</option>
                <option value="pt">{t('languagesOrigin.pt')}</option>
                <option value="ru">{t('languagesOrigin.ru')}</option>
                <option value="zh">{t('languagesOrigin.zh')}</option>
                <option value="ja">{t('languagesOrigin.ja')}</option>
                <option value="ar">{t('languagesOrigin.ar')}</option>
                <option value="hi">{t('languagesOrigin.hi')}</option>
                <option value="ko">{t('languagesOrigin.ko')}</option>
                <option value="tr">{t('languagesOrigin.tr')}</option>
                <option value="pl">{t('languagesOrigin.pl')}</option>
                <option value="nl">{t('languagesOrigin.nl')}</option>
                <option value="id">{t('languagesOrigin.id')}</option>
              </Select>
            )}
            <Link href={`/auth/signin`}>
              <Button
                variant={'outline'}
                colorScheme="blach"
                borderRadius="full"
                _hover={{ bg: 'teal.400', color: 'white' }}
              >
                {t('connect.connect')}
              </Button>
            </Link>
          </Flex>
        )}
      </HStack>

      {user && <MyProfile onClose={onClose} isOpen={isOpen} />}
    </>
  )
}

export default Header
