import { User } from '../types'

export type SendMessageEventDto = {
  id: string
  receiverId: string
  roomId: string
  content: string
  createdAt: string
  sender: User
}
