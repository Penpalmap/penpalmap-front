export type SendMessageEventDto = {
  eventId: string
  messageId: string
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

export class UserTypingEventDto {
  eventId: string
  userId: string
  roomId: string
  isTyping: boolean
}

export class RoomCreatedEventDto {
  eventId: string
  userId: string
  roomId: string
}
