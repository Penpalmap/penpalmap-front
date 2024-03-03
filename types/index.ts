import { Socket } from 'socket.io-client'
import { Gender } from '../constants/genderEnum'

export type ProfileFormData = {
  birthday: string
  gender: Gender
  languageUsed: string
  userLanguages: Array<UserLanguage>
  isNewUser: boolean
  latitude: number
  longitude: number
  bio?: string
}

export type Message = {
  id: string
  content: string
  isSeen: boolean
  sender?: User
  createdAt: string
  updatedAt: string
}

export type ContextStateData = {
  userTarget: UserElement | null
  rooms: Array<Room> | null
  chatOpen: boolean
  chatData: ChatData
  socket: Socket | null
}

export type ChatData = {
  roomChatId: string | null
  userChat: User | null
}

export type UserRoom = {
  createdAt: string
  roomId: string
  updatedAt: string
  userId: string
}

export type User = {
  id: string
  blockedUsers?: User[]
  name: string
  email: string
  googleId?: string
  geom?: Geom
  points: number
  image?: string
  gender?: string
  birthday?: Date
  bio?: string
  isNewUser: boolean
  connections: number
  languageUsed?: string
  avatarNumber?: number
  userImages?: UserImage[]
  userLanguages?: UserLanguage[]
  isOnline: boolean
}

export type Geom = {
  coordinates: Array<number>
}

export type UserMap = {
  id: string
  name: string
  geom: Geom
  image: string
  points: number
  avatarNumber: number
}

export type UserImage = {
  id: string
  src: string
  position: number
}

export type Room = {
  id: string
  members: Array<User>
  messages: Array<Message>
  UserRoom: UserRoom | null
  createdAt: string
  updatedAt: string
  countUnreadMessages: string
}

export type UserElement = User & {
  room: Room | undefined
  strokeColor: string
}

export type UserLanguage = {
  id: string
  language: string
  level: string
}

export type AuthContextType = {
  user: User | null
  status: 'loading' | 'authenticated' | 'unauthenticated'
  login: (tokens: { accessToken: string; refreshToken: string }) => void
  logout: () => void
  // refreshTokenFunc: () => Promise<boolean>
  fetchUser: () => void
}
