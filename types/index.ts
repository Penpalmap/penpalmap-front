import { Socket } from 'socket.io-client'
import { Gender } from '../constants/genderEnum'

export type RegisterUserInput = {
  email: string
  name: string
  password: string
  passwordConfirmation: string
}

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
  senderId: string
  sender: User
  receiverId: string
  receiver: User
  roomId: string
  room: Room
  createdAt: string
  isNewRoom: boolean
}

export type MessageInput = {
  content: string
  roomId: string | null | undefined
  senderId: string
  receiverId: string
}

export type ContextStateData = {
  userTarget: UserElement | null
  rooms: Array<Room> | null
  chatOpen: boolean
  userChat: User | null
  socket: Socket | null
}

export type UserRoom = {
  createdAt: string
  roomId: string
  updatedAt: string
  userId: string
}

export type User = {
  id: string
  email: string
  image: string
  name: string
  geom: Geom | null
  geom: Geom | null
  points: number
  gender: string
  birthday: string
  bio: string
  userImages: Array<UserImage>
  isNewUser: boolean
  isOnline: boolean
  languageUsed: string
  avatarNumber: number
  userLanguages: Array<UserLanguage>
  updatedAt: string
}

export type Geom = {
  coordinates: Array<number>
}

export type UserMap = {
  id: string
  name: string
  geom: Geom
  geom: Geom
  image: string
  points: number
  avatarNumber: number
}

export type UserImage = {
  id: string
  src: string
  position: number
  userId: string
  user: User
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
  id?: string
  language: string
  level: string
  userId: string
}

export type AuthContextType = {
  user: User | null
  status: 'loading' | 'authenticated' | 'unauthenticated'
  login: (tokens: { accessToken: string; refreshToken: string }) => void
  logout: () => void
  refreshTokenFunc: () => Promise<boolean>
  fetchUser: () => void
}
