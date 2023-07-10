import io from 'socket.io-client'
import { SocketEvents } from '../constants/socketEnum'
import { Message } from '../types'

export const socket = io(process.env.NEXT_PUBLIC_API_URL as string)

export const connectToSocketServer = () => {
    // Se connecter au serveur WebSocket
    socket.connect()
}

export const disconnectFromSocketServer = () => {
    // Se déconnecter du serveur WebSocket
    socket.disconnect()
}

export const joinRoom = (roomId: string) => {
    // Rejoindre une room spécifique
    socket.emit(SocketEvents.JoinRoom, roomId)
}

export const leaveRoom = (roomId: string) => {
    // Quitter une room spécifique
    socket.emit(SocketEvents.LeaveRoom, roomId)
}

export const sendMessageSocket = (message: Message) => {
    // Envoyer un message à une room spécifique
    socket.emit(SocketEvents.SendMessage, message)
}

export const onNewMessage = (callback: (message: Message) => void) => {
    // Écouter les nouveaux messages
    socket.on(SocketEvents.NewMessage, (message: Message) => {
        callback(message)
    })
}
