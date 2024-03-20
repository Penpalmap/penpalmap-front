import { Socket } from 'socket.io-client'

export type Message = {
  id: string
  content: string
  isSeen: boolean
  sender?: User
  createdAt: string
  room?: Room
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
  updatedAt: string
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
  members?: Array<User>
  lastMessage: Message | null
  isUnreadMessages: boolean
}

export type UserElement = User & {
  room: Room | undefined
  strokeColor: string
}

export type UserLanguage = {
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
