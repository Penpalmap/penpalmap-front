import { useSession } from './../hooks/useSession'
import Loading from '../components/Layout/loading'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import LayoutMobile from '../components/Layout/LayoutMobile'
import LayoutDesktop from '../components/Layout/LayoutDesktop'

import { useBreakpointValue } from '@chakra-ui/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Modal } from '../components/Elements/Modal'
import Profile from '../components/Profile'
import { Socket, io } from 'socket.io-client'
import { useContext, useEffect, useRef } from 'react'
import { AppContext } from '../context/AppContext'
import { SocketEvents } from '../constants/socketEnum'

export default function Home() {
    const { status, user } = useSession()
    const isMobile = useBreakpointValue({ base: true, md: false })
    const router = useRouter()

    const [, setAppData] = useContext(AppContext)
    const socket = useRef<Socket>()

    useEffect(() => {
        if (user?.id && status === 'authenticated') {
            socket.current = io(process.env.NEXT_PUBLIC_API_URL as string)
            socket.current.emit(SocketEvents.AddUser, user.id)
            setAppData((prevData) => ({
                ...prevData,
                socket: socket.current,
            }))

            console.log('socket id : ', socket.current.id)
        }
    }, [user?.id, setAppData, status])

    return (
        <>
            <Head>
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
                        router.push('/')
                    }}
                >
                    <Profile profileId={router.query.profileId as string} />
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
