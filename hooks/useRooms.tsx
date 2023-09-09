import { getRooms } from '../api/conversationApi'
import { AppContext } from '../context/AppContext'
import { useCallback, useContext, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { Room } from '../types'
import {
    joinRoom,
    leaveRoom,
    onNewMessage,
    onSeenMessage,
} from '../sockets/socketManager'

const useRooms = () => {
    const [data, setData] = useContext(AppContext)

    const [rooms, setRooms] = useState<Room[]>([])

    const { data: session } = useSession()

    useEffect(() => {
        if (data.rooms) {
            setRooms(data.rooms)
        }
    }, [data.rooms])

    useEffect(() => {
        rooms.forEach((room) => {
            joinRoom(data.socket, room.id)
        })

        return () => {
            rooms.forEach((room) => {
                leaveRoom(data.socket, room.id)
            })
        }
    }, [rooms])

    useEffect(() => {
        if (!data.socket) return
        onNewMessage(data.socket, (message) => {
            if (message.senderId !== session?.user?.id) {
                setData({
                    ...data,
                    rooms: rooms.map((room) => {
                        if (room?.UserRoom?.roomId === message.roomId) {
                            if (
                                room.countUnreadMessages === undefined ||
                                room.countUnreadMessages === null
                            ) {
                                return {
                                    ...room,
                                    countUnreadMessages: 1,
                                    messages: [message],
                                }
                            } else {
                                return {
                                    ...room,
                                    countUnreadMessages:
                                        parseInt(room.countUnreadMessages) + 1,
                                    messages: [message],
                                }
                            }
                        }
                        return room
                    }),
                })
            }
        })

        onSeenMessage(data.socket, (message) => {
            if (message.senderId !== session?.user?.id) {
                setData({
                    ...data,
                    rooms: rooms.map((room) => {
                        if (room?.UserRoom?.roomId === message.roomId) {
                            return {
                                ...room,
                                countUnreadMessages: '0',
                            }
                        }
                        return room
                    }),
                })
            }
        })
    }, [data, rooms, session?.user?.id, setData])

    const fetchRooms = useCallback(async () => {
        if (session?.user?.id) {
            const conversationsData = await getRooms(session?.user?.id)
            setData((prevData) => ({
                ...prevData,
                rooms: conversationsData?.rooms,
            }))
        }
    }, [session?.user?.id, setData])

    useEffect(() => {
        fetchRooms()
    }, [fetchRooms])

    const refetch = () => {
        fetchRooms()
    }

    return {
        rooms,
        refetch,
    }
}

export default useRooms
