import { User } from '../../types'

export type QueryRoomDto = {
  userIds?: string[]
}

export type CreateRoomDto = {
  memberIds: string[]
}

export type RoomDto = {
  id: string
  members?: User[]
}

export type UpdateRoomDto = {
  memberIds: string[]
}
