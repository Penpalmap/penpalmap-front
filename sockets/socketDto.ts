export type SendMessageEventDto = {
  eventId: string
  messageId: string
}

export type CreateRoomEventDto = {
  receiverId: string
  roomId: string
}

export type SendMessageSeenDto = {
  roomId: string
  senderId: string
}
export class LoggedInEventDto {
  eventId: string
  accessToken: string
}

export class MessageSeenEventDto {
  eventId: string
  messageId: string
}
