import { useBreakpointValue } from '@chakra-ui/react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import { io } from 'socket.io-client'
import LayoutDesktop from '../../components/Layout/LayoutDesktop'
import LayoutMobile from '../../components/Layout/LayoutMobile'
import Loading from '../../components/Layout/loading'
import Profile from '../../components/Profile'
import { SocketEvents } from '../../constants/socketEnum'
import { AppContext } from '../../context/AppContext'
import { useSession } from '../../hooks/useSession'
import Head from 'next/head'
import { Modal } from '../../components/Elements/Modal'
import { useTranslation } from 'next-i18next'
import { loggingSocket } from '../../sockets/socketManager'
import RGPDNotice from '../../components/Elements/rgpdNotice'

export default function HomePage() {
  const { t } = useTranslation('common')
  const { status, user } = useSession()
  const isMobile = useBreakpointValue({ base: true, md: false })
  const router = useRouter()

  const [, setAppData] = useContext(AppContext)

  useEffect(() => {
    if (user?.id && status === 'authenticated') {
      const newSocket = io(process.env.NEXT_PUBLIC_API_URL as string)
      const accessToken = localStorage.getItem('accessToken')
      loggingSocket(newSocket, {
        eventId: SocketEvents.AddUser,
        accessToken: accessToken as string,
      })

      setAppData((prevData) => ({
        ...prevData,
        socket: newSocket || null,
      }))
    }
  }, [user?.id, setAppData, status])

  return (
    <>
      <RGPDNotice />
      <Head>
        <title>{t('title.home.index')}</title>
        <meta
          name="description"
          content="Connect with friends from all over the world, wherever you are. Make friends, learn languages and discover new cultures whatever your location"
        ></meta>
      </Head>
      {status === 'loading' || user?.isNewUser ? (
        <Loading />
      ) : isMobile ? (
        <LayoutMobile />
      ) : (
        <LayoutDesktop />
      )}

      {router.query.profileId && (
        <Modal
          onClose={() => {
            router.push('/home')
          }}
        >
          <Profile userId={router.query.profileId as string} />
        </Modal>
      )}
    </>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}
