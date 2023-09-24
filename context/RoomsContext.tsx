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
import { useSession } from 'next-auth/react'
import { onNewMessage, onSeenMessage } from '../sockets/socketManager'
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

    const { data: session } = useSession()

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

    const updateLastMessageInRoom = useCallback((message) => {
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
    }, [])

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
            console.log('new message socket')
            updateLastMessageInRoom(message)
        })

        onSeenMessage(appData.socket, (message) => {
            if (message.senderId !== session?.user?.id) {
                resetCountUnreadMessagesOfRoom(message.roomId)
            }
        })
    }, [
        appData.socket,
        resetCountUnreadMessagesOfRoom,
        session?.user?.id,
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
