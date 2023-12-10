import {
    ReactNode,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react'
import { Message, Room } from '../types'
import { getRooms } from '../api/conversationApi'
import { useSession } from '../hooks/useSession'
import {
    onNewMessage,
    onSeenMessage,
    onUsersOnline,
} from '../sockets/socketManager'
import { AppContext } from './AppContext'

interface RoomContextType {
    rooms: Room[]
    resetCountUnreadMessagesOfRoom: (roomId: string) => void
    updateLastMessageInRoom: (message: Message) => void
}

interface RoomProviderProps {
    children: ReactNode
}

const RoomContext = createContext<RoomContextType | undefined>(undefined)

export function useRoom() {
    const context = useContext(RoomContext)
    if (!context) {
        throw new Error('useRoom must be used within a RoomProvider')
    }
    return context
}

export const RoomProvider = ({ children }: RoomProviderProps) => {
    const [rooms, setRooms] = useState<Room[]>([])
    const [appData, setAppData] = useContext(AppContext)

    const { session } = useSession()

    useEffect(() => {
        const fetchUserRooms = async () => {
            if (!session?.user?.id) return
            const response = await getRooms(session?.user?.id)
            if (response) {
                setRooms(response.rooms)
            }
        }

        fetchUserRooms()
    }, [session?.user.id])

    const updateLastMessageInRoom = useCallback(
        (message) => {
            if (!session?.user?.id) return
            setRooms((prevRooms) => {
                return prevRooms.map((room) => {
                    if (room.id === message.roomId) {
                        let countUnreadMessages: string

                        if (message.senderId === session?.user?.id) {
                            countUnreadMessages = '0'
                        } else {
                            if (
                                room.countUnreadMessages === undefined ||
                                room.countUnreadMessages === null
                            ) {
                                countUnreadMessages = '1'
                            } else {
                                countUnreadMessages = (
                                    parseInt(room.countUnreadMessages) + 1
                                ).toString()
                            }
                        }

                        const newRoom: Room = {
                            ...room,
                            messages: [message],
                            countUnreadMessages: countUnreadMessages,
                        }

                        return {
                            ...newRoom,
                        }
                    }
                    return room
                })
            })
        },
        [session?.user?.id]
    )

    const resetCountUnreadMessagesOfRoom = useCallback((roomId) => {
        setRooms((prevRooms) => {
            return prevRooms.map((room) => {
                if (room.id === roomId) {
                    return {
                        ...room,
                        countUnreadMessages: '0',
                    }
                }
                return room
            })
        })
    }, [])

    useEffect(() => {
        if (!appData.socket) return
        onNewMessage(appData.socket, (message) => {
            updateLastMessageInRoom(message)
        })

        onSeenMessage(appData.socket, (message) => {
            if (message.senderId !== session?.user?.id) {
                resetCountUnreadMessagesOfRoom(message.roomId)
            }
        })

        // Met à jour le statut en ligne
        onUsersOnline(appData.socket, (usersOnline) => {
            setRooms((prevRooms) => {
                return prevRooms.map((room) => {
                    const newRoom: Room = {
                        ...room,
                        members: room.members.map((member) => {
                            if (usersOnline.includes(member.id)) {
                                return {
                                    ...member,
                                    isOnline: true,
                                }
                            } else {
                                return {
                                    ...member,
                                    isOnline: false,
                                }
                            }
                        }),
                    }

                    return {
                        ...newRoom,
                    }
                })
            })

            if (appData.userChat) {
                const userChat = appData.userChat
                const userIsOnline = usersOnline.includes(userChat.id)
                setAppData({
                    ...appData,
                    userChat: {
                        ...userChat,
                        isOnline: userIsOnline,
                    },
                })
            }
        })
    }, [
        appData,
        appData.socket,
        resetCountUnreadMessagesOfRoom,
        session?.user?.id,
        setAppData,
        updateLastMessageInRoom,
    ])

    return (
        <RoomContext.Provider
            value={{
                rooms,
                resetCountUnreadMessagesOfRoom,
                updateLastMessageInRoom,
            }}
        >
            {children}
        </RoomContext.Provider>
    )
}
