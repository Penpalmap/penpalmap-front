import { Socket } from 'socket.io-client'
import { SocketEvents } from '../constants/socketEnum'
import { Message } from '../types'
import { MessageInput } from '../hooks/useChat'
import {
  CreateRoomEventDto,
  MessageSeenEventDto,
  SendMessageEventDto,
} from './socketDto'

export const connectToSocketServer = (socket) => {
  // Se connecter au serveur WebSocket
  socket.connect()
}

export const disconnectFromSocketServer = (socket) => {
  // Se déconnecter du serveur WebSocket
  socket.disconnect()
}

export const loggingSocket = (
  socket,
  data: { eventId: string; accessToken: string }
) => {
  // Se connecter au serveur WebSocket
  socket.emit(SocketEvents.LoggedIn, data)
}

export const joinRoom = (socket, roomId: string) => {
  // Rejoindre une room spécifique
  socket.emit(SocketEvents.JoinRoom, roomId)
}

export const createRoom = (socket, data: CreateRoomEventDto) => {
  socket.emit(SocketEvents.CreateRoom, data)
}

export const onNewRoom = (
  socket: Socket,
  callback: (roomId: string) => void
) => {
  socket.on(SocketEvents.NewRoom, (roomId: string) => {
    callback(roomId)
  })
}

export const leaveRoom = (socket, roomId: string) => {
  // Quitter une room spécifique
  socket.emit(SocketEvents.LeaveRoom, roomId)
}

export const sendMessageSocket = (socket, data: SendMessageEventDto) => {
  // Envoyer un message à une room spécifique
  socket.emit(SocketEvents.NewMessage, data)
}

export const onNewMessage = (
  socket: Socket,
  callback: (message: SendMessageEventDto) => void
) => {
  // Écouter les nouveaux messages
  socket.on(SocketEvents.NewMessage, (message: SendMessageEventDto) => {
    callback(message)
  })
}

export const onSeenMessage = (
  socket: Socket,
  callback: (data: MessageSeenEventDto) => void
) => {
  // Écouter les messages vus
  socket.on(SocketEvents.SeenMessage, (data: MessageSeenEventDto) => {
    callback(data)
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
