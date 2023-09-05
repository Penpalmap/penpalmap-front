import io, { Socket } from 'socket.io-client'
import { SocketEvents } from '../constants/socketEnum'
import { Message } from '../types'

export const connectToSocketServer = (socket) => {
    // Se connecter au serveur WebSocket
    socket.connect()
}

export const disconnectFromSocketServer = (socket) => {
    // Se déconnecter du serveur WebSocket
    socket.disconnect()
}

export const joinRoom = (socket, roomId: string) => {
    // Rejoindre une room spécifique
    socket.emit(SocketEvents.JoinRoom, roomId)
}

export const leaveRoom = (socket, roomId: string) => {
    // Quitter une room spécifique
    socket.emit(SocketEvents.LeaveRoom, roomId)
}

export const sendMessageSocket = (socket, message: Message) => {
    // Envoyer un message à une room spécifique
    socket.emit(SocketEvents.SendMessage, message)
}

export const onNewMessage = (
    socket: Socket,
    callback: (message: Message) => void
) => {
    // Écouter les nouveaux messages
    socket.on(SocketEvents.NewMessage, (message: Message) => {
        console.log('New message received', message)
        callback(message)
    })
}
