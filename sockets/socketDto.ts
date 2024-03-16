import { User } from '../types'

export type SendMessageEventDto = {
  id: string
  receiverId: string
  roomId: string
  content: string
  createdAt: string
  sender: User
}

export type CreateRoomEventDto = {
  receiverId: string
  roomId: string
}

export type SendMessageSeenDto = {
  roomId: string
  senderId: string
}
