import { Socket } from 'socket.io-client'
import { SocketEvents } from '../constants/socketEnum'
import { Message, MessageInput } from '../types'

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

export const createRoom = (socket, data: any) => {
  socket.emit(SocketEvents.CreateRoom, data)
}

export const onNewRoom = (socket: Socket, callback: (room: any) => void) => {
  socket.on(SocketEvents.NewRoom, (room: any) => {
    callback(room)
  })
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
    callback(message)
  })
}

export const sendMessageSeen = (socket: Socket, message: Message) => {
  // Envoyer un message vu
  socket.emit(SocketEvents.SendSeenMessage, message)
}

export const onSeenMessage = (
  socket: Socket,
  callback: (message: Message) => void
) => {
  // Écouter les messages vus
  socket.on(SocketEvents.SeenMessage, (message: Message) => {
    callback(message)
  })
}

export const isTyping = (socket: Socket, message: MessageInput) => {
  // Envoyer un message de typing
  socket.emit(SocketEvents.IsTyping, message)
}

export const onIsTyping = (
  socket: Socket,
  callback: (message: Message) => void
) => {
  // Écouter les messages de typing
  socket.on(SocketEvents.IsTyping, (message) => {
    callback(message)
  })
}

export const onUsersOnline = (
  socket: Socket,
  callback: (users: string[]) => void
) => {
  // Écouter les utilisateurs en ligne
  socket.on(SocketEvents.OnlineUsers, (users: string[]) => {
    callback(users)
  })
}
