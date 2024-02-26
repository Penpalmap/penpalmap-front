export type CreateMessageDto = {
  content: string
  senderId: string
  roomId: string
}

export type UpdateMessageDto = {
  content: string
}
